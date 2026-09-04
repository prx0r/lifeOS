# SVATANTRYA — Project Specs for Next Agent

*What to build, in order of dependency, with monetisation potential mapped.*

---

## Repository Landscape (prx0r on GitHub)

| Project | What | Monetisation | Priority |
|---------|------|-------------|----------|
| **proofdesk** | AI document intelligence | SaaS / API | HIGH — existing revenue potential |
| **domainarena** | Domain analysis | Tool / SaaS | MEDIUM |
| **livellm** | LLM pricing comparison | Data product / affiliate | HIGH — traffic → affiliate |
| **hackathonhelp** | Hackathon intelligence | Community / leads | MEDIUM — builds network |
| **bitt** | Bittensor operations | Crypto income | HIGH — active income |
| **mw (moltwork)** | Open economic layer for AI | Platform / protocol | HIGH — core business |
| **tao-trading** | TAO trading | Crypto income | HIGH — active income |
| **cg / cge** | Agentic evolution lab | Open source / consulting | MEDIUM — IP value |
| **llmdeals** | LLM pricing comparison | Data product | HIGH — SEO traffic → affiliate |
| **fleece** | Pool intelligence (prediction markets) | Tool / data | MEDIUM — niche |
| **get-me-money** | Agent-native earning station | Tool / automation | HIGH — directly generates income |
| **svatantrya** | Life planning system | Personal + publishing | THE VISION |

---

## Project Specs — What to Build

### 1. Git Income Tracker (Week 1-2)

**What:** A tool that connects to GitHub API, tracks commits, PRs, and maps them to income streams.

**Why:** Currently you don't know which projects generate the most revenue per hour. This gives you the data.

**Data model:**
```json
{
  "repo": "proofdesk",
  "period": "2026-09",
  "commits": 45,
  "hours_estimated": 30,
  "revenue_gbp": 500,
  "revenue_per_hour": 16.67,
  "category": "freelance_client_work"
}
```

**Build:** Python script → GitHub API → SQLite → simple dashboard

**Monetisation:** Internal tool. But could be open-sourced as "Git Income Tracker" — there's no good tool for this.

---

### 2. LLM Deals SEO Optimisation (Week 1)

**What:** `llmdeals` already exists. It compares AI model pricing. It has SEO traffic potential.

**Action:** Audit the current site. Check Google rankings for "LLM pricing comparison", "AI model cost comparison", "GPT pricing". Optimise content. Add affiliate links to provider sign-ups.

**Revenue potential:** Affiliate income from AI provider referrals. Could be £100-500/mo passively.

**Effort:** Low — the site exists. Just needs content optimisation and SEO.

---

### 3. Hackathon Intelligence Feed (Week 2-3)

**What:** `hackathonhelp` exists. Enhance it with automated prize tracking, deadline alerts, and historical success data.

**Action:** Scrape hackathon platforms (Devpost, MLH, EthGlobal). Build a feed. Notify you of high-EV opportunities.

**Revenue potential:** Hackathon prizes are the direct revenue. But also: the feed becomes a product others would pay for.

**Effort:** Medium — scraping + cron jobs + notification system.

---

### 4. get-me-money Enhancement (Week 2-3)

**What:** `get-me-money` is an "agent-native earning station." This is the money engine.

**Action:** Add revenue streams:
- Bounties (Gitcoin, Immunefi, hackathons)
- Freelancing (Toptal, Upwork — but leverage AI to deliver faster)
- Content (YouTube, writing — document the journey)
- Consulting (AI/agent setup for businesses)

**Revenue potential:** This IS the income generation. £500-2,000/mo target.

**Effort:** High — this is the core money machine.

---

### 5. SVATANTRYA Vision Board (Week 3)

**What:** The app.html is a static renderer. Make it a proper PWA with:
- Photo gallery from actual property listings (not stock)
- Progress tracking (points earned over time)
- AI agent chat interface (connected to Letta)
- Capture upload (R2 integration)

**Action:** Enhance app.html with:
- Real listing photos scraped from property sites
- Points tracker that reads from snapshot.json
- Chat that reads from graph.json and responds

**Revenue potential:** None directly. But this is the operating system for the vision.

**Effort:** Medium — already have the infrastructure.

---

### 6. SVATANTRYA Publishing Platform (Month 2-3)

**What:** The company publishes Indian philosophy content. Start with:
- Blog posts on Shaivism (BHU thesis as first content)
- YouTube videos (Hindi + English)
- Newsletter (Substack or similar)

**Action:** 
- Write 10 foundational posts on Abhinavagupta, recognition, Kashmir Shaivism
- Record 5 Hindi videos on the same topics
- Set up newsletter with Beehiiv or Substack

**Revenue potential:** Newsletter sponsorships, YouTube ad revenue, book sales. Low initially, compounds.

**Effort:** Medium — the content exists in your BHU work. Repackage.

---

### 7. Supplement Product Pipeline (Month 3-6)

**What:** SVATANTRYA supplements — handpicked, live-streamed process, YouTube validated.

**Action:**
- Source shilajit from Uttarakhand (you're near the source)
- Start mushroom cultivation (lions mane, reishi — grow kits are cheap)
- Document the process on YouTube
- Package and sell locally first, then online

**Revenue potential:** High margin. Shilajit ₹3,750-6,250/100g. Mushrooms ₹500-1,500/kg.

**Effort:** Medium — the estate lab is where this happens.

---

### 8. LifeOS Agent Integration (Month 4-6)

**What:** Connect the graph to a Letta agent that can:
- Read your current state (snapshot.json)
- Query constraints (geography.json)
- Suggest actions based on dependency chains
- Track your progress over time

**Action:** 
- Set up Letta runtime service (already exists in workerkit)
- Load graph.json as agent context
- Create tools: read_graph, update_state, check_constraints, suggest_action
- Deploy to Cloudflare Workers

**Revenue potential:** None directly. This is the operating system.

**Effort:** High — but workerkit already has the infrastructure.

---

## Priority Order for Next Agent

```
WEEK 1-2: Git Income Tracker + LLM Deals SEO
          → understand where money comes from
          → optimise existing revenue streams

WEEK 2-3: get-me-money enhancement + Hackathon feed
          → automate income generation
          → find high-EV opportunities

WEEK 3-4: SVATANTRYA Vision Board (proper PWA)
          → real photos, progress tracking, agent chat
          → this is the interface to the graph

MONTH 2-3: Publishing platform (blog + YouTube)
          → start producing content from BHU work
          → build audience while studying

MONTH 3-6: Supplement pipeline (if estate is secured)
          → source, process, document, sell
          → YouTube validates everything

MONTH 4-6: LifeOS Agent
          → connect graph to Letta
          → persistent memory, constraint reasoning
```

## Key Principle

> Build tools that make money FIRST. Then use the money to fund the vision. The AI tools (proofdesk, llmdeals, get-me-money) are the capital engine. The estate is what the capital buys.
