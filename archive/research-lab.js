(() => {
  'use strict';

  const LAB_KEY = 'life90_research_v1';
  const API_CONFIG_KEY = 'life90_api_config_v1';
  const API_SESSION_KEY = 'life90_api_key_session';
  const API_SAVED_KEY = 'life90_api_key_saved';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s = '') => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  };
  const uuid = () => (crypto?.randomUUID ? crypto.randomUUID() : `l90-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
  const isoWeekKey = (date = new Date()) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(week).padStart(2,'0')}`;
  };

  const seededHypotheses = [
    {
      id: 'H1', type: 'Behavior', title: 'Future-self continuity changes present action',
      claim: 'Repeated, embodied simulation of a specific future self will increase choices that benefit that future self.',
      primary: 'Bridge-action completion + long-horizon objective metrics',
      alternative: 'Novelty, journaling, expectancy, or ordinary goal salience.'
    },
    {
      id: 'H2', type: 'Self-regulation', title: 'Contrast + bridge beats fantasy alone',
      claim: 'Future imagery followed by a named obstacle and if→then bridge will produce more goal-congruent action than outcome fantasy without a bridge.',
      primary: 'Resolved bridge actions; weekly objective ledger',
      alternative: 'Planning itself may explain the effect; metaphysics is not required.'
    },
    {
      id: 'H3', type: 'Attention', title: 'The practice changes what becomes salient',
      claim: 'Goal-related opportunities, people, information and coincidences will be noticed more often after sustained nightly practice.',
      primary: 'Prospective opportunity logs + action-mediated classification',
      alternative: 'Attentional priming, search behavior, network effects, confirmation bias.'
    },
    {
      id: 'H4', type: 'Phenomenology', title: 'Identity becomes more continuous across time',
      claim: 'The future life will feel less like an abstraction and more like a personally continuous mode of being, accompanied by changes in imagery, dreams, affect and agency.',
      primary: 'Embodiment, vividness, Recognition ratings + qualitative diary',
      alternative: 'Practice effects, absorption, demand characteristics.'
    },
    {
      id: 'H5', type: 'Strong metaphysical', title: 'Intention predicts external events beyond mediation',
      claim: 'Prospectively specified external outcomes may occur at rates not explained by declared base rates, direct action, communication or selective retrospective logging.',
      primary: 'Frozen predictions resolved hit/miss/ambiguous',
      alternative: 'Base-rate error, flexible criteria, unnoticed mediation, chance, optional stopping.'
    },
    {
      id: 'H6', type: 'Aperture / Recognition', title: 'Recognition changes action-selection without withdrawal',
      claim: 'Recognition, understood as a transformation in ownership, self-attribution, policy topology, affective precision and metacontrol, will reduce contraction while preserving or improving practical engagement.',
      primary: 'Recognition rating × bridge completion × mood/work metrics',
      alternative: 'Relaxation, decentering, mindfulness, cognitive reappraisal. No universal-subject or nonlocal-cognition inference follows from a positive result.'
    }
  ];

  const sourceAtlas = [
    {
      name: 'Aperture / Process Inexternalism',
      url: 'https://prx0r.github.io/ochema-site/thesis/',
      claim: 'Process Inexternalism: concrete processes have inseparable intrinsic/extrinsic aspects; phenomenal presence is the intrinsic aspect of an objectively individuated, temporally extended process. Formal core: Pᵢ* = Closure(CEᵢ, Semᵢ, Vᵢ, Γᵢ, Mᵢ², Kᵢ, Qᵢ); Dᵢ = Int(Pᵢ*); Dᵢ ≡ᵢₙₑₓₜ Pᵢ*. The internal and external are not two connected worlds but inseparable aspects of one process.',
      method: 'Use Recognition before imagery; log the process-state at decision thresholds. Recognition is operationalized as changes in ownership, self-attribution, policy topology, affective precision and metacontrol—not as proof that an image magically controls a separate external world.',
      status: 'User research framework. The inexternal identity is a metaphysical postulate; task irreducibility, maximality, semantic self-relevance, topology and continuity remain empirical hypotheses. It does not imply a universal shared subject or nonlocal cognition.'
    },
    {
      name: 'Pratyabhijñā / Recognition',
      url: 'https://github.com/prx0r/the-library',
      claim: 'Recognition traditions frame liberation not as manufacturing a new self but as recognizing the nature of the subject/awareness already present, with agency and manifestation interpreted through that recognition.',
      method: 'Begin with “recognize, do not manufacture”: observe experiencer, desire, image, sensation and obstacle in one field; then choose a concrete action without needing a special trance or certainty.',
      status: 'Philosophical/contemplative tradition. Claims about ultimate reality are not treated as experimentally established.'
    },
    {
      name: 'Robert Monroe / Gateway Patterning',
      url: 'https://www.monroeinstitute.org/products/gateway-experience-wave-ii-threshold',
      claim: 'The Monroe system labels Focus 10 “mind awake, body asleep,” Focus 12 expanded awareness, and includes One Month / One Year Patterning exercises intended to move life in a desired direction.',
      method: 'Relax deeply → broaden attention → hold one coherent future pattern → feel it as lived → release it. Life90 adds an explicit obstacle and bridge action afterward.',
      status: 'The Focus/patterning ontology is a Monroe-system claim. Relaxation, imagery and goal planning have conventional psychological mechanisms; nonphysical claims remain unestablished.'
    },
    {
      name: 'Frank Kepple / AstralPulse',
      url: 'https://astralpulse.com/frankkepple.html',
      claim: 'Kepple’s “phasing” model describes Focus 2 as an individual subjective probability space and says probabilities are selected there and inserted into Focus 1 objective experience.',
      method: 'Represent one desired probability clearly, then track what changes in Focus-1 behavior, attention and external outcomes. Separate action-mediated effects from claims of unmediated probability selection.',
      status: 'Experiential/metaphysical model; not established by mainstream empirical research.'
    },
    {
      name: 'Jürgen Ziewe / Multidimensional Man',
      url: 'https://www.multidimensionalman.com/',
      claim: 'Ziewe presents decades of OBE journals as first-person investigation and explicitly emphasizes “awareness instead of belief.”',
      method: 'Treat unusual states as phenomenological data: timestamp, describe sensory/affective content before interpretation, and preserve alternative explanations. Prefer repeatability over conviction.',
      status: 'First-person experiential corpus; useful for phenomenology, not independent proof of its proposed ontology.'
    },
    {
      name: 'Darius J. Wright / The Great Work',
      url: 'https://dariusjwright.com/breaking-down-the-nature-of-reality-direct-insights-from-the-out-of-body-state/',
      claim: 'Wright frames fully conscious OBE as a method of direct investigation and discusses a reality model in which thought and consciousness participate in what is experienced.',
      method: 'Direct-experience-first logging: report what occurred, state what was inferred, and state what would independently verify the inference. Do not let confidence substitute for prospective evidence.',
      status: 'Contemporary experiential teaching; claims about nonphysical structure and causal reality-shaping are not scientifically established.'
    },
    {
      name: 'Jungian active imagination',
      url: 'https://iaap.org/jung-analytical-psychology/analytical-psychology/',
      claim: 'In analytical psychology, active imagination is a meditative/dialogical method that allows imagery or symbolic material to emerge and then engages it consciously rather than merely watching a scripted fantasy.',
      method: 'Life90 deliberately separates the directed future scene from the dialogue phase: build the target scene first, then stop scripting and let the imagined future-self response surprise, disagree or redirect you. Record the response before interpreting it.',
      status: 'Established as a Jungian psychotherapeutic/reflective method; the content of an inner dialogue is not automatically external information or prophecy.'
    },
    {
      name: 'Jane Roberts / Seth',
      url: 'https://sethcenter.com/course/create-your-own-reality/',
      claim: 'The Seth material says beliefs, expectations, thoughts and emotions participate in creating personal experience, with the “point of power” located in the present. Current Seth Center practice materials include psy-time, suggestion and dream incubation.',
      method: 'Identify the operative belief → specify the desired experiential orientation → rehearse it in the present → notice resistance → pair it with an observable action and dream/experience log.',
      status: 'Channeled/metaphysical source tradition. Belief, expectation and imagery can affect behavior; broader reality-creation claims are not established science.'
    },
    {
      name: 'Law of One / Ra material',
      url: 'https://www.llresearch.org/channeling/ra-contact/74',
      claim: 'Its discipline of personality is framed as “know yourself, accept yourself, become the Creator,” emphasizing self-knowledge, acceptance, free will and service rather than a simple wish-fulfillment technique.',
      method: 'Use the weekly review to know the actual pattern; accept the data without self-deception; choose service/action from the broader identity-frame rather than using metaphysics to bypass obstacles.',
      status: 'Channeled spiritual material. Included as a philosophical/practice source, not empirical evidence.'
    },
    {
      name: 'Reality Transurfing / Vadim Zeland',
      url: 'https://reality-transurfing.com/wp-content/uploads/2020/07/Lesson7-Pure-IntentionSV.pdf',
      claim: 'Transurfing distinguishes desire from intention, emphasizes the resoluteness to have and to act, and distinguishes inner intention from “outer intention.” Its glossary also warns against excessive “importance,” which is treated as destabilizing the chosen trajectory.',
      method: 'Life90 translates this into low-drama commitment: hold the target clearly, reduce desperate checking, and make the next congruent move. “Outer intention” remains a metaphysical interpretation; behavioral commitment and reduced rumination are separately measurable.',
      status: 'Metaphysical/self-development system, not established physical theory. Useful here as a disciplined attitude toward intention rather than evidence that alternate timelines are literally selected.'
    },
    {
      name: 'Paul Selig / Guides',
      url: 'https://paulselig.com/books/beyond-the-known/',
      claim: 'Selig’s channeled books frame realization and manifestation as transformations in the perceived identity and the reality available from that identity, rather than merely forcing an object into existence.',
      method: 'Use identity congruence as a weekly question: “What would be ordinary if this life were genuinely mine?” Then score whether behavior, boundaries and commitments actually become congruent. No external entity bargain or pact is part of the protocol.',
      status: 'Channeled spiritual teaching. Included as an interpretive/practice source; not empirical evidence for its cosmology.'
    },
    {
      name: 'Benjamin Rowe / Scrying discipline',
      url: 'https://hermetic.com/norton/ashort',
      claim: 'Rowe’s Short Course in Scrying emphasizes relaxation, concentration, building a stable imaginal space, a “surprise me” technique, and—critically—testing visions rather than accepting them at face value.',
      method: 'Borrow the imaginal hygiene, not the ceremonial system: stabilize attention, inhabit one scene, then stop scripting and allow surprising content. Record it immediately and test any externally checkable implication prospectively.',
      status: 'Esoteric practice literature. Valuable as a method for disciplined imagery and source criticism; supernatural interpretations remain unestablished.'
    },
    {
      name: 'Brahmacarya / vīrya',
      url: 'https://www.wisdomlib.org/hinduism/book/yoga-sutras-study/d/doc628746.html',
      claim: 'Yoga Sūtra 2.38 links establishment in brahmacarya/continence with acquisition of vīrya, often rendered as vigor, potency or spiritual energy. Commentarial traditions vary on whether brahmacarya means celibacy, sexual continence or broader mastery of desire.',
      method: 'Treat sexual restraint as a voluntary attention experiment: define the rule in advance, track adherence, focus, agitation, sleep, mood and work output, and discontinue rigid framing if it worsens functioning or becomes obsessive.',
      status: 'Traditional contemplative claim. Modern evidence does not establish a general mystical-energy, testosterone or performance benefit from semen retention.'
    },
    {
      name: 'Daoist sexual cultivation / jing',
      url: 'https://academic.oup.com/book/2116/chapter-abstract/142060735',
      claim: 'Historical Daoist cultivation includes diverse approaches to sexuality; some systems frame sexual energy as something to harness or refine, while scholarship cautions against treating all semen-retention lore as a single timeless Daoist doctrine.',
      method: 'Life90 uses only the conservative operational idea: reduce compulsive sexual attention if it fragments concentration, and measure the result. It does not use hazardous retention techniques or claim that semen literally converts into a measurable spiritual substance.',
      status: 'Historically real but heterogeneous religious/cultivation traditions. Biomedical evidence does not validate the classical jing ontology.'
    },
    {
      name: 'Episodic future thinking',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34841982/',
      claim: 'Vividly imagining future episodes has experimental evidence for reducing delay discounting; a meta-analysis of 47 studies reported a significant effect.',
      method: 'Make the future scene concrete, sensory and personally continuous enough that tomorrow’s sacrifice has a vivid beneficiary.',
      status: 'Empirical psychological evidence; effects do not imply nonlocal manifestation.'
    },
    {
      name: 'Mental contrasting + implementation intentions',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34054628/',
      claim: 'A 2021 meta-analysis found a small-to-moderate effect of mental contrasting with implementation intentions on goal attainment, with publication-bias caveats.',
      method: 'Desired future → current obstacle → if situation X occurs, then perform behavior Y. This is the mandatory “bridge” at the end of Life90 visualization.',
      status: 'Empirically supported self-regulation method; effect size is modest and heterogeneous.'
    },
    {
      name: 'Positive-fantasy caution',
      url: 'https://doi.org/10.1016/j.jesp.2011.02.003',
      claim: 'Experimental work found that induced positive fantasies about idealized futures could reduce energization compared with more questioning or neutral fantasies.',
      method: 'Never end the ritual at “it is already mine.” End with reality contact: obstacle, bridge, cue, then measure whether action occurred.',
      status: 'Empirical caution against treating pleasurable fantasy itself as sufficient goal pursuit.'
    }
  ];

  const scenePrompts = [
    ['An ordinary morning in the life you chose.', 'Do not watch yourself from outside. Be behind your eyes. What do you hear first? What needs doing before breakfast? What does your body feel like?'],
    ['A wet-season evening at home.', 'The day has slowed down. What does the air smell like? What sounds are outside? What did you work on? What living things depend on you?'],
    ['A completely unremarkable Tuesday.', 'No breakthrough, no celebration. Walk through the boring logistics of a life that is nevertheless exactly where you want to be.'],
    ['You finish the day’s paid work.', 'How much work was enough? Where did you do it? What happens immediately afterward? Notice what financial autonomy feels like as ordinary routine.'],
    ['Something on the property needs fixing.', 'What broke? What tools do you reach for? Who taught you this? What competence did your present self have to accumulate to make this mundane?'],
    ['You wake before everyone else.', 'Walk outside. Notice temperature, terrain, animals, light and your own physical capacity. What makes this place feel inhabited rather than escaped-to?'],
    ['A friend visits for three days.', 'How do you host them? What do you cook? What do they notice about the way you live that you now take for granted?'],
    ['A difficult month, but the life still works.', 'Income is lower or something goes wrong. What systems keep you calm? What reserves, skills and relationships make the life resilient?'],
    ['A day with no internet until evening.', 'What fills the day when stimulation is absent? Work, reading, language, movement, animals, maintenance, contemplation—what actually feels alive?'],
    ['You are ten years older than the target age.', 'Which parts of this life survived novelty? What did you keep because it was real value rather than fantasy?'],
    ['Walk the boundary of your home at sunset.', 'What can you see, hear and smell? What did it take—in money, language, bureaucracy, health and patience—to make this scene ordinary?'],
    ['Future-you reviews this exact week.', 'Which tiny behavior from the present week looks disproportionately important from there? Which current obsession looks irrelevant?']
  ];

  const ritualGuidance = {
    recognize: '<strong>Recognize.</strong> Do not try to become awareness or produce a mystical state. Notice that sound, body, image, expectation and the sense of “me doing this” are already appearing. Use the philosophical lens; do not convert it into an empirical conclusion.',
    release: '<strong>Release pressure.</strong> Let go of needing tonight to prove anything. Monroe-style preparatory work is useful here as a state-change ritual: relax the body, set aside fear/urgency, and keep awareness clear.',
    scene: '<strong>Enter one scene.</strong> First-person, ordinary, multisensory. Prefer five minutes inside one coherent morning to fifty cinematic accomplishments. Include mundane constraints and responsibilities.',
    dialogue: '<strong>Let future-you answer.</strong> Ask: “What became obvious? What did I stop feeding? What did I practice until it was ordinary? What mattered far less than I thought?” Record the answer as imagination/phenomenology, not revelation.',
    contrast: '<strong>Touch current reality.</strong> Name the most important obstacle between here and that scene. Internal counts: avoidance, scattered work, sleep, fear. External counts: money, visa, skill, time. Do not spiritualize it away.',
    bridge: '<strong>Cross one threshold tomorrow.</strong> Pick one visible action and bind it to a cue: “If X happens, then I do Y.” The session is incomplete until imagination has changed tomorrow’s behavioral policy.'
  };

  function freshLab() {
    return { version: 2, createdAt: new Date().toISOString(), nightly: [], daily: [], weeklyMetrics: [], reviews: [], predictions: [], observations: [], targets: [], hypotheses: seededHypotheses, sexualRule: 'none' };
  }
  function loadLab() {
    try {
      const x = JSON.parse(localStorage.getItem(LAB_KEY) || 'null');
      if (x && typeof x === 'object') {
        x.nightly ||= []; x.daily ||= []; x.weeklyMetrics ||= []; x.reviews ||= []; x.predictions ||= []; x.observations ||= []; x.targets ||= []; x.hypotheses ||= seededHypotheses; x.sexualRule ||= 'none';
        return x;
      }
    } catch (_) {}
    return freshLab();
  }
  let lab = loadLab();
  function saveLab() { localStorage.setItem(LAB_KEY, JSON.stringify(lab)); }


  const targetFieldIds = ['target-age','target-location','target-home','target-animals','target-economics','target-body','target-culture','target-day','target-optional','target-nonneg','target-rule'];
  const targetDefaults = {};
  function readTargetDraft() {
    const out = {};
    targetFieldIds.forEach(id => { const el = $(`#${id}`); if (el) out[id] = el.value.trim(); });
    return out;
  }
  function fillTarget(data) {
    if (!data) return;
    targetFieldIds.forEach(id => { const el=$(`#${id}`); if (el && data[id] != null) el.value=String(data[id]); });
  }
  async function sha256(text) {
    if (!crypto?.subtle) return `local-${Math.abs([...text].reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0)|0,0)).toString(16)}`;
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  function renderTargetHistory() {
    const box=$('#target-history'); if(!box) return;
    const rows=[...lab.targets].reverse();
    if(!rows.length){box.innerHTML='<p class="microcopy">No frozen version yet.</p>';return;}
    box.innerHTML=rows.map(t=>`<article><div><strong>v${esc(t.version)} · target age ${esc(t.data['target-age'])}</strong><span>${esc((t.frozenAt||'').slice(0,10))}</span></div><p>${esc(t.data['target-location']||'')}</p><code>${esc((t.fingerprint||'').slice(0,20))}…</code></article>`).join('');
  }
  function renderTargetState() {
    const latest=lab.targets.at(-1); const state=$('#target-state'), fp=$('#target-fingerprint');
    if(!state) return;
    const locked=Boolean(latest);
    if(locked){ fillTarget(latest.data); state.textContent=`Frozen v${latest.version}`; state.classList.add('locked'); fp.textContent=`SHA-256 ${latest.fingerprint.slice(0,16)}… · ${latest.frozenAt.slice(0,10)}`; }
    else { state.textContent='Draft'; state.classList.remove('locked'); fp.textContent='Not frozen'; }
    targetFieldIds.forEach(id=>{const el=$(`#${id}`);if(el)el.disabled=locked;});
    $('#freeze-target')?.classList.toggle('hidden',locked); $('#new-target-version')?.classList.toggle('hidden',!locked);
    renderTargetHistory();
  }
  function initTarget() {
    if(!$('#freeze-target')) return;
    targetFieldIds.forEach(id=>{const el=$(`#${id}`); if(el) targetDefaults[id]=el.value;});
    renderTargetState();
    $('#freeze-target').addEventListener('click', async()=>{
      const data=readTargetDraft();
      if(!data['target-location'] || !data['target-rule']) { $('#target-status').textContent='Specify place and scoring rule first.'; return; }
      const version=(lab.targets.at(-1)?.version||0)+1; const frozenAt=new Date().toISOString();
      const canonical=JSON.stringify({version,frozenAt,data}); const fingerprint=await sha256(canonical);
      lab.targets.push({version,frozenAt,data,fingerprint}); saveLab(); renderTargetState(); renderWeeklyContextPreview();
      $('#target-status').textContent=`Frozen v${version}. Future edits require a new version.`;
    });
    $('#new-target-version').addEventListener('click',()=>{
      const latest=lab.targets.at(-1); targetFieldIds.forEach(id=>{const el=$(`#${id}`);if(el)el.disabled=false;});
      if(latest) fillTarget(latest.data); $('#target-state').textContent=`Draft v${(latest?.version||0)+1}`; $('#target-fingerprint').textContent='Unfrozen changes';
      $('#freeze-target').classList.remove('hidden'); $('#freeze-target').textContent=`Freeze target v${(latest?.version||0)+1}`; $('#new-target-version').classList.add('hidden');
    });
  }

  const dailyRuleDefs = [
    ['recognition','Recognition / stillness','5–15 min: notice the aperture and de-reify separation without demanding a special state.'],
    ['visualization','Nightly future scene','One ordinary first-person scene, vivid enough to have a body and constraints.'],
    ['bridge','Bridge action completed','At least one action that visibly reduces distance to the frozen target.'],
    ['deepwork','Economic deep work','Protect a focused block that improves portable income, capital or unusually valuable skill.'],
    ['hindi','Hindi contact','Study, listening, speaking or reading that compounds integration.'],
    ['body','Body reserve','Strength, aerobic work, long walk, mobility or deliberate recovery according to the week plan.'],
    ['competence','Practical competence','Small progress in cooking, repairs, gardening, animal care, bureaucracy, land literacy or another autonomy skill.'],
    ['attention','Attention protected','Avoided a major compulsive-media spiral; attention remained available for chosen work and relationships.'],
    ['sleep','Sleep protected','Gave the next day a realistic sleep opportunity rather than trading it away casually.']
  ];
  function sexualRuleLabel(v){return ({'no-porn':'Sexual discipline · no pornography / compulsive sexual media','no-masturbation':'Sexual discipline · no masturbation','continence':'Sexual discipline · continence + redirect sexual fantasy'})[v]||'';}
  function dailyDefs(){ const d=[...dailyRuleDefs]; if(lab.sexualRule && lab.sexualRule!=='none') d.push(['sexual',sexualRuleLabel(lab.sexualRule),'Score only the rule you chose in advance. This is a self-regulation experiment, not a medical necessity.']); return d; }
  function renderDailyItems() {
    const box=$('#daily-rule-items');if(!box)return; const date=$('#daily-rule-date')?.value||todayISO(); const row=lab.daily.find(x=>x.date===date); const vals=row?.items||{};
    box.innerHTML=dailyDefs().map(([id,title,why])=>`<label class="daily-rule-item"><input type="checkbox" data-daily-id="${esc(id)}" ${vals[id]?'checked':''}><span><strong>${esc(title)}</strong><small>${esc(why)}</small></span></label>`).join('');
    if($('#daily-rule-note')) $('#daily-rule-note').value=row?.note||'';
  }
  function initDailyRule() {
    if(!$('#daily-rule-form'))return; $('#daily-rule-date').value=todayISO(); $('#sexual-rule').value=lab.sexualRule||'none'; renderDailyItems();
    $('#daily-rule-date').addEventListener('change',renderDailyItems);
    $('#sexual-rule').addEventListener('change',()=>{lab.sexualRule=$('#sexual-rule').value;saveLab();renderDailyItems();renderWeeklyContextPreview();});
    $('#daily-rule-form').addEventListener('submit',e=>{e.preventDefault();const date=$('#daily-rule-date').value||todayISO();const items={};$$('[data-daily-id]',$('#daily-rule-items')).forEach(x=>items[x.dataset.dailyId]=x.checked);const row={date,savedAt:new Date().toISOString(),sexualRule:lab.sexualRule,items,note:$('#daily-rule-note').value.trim()};const idx=lab.daily.findIndex(x=>x.date===date);if(idx>=0)lab.daily[idx]=row;else lab.daily.push(row);saveLab();$('#daily-rule-status').textContent=`Saved ${date}: ${Object.values(items).filter(Boolean).length}/${Object.keys(items).length}.`;renderNightStats();renderWeeklyContextPreview();});
  }

  function initRitual() {
    const guidance = $('#ritual-guidance');
    const buttons = $$('#ritual-steps button');
    if (!guidance || !buttons.length) return;
    const activate = (id) => {
      buttons.forEach(b => b.classList.toggle('active', b.dataset.step === id));
      guidance.innerHTML = ritualGuidance[id] || '';
    };
    buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.step)));
    activate('recognize');
    const targetAge = $('#night-target-age');
    const birth = localStorage.getItem('life90_birth');
    if (birth) {
      const b = new Date(`${birth}T12:00:00`);
      const now = new Date();
      let age = now.getFullYear() - b.getFullYear();
      if (now < new Date(now.getFullYear(), b.getMonth(), b.getDate())) age--;
      targetAge.min = String(Math.max(28, age + 1));
      if (age >= 35) targetAge.value = String(Math.min(90, age + 8));
    }
    let sceneIndex = Math.floor(Math.random() * scenePrompts.length);
    const paintScene = () => {
      const [title, detail] = scenePrompts[sceneIndex];
      $('#scene-prompt').textContent = title;
      $('#scene-prompt-detail').textContent = detail;
    };
    $('#new-scene-prompt')?.addEventListener('click', () => { sceneIndex = (sceneIndex + 1 + Math.floor(Math.random()*(scenePrompts.length-1))) % scenePrompts.length; paintScene(); });
    paintScene();
  }

  function initRangeOutputs() {
    const pairs = [
      ['night-mood','mood-out'],['night-energy','energy-out'],['night-stress','stress-out'],['night-activation','activation-out'],['night-vividness','vivid-out'],['night-embodiment','embody-out'],['night-recognition','recognition-out']
    ];
    pairs.forEach(([input, out]) => {
      const el = $(`#${input}`), dest = $(`#${out}`); if (!el || !dest) return;
      const paint = () => dest.textContent = el.value;
      el.addEventListener('input', paint); paint();
    });
  }

  function getLatestUnresolvedBridge() {
    return [...lab.nightly].reverse().find(n => n.bridge && !n.bridgeResult && n.date !== todayISO());
  }
  function renderBridgeCheck() {
    const card = $('#bridge-check-card'); if (!card) return;
    const prev = getLatestUnresolvedBridge();
    if (!prev) { card.classList.add('hidden'); return; }
    card.classList.remove('hidden');
    $('#previous-bridge-copy').textContent = `${prev.date}: ${prev.bridge}`;
    $$('.bridge-buttons button', card).forEach(btn => {
      btn.onclick = () => {
        const row = lab.nightly.find(n => n.id === prev.id);
        if (!row) return;
        row.bridgeResult = btn.dataset.bridgeResult;
        row.bridgeResolvedAt = new Date().toISOString();
        saveLab(); renderBridgeCheck(); renderNightStats();
      };
    });
  }

  function initNightForm() {
    const form = $('#nightly-form'); if (!form) return;
    $('#night-date').value = todayISO();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const entry = {
        id: uuid(), createdAt: new Date().toISOString(), date: $('#night-date').value || todayISO(),
        targetAge: Number($('#night-target-age').value || 35), minutes: Number($('#night-minutes').value || 0), sleepHours: Number($('#night-sleep').value || 0),
        mood: Number($('#night-mood').value), energy: Number($('#night-energy').value), stress: Number($('#night-stress').value), activation: Number($('#night-activation').value),
        vividness: Number($('#night-vividness').value), embodiment: Number($('#night-embodiment').value), recognition: Number($('#night-recognition').value),
        scene: $('#night-scene').value.trim(), dialogue: $('#night-dialogue').value.trim(), obstacle: $('#night-obstacle').value.trim(),
        bridge: $('#night-bridge').value.trim(), ifThen: $('#night-ifthen').value.trim(), anomaly: $('#night-anomaly').value.trim(), bridgeResult: null
      };
      const sameDateIndex = lab.nightly.findIndex(n => n.date === entry.date);
      if (sameDateIndex >= 0 && !confirm('You already saved a session for this date. Add another session anyway?')) return;
      lab.nightly.push(entry); saveLab();
      const st = $('#night-save-status'); st.textContent = 'Saved locally. Tomorrow, close the bridge loop.';
      setTimeout(() => st.textContent = '', 3500);
      ['night-scene','night-dialogue','night-obstacle','night-bridge','night-ifthen','night-anomaly'].forEach(id => { const el=$(`#${id}`); if(el) el.value=''; });
      renderBridgeCheck(); renderNightStats(); renderTrend(); renderWeeklyContextPreview();
    });
  }

  function currentStreak(entries) {
    const dates = [...new Set(entries.map(x => x.date))].sort().reverse();
    if (!dates.length) return 0;
    let cursor = todayISO();
    if (dates[0] !== cursor && daysBetween(dates[0], cursor) === 1) cursor = dates[0];
    else if (dates[0] !== cursor) return 0;
    let streak = 0;
    for (const d of dates) {
      if (d === cursor) { streak++; const x = new Date(`${cursor}T12:00:00`); x.setDate(x.getDate()-1); cursor = `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; }
      else break;
    }
    return streak;
  }
  function renderNightStats() {
    const now = new Date();
    const sevenAgo = new Date(now); sevenAgo.setDate(sevenAgo.getDate()-6);
    const thirtyAgo = new Date(now); thirtyAgo.setDate(thirtyAgo.getDate()-29);
    const inWindow = (n, d) => new Date(`${n.date}T23:59:59`) >= d;
    const n7 = lab.nightly.filter(n => inWindow(n, sevenAgo)).length;
    const n30 = lab.nightly.filter(n => inWindow(n, thirtyAgo));
    const resolved = lab.nightly.filter(n => n.bridgeResult);
    const completion = resolved.length ? Math.round((resolved.filter(n => n.bridgeResult === 'done').length + resolved.filter(n => n.bridgeResult === 'partial').length*.5) / resolved.length * 100) : null;
    const vivid = n30.length ? (n30.reduce((a,n)=>a+Number(n.vividness||0),0)/n30.length).toFixed(1) : null;
    if ($('#stat-nights7')) $('#stat-nights7').textContent = n7;
    if ($('#stat-bridge')) $('#stat-bridge').textContent = completion == null ? '—' : `${completion}%`;
    if ($('#stat-vivid')) $('#stat-vivid').textContent = vivid ?? '—';
    if ($('#stat-streak')) $('#stat-streak').textContent = currentStreak(lab.nightly);
    const d7 = lab.daily.filter(d => recentDate(d.date, 7));
    const scored = d7.flatMap(d => Object.values(d.items || {}));
    const rulePct = scored.length ? Math.round(scored.filter(Boolean).length / scored.length * 100) : null;
    if ($('#stat-rule')) $('#stat-rule').textContent = rulePct == null ? '—' : `${rulePct}%`;
  }

  function renderTrend() {
    const box = $('#night-trend'); if (!box) return;
    const rows = [...lab.nightly].sort((a,b)=>a.date.localeCompare(b.date)).slice(-30);
    if (rows.length < 2) { box.innerHTML = '<div class="empty-thread"><strong>Two sessions create a line.</strong><span>Your state trace will appear here.</span></div>'; return; }
    const W=820,H=210,padL=32,padR=18,padT=14,padB=27;
    const x = i => padL + i*(W-padL-padR)/(rows.length-1);
    const y = v => padT + (10-Number(v||0))*(H-padT-padB)/9;
    const path = key => rows.map((r,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(r[key]).toFixed(1)}`).join(' ');
    const grid = [1,5,10].map(v=>`<line class="chart-grid" x1="${padL}" x2="${W-padR}" y1="${y(v)}" y2="${y(v)}"/><text class="chart-label" x="4" y="${y(v)+3}">${v}</text>`).join('');
    const labels = rows.map((r,i) => (i===0 || i===rows.length-1 || i%5===0) ? `<text class="chart-label" x="${x(i)}" y="${H-5}" text-anchor="middle">${esc(r.date.slice(5))}</text>` : '').join('');
    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mood, vividness and embodiment over recent sessions">${grid}<path class="chart-mood" d="${path('mood')}"/><path class="chart-vivid" d="${path('vividness')}"/><path class="chart-embody" d="${path('embodiment')}"/>${labels}</svg>`;
  }

  function currentHabitSnapshot() {
    const key = `life90_habits_${isoWeekKey()}`;
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) { return {}; }
  }
  function currentWeekMetrics() { return lab.weeklyMetrics.find(x => x.weekKey === isoWeekKey()) || null; }

  function initMetrics() {
    const ids = ['deepwork','hindi','strength','cardio','practical','destination','social','runway'];
    const existing = currentWeekMetrics();
    if (existing) {
      ids.forEach(id => { const el=$(`#metric-${id}`); if(el) el.value = existing[id] ?? 0; });
      if ($('#metric-events')) $('#metric-events').value = existing.events || '';
    }
    $('#save-week-metrics')?.addEventListener('click', () => {
      const row = { weekKey: isoWeekKey(), savedAt: new Date().toISOString() };
      ids.forEach(id => row[id] = Number($(`#metric-${id}`)?.value || 0));
      row.events = $('#metric-events')?.value.trim() || '';
      const idx = lab.weeklyMetrics.findIndex(x => x.weekKey === row.weekKey);
      if (idx >= 0) lab.weeklyMetrics[idx] = row; else lab.weeklyMetrics.push(row);
      saveLab();
      $('#metric-save-status').textContent = `Saved ${row.weekKey}.`;
      setTimeout(()=>$('#metric-save-status').textContent='',2500);
      renderWeeklyContextPreview();
    });
  }

  function recentDate(date, days=7) { const cutoff=new Date(); cutoff.setDate(cutoff.getDate()-(days-1)); cutoff.setHours(0,0,0,0); return new Date(`${date}T12:00:00`) >= cutoff; }
  function recentNightly(days=7) {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate()-(days-1)); cutoff.setHours(0,0,0,0);
    return lab.nightly.filter(n => new Date(`${n.date}T12:00:00`) >= cutoff).sort((a,b)=>a.date.localeCompare(b.date));
  }
  function buildResearchSnapshot() {
    const habits = currentHabitSnapshot();
    const habitCount = Object.values(habits).filter(Boolean).length;
    const openPred = lab.predictions.filter(p=>!p.result);
    return {
      generatedAt: new Date().toISOString(), weekKey: isoWeekKey(),
      northStar: localStorage.getItem('life90_north_star') || '',
      ninetyDayFocus: localStorage.getItem('life90_quarter_focus') || '',
      priorManualWeeklyReview: localStorage.getItem('life90_weekly_review') || '',
      birthDate: localStorage.getItem('life90_birth') || '',
      planningHorizon: localStorage.getItem('life90_horizon') || '90',
      frozenTarget: lab.targets.at(-1) || null,
      targetHistory: lab.targets.map(t=>({version:t.version,frozenAt:t.frozenAt,fingerprint:t.fingerprint,data:t.data})),
      dailyLast7: lab.daily.filter(d=>recentDate(d.date,7)).sort((a,b)=>a.date.localeCompare(b.date)),
      sexualAttentionRule: lab.sexualRule || 'none',
      currentHabits: { completed: habitCount, total: Object.keys(habits).length, detail: habits },
      nightlyLast7: recentNightly(7).map(n => ({date:n.date,targetAge:n.targetAge,minutes:n.minutes,sleepHours:n.sleepHours,mood:n.mood,energy:n.energy,stress:n.stress,activation:n.activation,vividness:n.vividness,embodiment:n.embodiment,recognition:n.recognition,scene:n.scene,dialogue:n.dialogue,obstacle:n.obstacle,bridge:n.bridge,ifThen:n.ifThen,anomaly:n.anomaly,bridgeResult:n.bridgeResult})),
      objectiveLedger: currentWeekMetrics(),
      hypotheses: seededHypotheses.map(h=>({id:h.id,type:h.type,title:h.title,primary:h.primary})),
      openPredictions: openPred,
      recentlyResolvedPredictions: lab.predictions.filter(p=>p.result).slice(-5),
      recentObservations: lab.observations.slice(-10),
      recentWeeklySyntheses: lab.reviews.slice(-3).map(r=>({weekKey:r.weekKey,finishedAt:r.finishedAt,synthesis:r.synthesis}))
    };
  }
  function contextText() { return JSON.stringify(buildResearchSnapshot(), null, 2); }
  function renderWeeklyContextPreview() {
    const box = $('#review-context-preview'); if (!box) return;
    const s = buildResearchSnapshot();
    const nights = s.nightlyLast7.length;
    const ledger = s.objectiveLedger ? 'ledger saved' : 'ledger not saved';
    const daily=s.dailyLast7?.length||0; const target=s.frozenTarget?`target v${s.frozenTarget.version} frozen`:'target not frozen';
    box.textContent = `${s.weekKey} · ${nights}/7 nightly entries · ${daily}/7 daily rule entries · ${s.currentHabits.completed}/${s.currentHabits.total || 0} current habit systems · ${ledger} · ${target} · ${s.openPredictions.length} open predictions\nNorth Star: ${s.northStar || '(not set)'}\n90-day focus: ${s.ninetyDayFocus || '(not set)'}`;
    if ($('#review-week-label')) $('#review-week-label').textContent = s.weekKey;
  }

  function loadApiConfig() {
    let cfg = { endpoint: 'https://api.openai.com/v1/responses', model: '', remember: false };
    try { cfg = {...cfg, ...JSON.parse(localStorage.getItem(API_CONFIG_KEY) || '{}')}; } catch (_) {}
    return cfg;
  }
  let apiConfig = loadApiConfig();
  function getApiKey() { return sessionStorage.getItem(API_SESSION_KEY) || localStorage.getItem(API_SAVED_KEY) || ''; }
  function saveApiConfigFromForm() {
    apiConfig = {
      endpoint: ($('#api-endpoint')?.value || '').trim(),
      model: ($('#api-model')?.value || '').trim(),
      remember: Boolean($('#remember-api-key')?.checked)
    };
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify(apiConfig));
    const key = ($('#api-key')?.value || '').trim();
    if (key) sessionStorage.setItem(API_SESSION_KEY, key);
    if (apiConfig.remember && key) localStorage.setItem(API_SAVED_KEY, key);
    else if (!apiConfig.remember) localStorage.removeItem(API_SAVED_KEY);
    renderApiState();
  }
  function renderApiState() {
    const ready = Boolean(apiConfig.endpoint && apiConfig.model && getApiKey());
    const pill = $('#api-state'); if (pill) { pill.textContent = ready ? 'Configured' : 'Not configured'; pill.classList.toggle('ready', ready); }
  }

  async function callModel(messages, purpose='review') {
    saveApiConfigFromForm();
    const endpoint = apiConfig.endpoint, model = apiConfig.model, key = getApiKey();
    if (!endpoint || !model || !key) throw new Error('Add endpoint, model and API key first.');
    const headers = {'Content-Type':'application/json','Authorization':`Bearer ${key}`};
    let body;
    const isResponses = /\/responses\/?(?:\?|$)/.test(endpoint);
    if (isResponses) {
      const system = messages.filter(m=>m.role==='system').map(m=>m.content).join('\n\n');
      const input = messages.filter(m=>m.role!=='system').map(m=>({role:m.role,content:m.content}));
      body = { model, instructions: system, input, store: false };
      if (purpose === 'test') body.max_output_tokens = 24;
    } else {
      body = { model, messages, stream: false };
      if (purpose === 'test') body.max_tokens = 24;
    }
    const res = await fetch(endpoint, {method:'POST',headers,body:JSON.stringify(body)});
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch (_) { throw new Error(`API returned ${res.status}: ${text.slice(0,240)}`); }
    if (!res.ok) throw new Error(data?.error?.message || data?.message || `API error ${res.status}`);
    if (isResponses) {
      if (typeof data.output_text === 'string' && data.output_text) return data.output_text;
      const chunks = [];
      for (const item of data.output || []) for (const c of item.content || []) if (c.type === 'output_text' && c.text) chunks.push(c.text);
      if (chunks.length) return chunks.join('\n');
    }
    const out = data?.choices?.[0]?.message?.content;
    if (typeof out === 'string') return out;
    throw new Error('Could not extract text from the API response. Check endpoint compatibility.');
  }

  const interviewerSystem = `You are the Life90 weekly research interviewer for a single participant conducting a longitudinal N=1 study of future-self visualization, Recognition practice, behavior, attention, wellbeing and a stronger metaphysical co-creation hypothesis.

GOAL OF THE INTERVIEW
Help the participant build a life with durable autonomy by age ~35 while producing an honest longitudinal record. Their preferred future includes a quiet, land-based, animal-rich home life, portable income, physical capability, local/language integration, scholarship/contemplation, and freedom to choose relationships rather than require them for structure. Do not over-reference this image; use it as the planning destination.

METHOD RULES
1. Ask ONE substantive question at a time. Adapt to the answer; do not dump a questionnaire.
2. Begin from the supplied data. Notice contradictions between diary, habits and objective ledger.
3. Separate OBSERVATION, INFERENCE, and METAPHYSICAL INTERPRETATION. Never present manifestation, OBE ontology, channeling, nonlocal causation, or “I am Shiva/Creator” language as scientifically established fact. You may work respectfully within these as philosophical or contemplative lenses.
4. Do not mock or pathologize spiritual language. Translate it into testable consequences where possible: attention, affect, action-selection, behavior, relationships, objective outcomes, prospective predictions.
5. Guard against confirmation bias: ask about misses, ordinary explanations, changed search/network behavior, flexible criteria and base rates.
6. Guard against passive fantasy: every useful insight should eventually touch a real obstacle and an observable bridge action.
7. Check wellbeing as data: sleep, energy, stress, impulsivity, unusually elevated activation, ability to work, relationships and grounded functioning. If conviction is rising while functioning deteriorates, say so plainly and prioritize stabilizing basics.
8. No flattery, hype, destiny language or generic coaching. Be precise, curious and willing to challenge rationalization.
9. Cover, over the interview: what actually happened; mental/physical state; nightly practice; bridge follow-through; objective goal movement; avoidance/friction; relationships/community; anomalous/synchronicity material if present; what should change next week.
10. Treat the latest frozen target specification as the primary destination contract. Do not silently relax its criteria; note deviations explicitly.
11. If a sexual-attention rule is active, evaluate it only through the participant's own data (focus, agitation, sleep, mood, adherence, work). Traditional vīrya/jing claims are interpretive lenses, not established biomedical facts. Do not encourage shame or compulsive suppression.
12. Aim for roughly 6–10 questions total unless the user wants to finish sooner.

When first invoked, inspect the JSON dataset and ask the single highest-information question. When asked to FINISH, do not ask another question. Produce a compact synthesis with these exact headings:
WEEK IN ONE SENTENCE
OBSERVED MOVEMENT
MENTAL / PHYSICAL STATE
WHAT COMPOUNDED
WHAT DRIFTED
MANIFESTATION-LAB INTERPRETATION
MUNDANE / COMPETING EXPLANATIONS
ONE BOTTLENECK
NEXT 7-DAY EXPERIMENT
ONE NON-NEGOTIABLE BRIDGE
DATA TO WATCH
Keep metaphysical conclusions calibrated to the evidence.`;

  let activeReview = null;
  function renderThread() {
    const box = $('#ai-thread'); if (!box) return;
    if (!activeReview || !activeReview.messages.length) {
      box.innerHTML = '<div class="empty-thread"><strong>No interview started.</strong><span>The AI will receive your North Star, recent habits, nightly logs, objective ledger, active experiments and unresolved predictions.</span></div>';
      return;
    }
    box.innerHTML = activeReview.messages.filter(m=>m.role!=='system' && !m.hidden).map(m=>`<div class="ai-msg ${m.role==='assistant'?'assistant':'user'}">${esc(m.content)}</div>`).join('');
    box.scrollTop = box.scrollHeight;
  }
  function setInterviewBusy(busy, status='') {
    const ans = $('#ai-answer'), send = $('#send-ai-answer'), finish = $('#finish-review'), start = $('#start-ai-review');
    if (ans) ans.disabled = busy || !activeReview;
    if (send) send.disabled = busy || !activeReview;
    if (finish) finish.disabled = busy || !activeReview;
    if (start) start.disabled = busy;
    if ($('#ai-review-status')) $('#ai-review-status').textContent = status;
  }
  async function startReview() {
    const snapshot = contextText();
    activeReview = { id: uuid(), weekKey: isoWeekKey(), startedAt: new Date().toISOString(), messages: [
      {role:'system',content:interviewerSystem,hidden:true},
      {role:'user',content:`Here is the current Life90 dataset. Treat it as the ground truth for this interview unless I correct it.\n\n${snapshot}\n\nBegin the weekly review. Ask only the single highest-information question.`,hidden:true}
    ]};
    renderThread(); setInterviewBusy(true,'Reading the week…');
    try {
      const reply = await callModel(activeReview.messages);
      activeReview.messages.push({role:'assistant',content:reply}); renderThread(); setInterviewBusy(false,'');
    } catch (err) { activeReview = null; renderThread(); setInterviewBusy(false, err.message); }
  }
  async function sendReviewAnswer(text) {
    if (!activeReview || !text.trim()) return;
    activeReview.messages.push({role:'user',content:text.trim()}); renderThread(); $('#ai-answer').value=''; setInterviewBusy(true,'Thinking across the record…');
    try {
      const reply = await callModel(activeReview.messages);
      activeReview.messages.push({role:'assistant',content:reply}); renderThread(); setInterviewBusy(false,'');
    } catch (err) { setInterviewBusy(false, err.message); }
  }
  async function finishReview() {
    if (!activeReview) return;
    activeReview.messages.push({role:'user',content:'FINISH the weekly review now. Do not ask another question. Produce the calibrated synthesis using the exact required headings.',hidden:true});
    setInterviewBusy(true,'Synthesizing the week…');
    try {
      const reply = await callModel(activeReview.messages);
      activeReview.messages.push({role:'assistant',content:reply});
      activeReview.finishedAt = new Date().toISOString(); activeReview.synthesis = reply;
      lab.reviews.push({...activeReview, messages: activeReview.messages.filter(m=>m.role!=='system')}); saveLab();
      renderThread(); renderReviewHistory();
      const finished = activeReview; activeReview = null; setInterviewBusy(false,`Saved ${finished.weekKey} synthesis locally.`);
      $('#ai-answer').disabled = true; $('#send-ai-answer').disabled = true; $('#finish-review').disabled = true;
    } catch (err) { setInterviewBusy(false, err.message); }
  }

  function initAI() {
    if (!$('#api-endpoint')) return;
    $('#api-endpoint').value = apiConfig.endpoint;
    $('#api-model').value = apiConfig.model;
    $('#remember-api-key').checked = Boolean(apiConfig.remember);
    const key = getApiKey(); if (key) $('#api-key').value = key;
    renderApiState(); renderWeeklyContextPreview();
    $('#save-api-config').addEventListener('click', () => { saveApiConfigFromForm(); $('#api-status').textContent='Configuration saved.'; setTimeout(()=>$('#api-status').textContent='',2200); });
    $('#test-api').addEventListener('click', async () => {
      $('#api-status').textContent='Testing…';
      try { const r=await callModel([{role:'system',content:'Reply with exactly: connected'},{role:'user',content:'test'}],'test'); $('#api-status').textContent=`API replied: ${r.slice(0,80)}`; }
      catch(err){ $('#api-status').textContent=err.message; }
    });
    $('#start-ai-review').addEventListener('click', startReview);
    $('#ai-answer-form').addEventListener('submit', e => { e.preventDefault(); sendReviewAnswer($('#ai-answer').value); });
    $('#finish-review').addEventListener('click', finishReview);
    $('#copy-review-context').addEventListener('click', async () => {
      const text = `${interviewerSystem}\n\nCURRENT DATASET:\n${contextText()}`;
      try { await navigator.clipboard.writeText(text); $('#ai-review-status').textContent='Context copied for use in any chat model.'; }
      catch (_) { $('#ai-review-status').textContent='Clipboard blocked by browser. Export JSON instead.'; }
    });
  }

  function renderReviewHistory() {
    const box = $('#review-history'); if (!box) return;
    const rows = [...lab.reviews].reverse().slice(0,10);
    if (!rows.length) { box.innerHTML='<p class="microcopy">No AI syntheses yet. The first completed interview becomes the start of your longitudinal weekly record.</p>'; return; }
    box.innerHTML = rows.map(r=>`<article class="review-summary"><header><h4>${esc(r.weekKey)}</h4><time>${esc((r.finishedAt||'').slice(0,10))}</time></header><p>${esc(r.synthesis || '').slice(0,1400)}</p></article>`).join('');
  }

  function initResearchTabs() {
    const tabs = $$('#research-subtabs button'), panes = $$('.research-pane');
    tabs.forEach(b => b.addEventListener('click', () => {
      tabs.forEach(x=>x.classList.toggle('active',x===b)); panes.forEach(p=>p.classList.toggle('active',p.dataset.researchPane===b.dataset.researchView));
    }));
  }
  function renderHypotheses() {
    const box=$('#hypothesis-grid'); if(!box) return;
    box.innerHTML = seededHypotheses.map(h=>`<article class="hypothesis-card"><header><span class="hypothesis-id">${esc(h.id)}</span><span class="hypothesis-type">${esc(h.type)}</span></header><h3>${esc(h.title)}</h3><p>${esc(h.claim)}</p><footer><span><strong>Primary:</strong> ${esc(h.primary)}</span><span><strong>Competing:</strong> ${esc(h.alternative)}</span></footer></article>`).join('');
  }

  function initPredictions() {
    const form=$('#prediction-form'); if(!form) return;
    const d = new Date(); d.setDate(d.getDate()+7); $('#prediction-deadline').value = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const p={id:uuid(),frozenAt:new Date().toISOString(),text:$('#prediction-text').value.trim(),deadline:$('#prediction-deadline').value,baseRate:Number($('#prediction-base').value),forecast:Number($('#prediction-forecast')?.value||80),mediated:$('#prediction-mediated').value,criterion:$('#prediction-criterion').value.trim(),result:null,resolvedAt:null,evidence:''};
      lab.predictions.push(p); saveLab(); form.reset(); $('#prediction-base').value=10; if($('#prediction-forecast')) $('#prediction-forecast').value=80; const x=new Date();x.setDate(x.getDate()+7);$('#prediction-deadline').value=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; renderPredictions(); renderWeeklyContextPreview();
    });
    renderPredictions();
  }
  function renderPredictions() {
    const box=$('#prediction-list'); if(!box)return;
    const rows=[...lab.predictions].sort((a,b)=>(a.result?1:0)-(b.result?1:0)||a.deadline.localeCompare(b.deadline));
    if(!rows.length){box.innerHTML='<p class="microcopy">No frozen predictions. Use this sparingly; quality matters more than quantity.</p>';return;}
    box.innerHTML=rows.map(p=>`<article class="prediction-card ${p.result?'resolved':''}" data-pred-id="${esc(p.id)}"><div><h4>${esc(p.text)}</h4><p><strong>Criterion:</strong> ${esc(p.criterion)}</p><div class="prediction-meta"><span>frozen ${esc((p.frozenAt||'').slice(0,10))}</span><span>deadline ${esc(p.deadline)}</span><span>base ${esc(p.baseRate)}%</span>${Number.isFinite(p.forecast)?`<span>forecast ${esc(p.forecast)}%</span>`:''}<span>${p.mediated==='no'?'external-only':'mediation allowed'}</span>${p.result?`<span>result: ${esc(p.result)}</span>`:''}</div>${p.evidence?`<p style="margin-top:8px"><strong>Resolution:</strong> ${esc(p.evidence)}</p>`:''}</div>${p.result?'':`<div class="resolve-buttons"><button data-resolve="hit">Hit</button><button data-resolve="miss">Miss</button><button data-resolve="ambiguous">Ambiguous</button></div>`}</article>`).join('');
    $$('.resolve-buttons button',box).forEach(btn=>btn.addEventListener('click',()=>{
      const card=btn.closest('[data-pred-id]'); const p=lab.predictions.find(x=>x.id===card.dataset.predId); if(!p)return;
      const note=prompt(`Resolution evidence for ${btn.dataset.resolve}:`, '') ?? ''; p.result=btn.dataset.resolve;p.resolvedAt=new Date().toISOString();p.evidence=note.trim();saveLab();renderPredictions();renderWeeklyContextPreview();
    }));
  }

  function initObservations() {
    const form=$('#observation-form');if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const o={id:uuid(),createdAt:new Date().toISOString(),text:$('#observation-text').value.trim(),type:$('#observation-type').value,predicted:$('#observation-predicted').value,mediated:$('#observation-mediated').value,verifiable:$('#observation-verifiable').value,interpretation:$('#observation-interpretation').value.trim()};lab.observations.push(o);saveLab();form.reset();renderObservations();renderWeeklyContextPreview();});renderObservations();
  }
  function renderObservations(){const box=$('#observation-list');if(!box)return;const rows=[...lab.observations].reverse().slice(0,30);if(!rows.length){box.innerHTML='<p class="microcopy">No observations yet. Description comes before explanation.</p>';return;}box.innerHTML=rows.map(o=>`<article class="observation-card"><div><h4>${esc(o.text)}</h4><p>${esc(o.interpretation||'No interpretation recorded.')}</p><div class="observation-meta"><span>${esc(o.type)}</span><span>${o.predicted==='yes'?'prospective':'retrospective'}</span><span>mediated: ${esc(o.mediated)}</span><span>${o.verifiable==='yes'?'verifiable':'private'}</span><span>${esc((o.createdAt||'').slice(0,10))}</span></div></div></article>`).join('');}

  function renderSourceAtlas(){const box=$('#source-atlas');if(!box)return;box.innerHTML=sourceAtlas.map(s=>`<article class="source-theory-card"><header><h3>${esc(s.name)}</h3><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Source ↗</a></header><div class="claim"><strong>Source claim / lens</strong><p>${esc(s.claim)}</p></div><div class="method"><strong>Derived Life90 method</strong><p>${esc(s.method)}</p></div><div class="status"><strong>Evidence status</strong><p>${esc(s.status)}</p><span class="status-evidence">Keep claim-level explicit</span></div></article>`).join('');}

  function initDataTools(){
    $('#export-life90')?.addEventListener('click',()=>{
      const data={exportedAt:new Date().toISOString(),format:'Life90-portable-v1',localStorage:{}};
      for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('life90_')&&k!==API_SAVED_KEY)data.localStorage[k]=localStorage.getItem(k);}
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`life90-export-${todayISO()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);$('#data-status').textContent='Exported. API keys were excluded.';
    });
    $('#import-life90')?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.localStorage||typeof data.localStorage!=='object')throw new Error('Not a Life90 portable export.');if(!confirm('Import will overwrite matching Life90 keys in this browser. Continue?'))return;Object.entries(data.localStorage).forEach(([k,v])=>{if(k.startsWith('life90_')&&k!==API_SAVED_KEY)localStorage.setItem(k,String(v));});$('#data-status').textContent='Imported. Reloading…';setTimeout(()=>location.reload(),500);}catch(err){$('#data-status').textContent=err.message;}});
    $('#clear-research')?.addEventListener('click',()=>{if(!confirm('Clear nightly sessions, weekly AI reviews, predictions and research observations? Other Life90 data stays intact.'))return;localStorage.removeItem(LAB_KEY);lab=freshLab();saveLab();renderBridgeCheck();renderNightStats();renderTrend();renderReviewHistory();renderPredictions();renderObservations();renderWeeklyContextPreview();$('#data-status').textContent='Research data cleared.';});
  }

  function patchPredictionForecastField(){
    const base=$('#prediction-base')?.closest('label');if(!base||$('#prediction-forecast'))return;
    const label=document.createElement('label');label.innerHTML='<span>Your forecast after intention</span><div class="percent-input"><input id="prediction-forecast" type="number" min="0.1" max="99.9" step="0.1" value="80"><em>%</em></div>';
    base.after(label);
  }

  function boot(){
    initTarget();initRitual();initRangeOutputs();initNightForm();initDailyRule();renderBridgeCheck();renderNightStats();renderTrend();
    initMetrics();initAI();renderReviewHistory();initResearchTabs();renderHypotheses();patchPredictionForecastField();initPredictions();initObservations();renderSourceAtlas();initDataTools();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
