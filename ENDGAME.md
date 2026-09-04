# lifeOS Endgame Spec

*Saved from conversation — 2026-09-04*

---

## Core Principle: Raw Capture is Layer 0

> **Never mutate or replace source media.**

The original `.MOV` is ground truth. Every AI interpretation is disposable and reproducible.

## Architecture

```
                     LIFEOS

CAPTURE
────────────────────────────────────

iPhone Camera       Spotify       ChatGPT
Photos              GitHub        Notes
Voice               Telegram      etc.
   │
   ▼
INGEST API
   │
   ├──────────────► R2
   │                immutable raw
   │
   ▼
D1
canonical events / relationships
   │
   ▼
PROCESSORS
   ├── transcription
   ├── face landmarks
   ├── audio/prosody
   ├── OCR
   ├── embeddings
   └── semantic extraction
   │
   ▼
TIMELINE
   │
   ▼
MODEL OF SELF
   │
   ├── memories
   ├── beliefs
   ├── preferences
   ├── relationships
   ├── goals
   ├── contradictions
   └── predictions
   │
   ▼
INTERVIEWER
   │
   └── asks questions that reduce
       uncertainty about the model
```

## R2 Structure (immutable raw)

```
lifeos-r2/
raw/
  video/
    2026/09/02/
      01K...F7.mov
      01K...P2.mov
derived/
  transcripts/01K...F7.json
  audio/01K...F7.json
  vision/01K...F7.json
  thumbnails/01K...F7.webp
  embeddings/01K...F7.json
manifests/
  01K...F7.json
```

## Media Asset Schema

```json
{
  "id": "01K...",
  "type": "video",
  "captured_at": "2026-09-02T18:21:31+07:00",
  "uploaded_at": "...",
  "source": "iphone_camera",
  "original_filename": "IMG_4821.MOV",
  "r2_key": "raw/video/2026/09/02/01K....mov",
  "prompt_id": null,
  "people": [],
  "location": null,
  "tags": [],
  "processing_status": "raw"
}
```

## Upload Flow (presigned URLs)

```
POST /api/media/init
{ filename, size, mime, captured_at }
     ↓
{ asset_id, r2_key, signed_upload_url }
     ↓
iPhone PUTs video DIRECTLY to R2
     ↓
POST /api/media/complete { asset_id }
```

No R2 credentials touch the phone.

## iPhone Interfaces

### A. Web/PWA — bulk inbox
- Install to home screen
- Tab: "+ Capture / Inbox"
- Select 1-20 videos from Photos
- Upload directly to R2 via signed URLs
- Chunked upload for large files

### B. iOS Shortcut — everyday capture
- Share → Save to lifeOS
- Two taps after recording
- Optional classification (diary, memory, experiment, etc.)
- Classification should NEVER be mandatory

## AI Interview System

### Interview Event (freeze BEFORE question)

```json
{
  "question_id": "q_883",
  "asked_at": "...",
  "question": "If you had enough money tomorrow, which current project would you immediately stop?",
  "reason": "Tom repeatedly associates several projects with income pressure.",
  "target": "intrinsic_vs_instrumental_motivation",
  "prediction": {
    "likely_answer": "...",
    "likely_topics": ["Bittensor", "..."],
    "expected_latency_seconds": 3,
    "expected_reaction": "hesitation",
    "confidence": 0.62
  }
}
```

### Prediction Error (compare after answer)

```
AI expected → what actually happened → prediction error
```

This turns the system from "AI journal" into **longitudinal computational model of Tom**.

## Reaction Tracking (objective measurements)

```json
{
  "response_latency_ms": 2714,
  "face": {
    "smile_peak": 0.71,
    "brow_inner_up_peak": 0.42,
    "eye_blink_count": 8
  },
  "head": {
    "look_away_events": 4
  },
  "speech": {
    "pause_count": 7,
    "longest_pause_ms": 6200,
    "speech_rate_wpm": 122
  }
}
```

NOT "emotion detection" — objective behavioral measurements. Then AI can cautiously infer deviations from baseline.

## Baseline Model

After 500+ recordings:

```
Normal Tom:
response latency       1.7 sec
speech rate            151 wpm
look-away frequency    0.8/min
pause duration         0.9 sec
```

Then compare individual questions against baseline.

## Telegram = Notification Surface Only

- Telegram sends: "lifeOS question — What are you pursuing that you don't actually want?"
- Answer button opens lifeOS web app
- Videos NEVER go through Telegram
- Telegram is the pager, not the archive

## Roadmap

### V0 — NOW
Camera → R2 → metadata

### V0.1
Camera → R2 → Whisper transcript → timeline

### V0.2
Scheduled AI question → video answer → question↔video linkage

### V0.3
AI pre-answer prediction → answer → prediction-error scoring

### V0.4
MediaPipe facial features + audio prosody + response latency + semantic analysis

### V1
AI starts learning which questions maximize information gain about you.

## Key Principle

> You shouldn't feel like you're "maintaining a database."
> You should simply **live**, and lifeOS ingests the exhaust.
