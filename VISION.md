# lifeOS — Vision

## What this is

A git-native personal operating system that tracks the dependencies between money, skills, legal status, animals, plants, infrastructure, and milestones — and connects them to an AI agent that helps you navigate the path to the endgame.

## The endgame

An AI agent you speak to that:
- Knows your current state (money, Hindi level, visa status, animals, income)
- Knows the target state (the estate, the life, the vision)
- Computes what to do next based on what's actually possible right now
- Tracks what you've done, what worked, what didn't
- Integrates with moltwork/workerkit patterns for autonomous operation

## Architecture (future)

```
You
  ↕
lifeOS Agent (Letta — persistent, stateful)
  ├── reads graph.json (current state + dependencies)
  ├── reads protocol.json (daily/weekly cycle)
  ├── reads media (videos, notes, transcriptions)
  ├── tracks money (income, expenses, runway)
  ├── tracks skills (Hindi level, farming knowledge)
  ├── tracks legal status (visa, company, lease)
  ├── tracks animals (health, products, costs)
  ├── tracks plants (growing season, yields)
  └── suggests next actions based on what's unlocked
```

## Data structures needed

### Layer 1: The Graph (built)

Nodes + edges. What exists, what depends on what, what unlocks what.

```
graph/
  schema.py      — Pydantic models (LifeNode, LifeEdge, LifeGraph)
  graph.json     — 51 nodes, 53 edges
  index.html     — Cytoscape.js visualization
```

### Layer 2: State Tracking (next)

The graph is static — it shows what's POSSIBLE. State tracking shows what's REAL.

```json
{
  "snapshot_date": "2026-09-04",
  "money": {
    "current": 0,
    "monthly_income": 0,
    "monthly_expenses": 0,
    "runway_months": 0,
    "target_for_next_unlock": 50000
  },
  "skills": {
    "hindi": {"level": 0, "hours_practiced": 0, "last_session": null},
    "farming": {"level": 0, "hours_practiced": 0},
    "sanskrit": {"level": 0}
  },
  "legal": {
    "visa_type": "tourist",
    "visa_expiry": "2031",
    "company_registered": false,
    "employment_visa": false
  },
  "animals": {},
  "plants": {},
  "location": "cambodia",
  "milestones_completed": [],
  "milestones_next": ["hindi_basics", "bhu_application"]
}
```

### Layer 3: Action Log (next)

What you actually did each day. Append-only. Git-trackable.

```json
{
  "date": "2026-09-04",
  "actions": [
    {"type": "hindi", "duration_min": 15, "detail": "Duolingo lesson 3"},
    {"type": "research", "duration_min": 60, "detail": "BHU application requirements"},
    {"type": "income", "amount": 0, "detail": "No work today"}
  ],
  "graph_mutations": [
    {"type": "node_updated", "id": "skill:hindi_basics", "field": "progress", "value": 0.01}
  ]
}
```

### Layer 4: Agent Context (future)

What the Letta agent needs to know to help you.

```json
{
  "agent_id": "lifeos-tom",
  "memory_blocks": {
    "current_state": "snapshot of graph + state",
    "target_state": "the frozen endgame vision",
    "recent_actions": "last 7 days of action log",
    "obstacles": "what's blocking progress",
    "insights": "what the AI has learned about your patterns"
  },
  "tools": [
    "read_graph — get current graph state",
    "update_state — record a state change",
    "log_action — append to action log",
    "check_unlocks — what money/skill level enables next",
    "suggest_action — what to do today based on current state"
  ]
}
```

### Layer 5: Protocol Integration (later)

The daily/weekly cycle from the Svātantrya Protocol.

```json
{
  "daily_practice": {
    "morning": ["recognition", "read_target", "invoke_rasa", "select_kriya", "identity_rehearsal"],
    "kriya_block": {"track": null, "duration_min": 0, "completed": false},
    "nightly": ["recognition", "bhavana", "rasa", "rowe_mode", "jnaana_to_kriya"],
    "micro_recognition": {"target": 5, "actual": 0}
  },
  "weekly_review": {
    "domains": ["phenomenology", "kriya", "avoidance", "belief", "opportunity", "anomaly"],
    "ai_interview_completed": false
  }
}
```

### Layer 6: Media Ingestion (ENDGAME.md)

Raw capture → R2 → D1 → processors → timeline.

```
POST /api/media/init → presigned URL → R2 → /api/media/complete
    ↓
Whisper transcript
MediaPipe face features
Audio prosody
Embeddings
    ↓
Timeline
    ↓
Model of self
    ↓
AI Interviewer (prediction error tracking)
```

## The separation

**Outer track** (what we're building now):
- Graph nodes and edges
- Money thresholds and unlocks
- Animal/plant data
- Legal status
- Milestones and timeline
- Visualization

**Inner track** (later):
- Svātantrya Protocol
- Daily recognition practice
- Bhavana / rasa cultivation
- Dream incubation
- Concentration training
- The 10 kriyā tracks

**The bridge:**
The inner track drives the outer track. Recognition → Will → Action → Outcome. But the data structures are separate. The graph doesn't need to know about Śiva to function. The protocol doesn't need to know about cows. They meet in you.

## What to build next

1. **State snapshot system** — capture current state of graph at any point
2. **Action logging** — append-only daily log
3. **Unlock checker** — given current state, what's the next unlockable thing
4. **Git integration** — every state change is a commit
5. **Letta agent skeleton** — persistent agent with graph context
6. **Telegram notification** — "what should I do today?"
7. **Progress visualization** — nodes light up as milestones are hit

## The meta-principle

Every piece of data in this system should be:
- **Git-trackable** (content-addressed, versioned)
- **Portable** (JSON, no vendor lock-in)
- **Queryable** (graph traversal, not just file reading)
- **Visual** (Cytoscape.js for exploration)
- **Agent-readable** (Letta can consume it)

The graph is the truth. The agent is the guide. Git is the memory. You are the operator.
