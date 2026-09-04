# SVATANTRYA

*A git-native personal operating system for building a life.*

---

## What this is

SVATANTRYA is a knowledge graph + dependency tracker + web app for a single person's life vision. It models the path from "0 points, tourist visa, Cambodia" to "Himalayan estate with animals, supplements business, and Indian philosophy scholarship."

Everything is **git-native**: the graph is content-addressed, every change is a commit, the website renders directly from the graph, and a new agent can understand the entire system by reading three files.

## Quick Start (for new agents)

**Read these in order:**

1. **`AGENTS.md`** — 27 axioms. How to reason over this system. Non-negotiable.
2. **`VISION.md`** — What we're building toward. The frozen target.
3. **`graph/graph.json`** — The knowledge graph. 128 nodes, 256 edges. This is the source of truth.

**Then understand:**

4. **`graph/schema.py`** — Pydantic models for all graph structures.
5. **`graph/snapshot.json`** — Current state (0 points, tourist visa, Cambodia).
6. **`finance.json`** — Income, expenses, savings, runway.
7. **`geography.json`** — Region constraints (binary ALLOW/BLOCK).
8. **`ecology.json`** — Soil, mushrooms, pollinators, microclimates.
9. **`points.json`** — 1 point = £500. The scoring system.
10. **`ENDGAME.md`** — The endgame architecture (raw capture → model of self).

## File Structure

```
SVATANTRYA/
├── AGENTS.md              # Agent axioms — READ THIS FIRST
├── VISION.md              # The frozen vision
├── ENDGAME.md             # Endgame architecture
├── TODO.md                # 10 to-dos (all completed)
│
├── graph/
│   ├── graph.json         # THE GRAPH — 128 nodes, 256 edges
│   ├── schema.py          # Pydantic models (workerkit-compatible)
│   ├── snapshot.json      # Current state snapshot
│   ├── protocol.json      # Svātantrya Protocol (the why)
│   ├── decomposition.json # Goal → dependency chain → today's action
│   └── index.html         # Cytoscape.js visualization
│
├── geography.json         # 6 regions, binary constraints
├── ecology.json           # Soil, mushrooms, pollinators
├── listings.json          # 32 real properties with URLs
├── crops.json             # 16 plant types, seasonal data
├── food.json              # Year-round food analysis
├── points.json            # 1pt = £500, progression
├── finance.json           # Income, expenses, runway
│
├── app.html               # Mobile PWA (renders from graph)
├── index.html             # Redirects to app.html
├── worker/
│   ├── index.js           # Cloudflare Worker (R2 uploads)
│   └── wrangler.toml      # Worker config
├── ios-shortcut.json      # iOS Shortcut for capture
├── svatantrya             # Protocol doc (from R2)
│
├── archive/               # Superseded files
└── .gitignore             # Ignores __pycache__, .wrangler
```

## The Graph

The graph (`graph/graph.json`) is the single source of truth. The website renders from it. Every change to the graph is a git commit. The website at any point in time = the graph at that commit.

**14 clusters:**

| Cluster | Nodes | What |
|---------|-------|------|
| animals | 10 | Cow, sheep, goats, chickens, dogs, bees (+ rejections) |
| plants | 16 | Potato, tomato, turmeric, orange, peas, beans, etc. |
| products | 8 | Milk, ghee, cheese, eggs, honey, wool, supplements |
| locations | 8 | Ranikhet, Peora, Kausani, Dhanaulti, Kasol, Rishikesh, BHU, Varanasi |
| territories | 7 | Someshwar, Ranikhet belt, Satpuli, Natadol, Kotabagh, Doiwala, Kausani |
| legal | 10 | Company, DSC, DIN, SPICe+, visa, lease, ISBN, FSSAI, IEC, GST |
| company | 10 | SVATANTRYA Life + Business, supplements, publishing, experiments |
| skills | 4 | Hindi basics → conversational → fluent → literary |
| masters | 7 | BHU programme, CUET, syllabus, Hindi immersion, Varanasi, accommodation |
| deadlines | 10 | AIU certificate, BHU application, tuition, travel, graduation |
| milestones | 12 | Points thresholds (40→78→165→260→400) |
| infra | 7 | Cowshed, coop, fencing, mushroom lab, solar, borewell |
| farm | 10 | Deployable station, solar, water, sensors, AI, polyhouse, biogas, rover |
| robotics | 9 | ArduPilot, ROS 2, Jetson, OAK-D, RTK GPS, RPLIDAR, commercial bots |

## How to Update

1. Edit `graph/graph.json` (add/remove/update nodes and edges)
2. `git add graph/graph.json && git commit -m "description"`
3. `wrangler pages deploy . --project-name=lifeos --branch=main` (deploys to Cloudflare)

**The site auto-updates** — it loads `graph.json` at runtime. No hardcoded content.

## Deployment

- **Cloudflare Pages:** https://main.lifeos-7mb.pages.dev
- **Worker API:** https://lifeos-worker.tradesprior.workers.dev
- **R2 Bucket:** svatantrya (for raw media capture)

```bash
# Deploy site
export CLOUDFLARE_API_TOKEN="..."
wrangler pages deploy . --project-name=lifeos --branch=main

# Deploy worker
cd worker && wrangler deploy
```

## The Dependency Chain

```
NOW (0 pts)
  → AIU Certificate (£5)
    → Hindi start (Varanasi)
      → BHU application
        → Tuition + Hostel (£1,600)
          → Travel + FRRO (£300)
            → Programme Oct 2027
              → Graduation 2029 (£500 visa)
                → Estate move-in
                  → Animals + Farm
                    → Tech layer (solar, water, sensors)
                      → THE DREAM (400 pts)
```

**Every node has a cost. Every edge has a reason. The graph is the truth.**
