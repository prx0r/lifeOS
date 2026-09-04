# lifeOS To-Do List

*Generated from file audit — 2026-09-04. Every item follows the axioms in AGENTS.md.*

---

## 1. Archive stale files
**Status:** DONE
**What:** `data.json`, `land.json`, `pathways.json` are superseded by `graph.json`, `ecology.json`, `decomposition.json`. Move to `archive/` folder. Git-commit the archive.
**Why:** Stale data creates confusion. The graph is the source of truth.
**Blocks:** Nothing — can do now.

## 2. Add missing plant nodes to graph
**Status:** DONE
**What:** `crops.json` lists potato, rajma, madua, jhangora, buckwheat, ginger, orange, lychee — none of these are in `graph.json`. Add them as `plant:` nodes with proper edges to regions.
**Why:** The graph should represent ALL crops the estate can produce. Currently missing the grains and fruits that form the staple diet.
**Blocks:** Food self-sufficiency analysis.

## 3. Wire points.json to graph milestones
**Status:** DONE
**What:** `points.json` defines costs (e.g., "company registration: 30 points"). `graph.json` has milestone nodes (e.g., `milestone:company_reg`). These should be explicitly linked — each point cost maps to a milestone node.
**Why:** When the agent computes "what can I afford?", it needs to traverse from wallet → points → milestone → dependencies.
**Blocks:** Agent reasoning about affordability.

## 4. Add ecology links to graph edges
**Status:** DONE
**What:** `ecology.json` has soil/mushroom/pollinator data per region. `graph.json` has crop/animal nodes. Need edges like `location:ranikhet → enables → plant:kitchen_garden` (with ecology justification: "pH 5.3-6.98, 9-month season, deep soil").
**Why:** The agent needs to know WHY a region enables a crop — not just that it does.
**Blocks:** Agent reasoning about regional feasibility.

## 5. Fix region ID alignment
**Status:** DONE
**What:** Graph has `location:ranikhet` but geography/ecology use `ranikhet-almora`. Need consistent IDs across all files. Either rename graph nodes or add mapping.
**Why:** Cross-file queries break if IDs don't match.
**Blocks:** Everything that queries across files.

## 6. Update HTML visualization
**Status:** DONE
**What:** `graph/index.html` shows nodes and edges but doesn't show: (a) constraint propagation when a region is selected, (b) point costs on edges, (c) progression chain highlighting, (d) the 6-region comparison matrix.
**Why:** The visualization should make the dependency chains and constraints visible and interactive.
**Blocks:** Human understanding of the system.

## 7. Create initial state snapshot
**Status:** DONE
**What:** Using `StateSnapshot` from `graph/schema.py`, create the first snapshot: current points (10), region (cambodia), skills (hindi: 0), legal status (tourist visa), milestones completed (none). Git-commit it.
**Why:** The agent needs a baseline to compute gaps from.
**Blocks:** Agent reasoning about current state.

## 8. Wire geography constraints to graph as edges
**Status:** DONE
**What:** `geography.json` has binary ALLOW/BLOCK per region per component. These should be edges in `graph.json` — e.g., `location:kasol → blocks → asset:gir_cow` with reason "V-valley, 0.2-0.5 acres flat."
**Why:** When the agent selects a region, constraints must propagate through the graph automatically.
**Blocks:** Region selection → automatic constraint propagation.

## 9. Verify all listing URLs are live
**Status:** DONE
**What:** `listings.json` has 30 property URLs from RealEstateIndia and 99acres. Spot-check 5-10 to ensure they're still live and match the described properties.
**Why:** Broken links = broken data. The agent can't recommend a property that no longer exists.
**Blocks:** Property recommendation reliability.

## 10. Add food self-sufficiency calculation
**Status:** DONE
**What:** `food.json` has month-by-month food data but doesn't compute: calories per day, protein per day, or % self-sufficiency per region. Add these metrics so the agent can answer "how much do I still need to buy?"
**Why:** The agent needs to quantify the gap between production and consumption.
**Blocks:** Budget planning for food expenses.

---

*These to-dos follow the critical path: fix data integrity first (1,2,5), then wire dependencies (3,4,8), then build the agent's reasoning layer (6,7), then verify and compute (9,10).*
