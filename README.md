# Life90 v3 — Life Operating System + Manifestation Research Lab

A dependency-free browser app for making a finite life legible and running a longitudinal N=1 experiment on future-self visualization, Recognition practice, behavior, and stronger manifestation hypotheses.

## Run

Unzip the folder and open `index.html` in a modern browser. For the AI interview, some providers may block API calls from a `file://` page. If that happens, run a tiny local server from this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

No build step, database, account, npm install, or backend is required.

## Main tabs

- **Clock** — remaining hours/days to a chosen planning horizon, decade clock, milestones, year map.
- **Do now** — age-adaptive brain/body/mind guidance, ranked leverage points, weekly habits, 90-day focus.
- **Life timeline** — what becomes more valuable, what to protect, and closing windows by life stage.
- **Principles** — repeated hindsight themes from older adults, separated from scientific claims.
- **Path to 35** — staged autonomy trajectory.
- **Experiment** — frozen target, nightly visualization/Recognition protocol, daily Rule of Life, weekly AI interview, hypotheses, prospective predictions, observations, method atlas, export/import.
- **Science** — cautious evidence summary and primary references.

## Experiment design

### Frozen target

The destination can be specified in externally scorable terms and frozen as a versioned target with a timestamp and SHA-256 fingerprint. Later edits create a new version instead of rewriting the old target. The terminal outcome is deliberately binary (YES/NO against the frozen target); differences are recorded separately.

### Nightly protocol

1. **Recognize** — use the Aperture / Process Inexternalism lens without treating it as an empirical conclusion.
2. **Release** — reduce urgency and the need to prove anything tonight.
3. **Enter** — inhabit one ordinary, first-person future scene.
4. **Listen** — allow active-imagination / future-self material to surprise rather than fully script it.
5. **Contrast** — name the real obstacle between the present and the scene.
6. **Bridge** — choose one observable action and bind it to an if→then cue.

The next session asks whether the previous bridge action was done, partial, or missed.

### Daily Rule of Life

Tracks Recognition/stillness, future-scene practice, bridge completion, economic deep work, Hindi, physical reserve, practical competence, attention protection, sleep, and an optional user-chosen sexual-attention discipline.

Sexual restraint is explicitly labeled as an optional self-regulation experiment. Traditional brahmacarya/vīrya and Daoist jing interpretations are included as historical/contemplative lenses; the app does **not** claim that semen retention has a proven mystical-energy, testosterone, or general performance benefit.

### Weekly AI interview

The user supplies:

- an OpenAI-compatible API endpoint;
- a model ID supported by that provider;
- an API key.

The interviewer receives the current stored dataset and conducts an adaptive one-question-at-a-time review. Its system instructions require separation of observation, inference, and metaphysical interpretation; attention to misses and ordinary causal explanations; checking sleep/activation/functioning; and ending with a concrete seven-day experiment and bridge action.

The client supports both OpenAI Responses-style endpoints ending in `/responses` and Chat Completions-style OpenAI-compatible endpoints.

### Research layers

- **Empirical:** does the practice change behavior, attention, future-self continuity, wellbeing, and objective progress?
- **Inexternalist/interpretive:** can intrinsic state and extrinsic trajectory be understood as aspects of one evolving concrete process rather than two independent domains?
- **Strong metaphysical:** do prospectively specified external outcomes show evidence not exhausted by ordinary behavioral, social, attentional, or chance explanations?

Positive results at one layer are not automatically counted as evidence for a stronger layer.

## Privacy and storage

Life90 stores entries in browser `localStorage`. API keys are kept in `sessionStorage` by default; the optional “remember key” toggle stores the key in local storage on that browser. JSON exports intentionally exclude API keys.

Use **Experiment → Data → Export JSON** regularly if the record matters to you.

## Important epistemic rule

The app is designed to let a strong metaphysical hypothesis be practiced seriously without making the log unfalsifiable. It preserves alternative explanations, prospective predictions, misses, objective metrics, and target versions. Unusual experiences are recorded as phenomenological data before they are interpreted.

Life90 is not medical advice, a longevity prediction, or proof of any metaphysical system.
