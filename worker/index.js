export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // POST /api/media/init — get presigned upload URL
    if (url.pathname === '/api/media/init' && request.method === 'POST') {
      const body = await request.json();
      const { filename, size, mimeType, capturedAt } = body;

      if (!filename || !size) {
        return new Response(JSON.stringify({ error: 'filename and size required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Generate asset ID and R2 key
      const assetId = crypto.randomUUID();
      const date = new Date(capturedAt || Date.now());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const ext = filename.split('.').pop() || 'mov';
      const r2Key = `raw/${year}/${month}/${day}/${assetId}.${ext}`;

      // Generate presigned PUT URL for R2
      const bucket = env.SVATANTRYA_BUCKET;
      const putUrl = await bucket.createPresignedUrl({
        method: 'PUT',
        key: r2Key,
        expiresIn: 3600, // 1 hour
      });

      // Store metadata in R2
      const metadata = {
        id: assetId,
        type: mimeType?.startsWith('video') ? 'video' : mimeType?.startsWith('audio') ? 'audio' : 'photo',
        capturedAt: capturedAt || new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        originalFilename: filename,
        r2Key: r2Key,
        fileSize: size,
        mimeType: mimeType || 'application/octet-stream',
        processingStatus: 'raw'
      };

      await bucket.put(`manifests/${assetId}.json`, JSON.stringify(metadata, null, 2), {
        httpMetadata: { contentType: 'application/json' }
      });

      return new Response(JSON.stringify({
        assetId,
        r2Key,
        uploadUrl: putUrl,
        expiresIn: 3600
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /api/media/complete — confirm upload finished
    if (url.pathname === '/api/media/complete' && request.method === 'POST') {
      const body = await request.json();
      const { assetId } = body;

      if (!assetId) {
        return new Response(JSON.stringify({ error: 'assetId required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const bucket = env.SVATANTRYA_BUCKET;
      const manifest = await bucket.get(`manifests/${assetId}.json`);
      if (!manifest) {
        return new Response(JSON.stringify({ error: 'asset not found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const metadata = JSON.parse(await manifest.text());
      metadata.uploadedAt = new Date().toISOString();
      metadata.processingStatus = 'uploaded';

      await bucket.put(`manifests/${assetId}.json`, JSON.stringify(metadata, null, 2), {
        httpMetadata: { contentType: 'application/json' }
      });

      return new Response(JSON.stringify({ assetId, status: 'uploaded' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /api/media/list — list recent assets
    if (url.pathname === '/api/media/list') {
      const bucket = env.SVATANTRYA_BUCKET;
      const listed = await bucket.list({ prefix: 'manifests/', limit: 50 });
      const manifests = [];
      for (const obj of listed.objects) {
        const data = await bucket.get(obj.key);
        if (data) {
          manifests.push(JSON.parse(await data.text()));
        }
      }
      return new Response(JSON.stringify(manifests), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /api/media/:id — get asset metadata
    if (url.pathname.startsWith('/api/media/') && request.method === 'GET') {
      const assetId = url.pathname.split('/').pop();
      const bucket = env.SVATANTRYA_BUCKET;
      const data = await bucket.get(`manifests/${assetId}.json`);
      if (!data) {
        return new Response(JSON.stringify({ error: 'not found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      return new Response(await data.text(), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('SVATANTRYA API', { headers: corsHeaders });
  }
};
