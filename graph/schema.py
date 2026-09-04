"""
lifeOS Graph Schema

Follows workerkit core/schema.py patterns:
- Pydantic dataclasses
- Content-addressed hashing (SHA-256 via JCS)
- Append-only mutations
- Git-trackable JSON

This schema models the life planning dependency graph AND
is designed to evolve into the "model of self" system
described in ENDGAME.md.
"""

from __future__ import annotations
from pydantic import BaseModel, Field
from datetime import datetime
import json
import hashlib


# ─── Content Hashing (workerkit pattern) ─────────────────────────────

def content_hash(obj) -> str:
    """SHA-256 of JSON-serialised object (JCS: sorted keys, no whitespace)."""
    canonical = json.dumps(obj, sort_keys=True, separators=(",", ":"), default=str)
    return hashlib.sha256(canonical.encode()).hexdigest()


# ─── Node Types ──────────────────────────────────────────────────────

NODE_TYPES = {
    # Domain nodes — things that exist in the world
    "money":    "Financial threshold or resource",
    "skill":    "Human capability (language, farming, etc.)",
    "legal":    "Legal requirement or gate (visa, company, lease)",
    "asset":    "Physical thing you own or control (cow, dog, bike)",
    "plant":    "Crop, tree, or herb (tomato, apple, turmeric)",
    "product":  "Output from assets/plants (milk, honey, ghee)",
    "location": "Place (city, property, institution)",
    "milestone": "Time-bound event (BHU start, graduation)",
    "infra":    "Infrastructure (cowshed, coop, lab, Starlink)",

    # Meta nodes — for the "model of self" evolution
    "belief":   "What you believe about something",
    "goal":     "What you're working toward",
    "contradiction": "Where beliefs conflict with behavior",
    "prediction": "AI prediction about your response",
}

# ─── Edge Types ──────────────────────────────────────────────────────

EDGE_TYPES = {
    # Dependency edges
    "depends_on":  "Cannot do Y without X",
    "unlocks":     "X makes Y possible",
    "blocks":      "X prevents Y from happening",

    # Production edges
    "produces":    "X creates Y",
    "feeds_into":  "X is input for Y",
    "costs":       "X requires Y money",

    # Spatial edges
    "located_in":  "X is at Y",
    "grazes_on":   "X eats from Y",
    "grows_in":    "X is planted in Y",

    # Temporal edges
    "happens_before": "X precedes Y",
    "enables":     "X makes Y possible (skill-dependent)",

    # Model-of-self edges (for ENDGAME evolution)
    "associated_with": "X is linked to Y in your life",
    "contradicts": "X conflicts with Y",
    "predicted_by": "AI predicts X from Y",
}


# ─── Core Data Classes ───────────────────────────────────────────────

class LifeNode(BaseModel):
    """A node in the life planning graph."""
    id: str                          # e.g. "asset:gir_cow", "money:50k"
    node_type: str                   # from NODE_TYPES
    cluster: str                     # animals|plants|skills|legal|money|products|infra|meta
    label: str
    description: str = ""
    properties: dict = Field(default_factory=dict)
    image_url: str | None = None
    listing_urls: list[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    def content_hash(self) -> str:
        return content_hash({
            "id": self.id,
            "node_type": self.node_type,
            "label": self.label,
            "properties": self.properties,
        })

    def to_dict(self) -> dict:
        d = self.model_dump()
        d["content_hash"] = self.content_hash()[:16]
        return d


class LifeEdge(BaseModel):
    """A dependency/relationship between nodes."""
    source: str
    target: str
    edge_type: str                   # from EDGE_TYPES
    label: str = ""
    weight: float = 1.0              # importance (0-1)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    def content_hash(self) -> str:
        return content_hash({
            "source": self.source,
            "target": self.target,
            "edge_type": self.edge_type,
        })

    def to_dict(self) -> dict:
        d = self.model_dump()
        d["content_hash"] = self.content_hash()[:16]
        return d


class LifeGraph(BaseModel):
    """The complete life planning graph."""
    version: str = "1.0.0"
    nodes: list[LifeNode] = Field(default_factory=list)
    edges: list[LifeEdge] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    def content_hash(self) -> str:
        return content_hash({
            "version": self.version,
            "node_count": len(self.nodes),
            "edge_count": len(self.edges),
            "node_hashes": sorted([n.content_hash() for n in self.nodes]),
            "edge_hashes": sorted([e.content_hash() for e in self.edges]),
        })

    def get_node(self, node_id: str) -> LifeNode | None:
        for n in self.nodes:
            if n.id == node_id:
                return n
        return None

    def get_edges_from(self, node_id: str) -> list[LifeEdge]:
        return [e for e in self.edges if e.source == node_id]

    def get_edges_to(self, node_id: str) -> list[LifeEdge]:
        return [e for e in self.edges if e.target == node_id]

    def get_cluster(self, cluster: str) -> list[LifeNode]:
        return [n for n in self.nodes if n.cluster == cluster]

    def to_cytoscape(self) -> dict:
        """Export as Cytoscape.js format."""
        elements = []
        for n in self.nodes:
            elements.append({
                "data": {
                    "id": n.id,
                    "label": n.label,
                    "cluster": n.cluster,
                    "node_type": n.node_type,
                }
            })
        for e in self.edges:
            elements.append({
                "data": {
                    "source": e.source,
                    "target": e.target,
                    "label": e.label,
                    "edge_type": e.edge_type,
                }
            })
        return {"elements": elements}

    def to_dict(self) -> dict:
        return {
            "version": self.version,
            "content_hash": self.content_hash()[:16],
            "nodes": [n.to_dict() for n in self.nodes],
            "edges": [e.to_dict() for e in self.edges],
            "stats": {
                "node_count": len(self.nodes),
                "edge_count": len(self.edges),
                "clusters": list(set(n.cluster for n in self.nodes)),
            }
        }


# ─── Media Asset (for ENDGAME.md raw capture system) ─────────────────

class MediaAsset(BaseModel):
    """A raw media asset — video, photo, audio, note."""
    id: str
    asset_type: str                  # video|photo|audio|note|song
    captured_at: str
    uploaded_at: str = ""
    source: str = "iphone_camera"
    original_filename: str = ""
    r2_key: str = ""
    file_size_bytes: int = 0
    mime_type: str = ""

    # Optional enrichment (filled by processors)
    transcript: str | None = None
    location: str | None = None
    people: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    processing_status: str = "raw"   # raw|processing|complete

    # AI interview linkage
    question_id: str | None = None
    prediction: dict | None = None
    reaction_features: dict | None = None

    def content_hash(self) -> str:
        return content_hash({
            "id": self.id,
            "asset_type": self.asset_type,
            "captured_at": self.captured_at,
            "r2_key": self.r2_key,
        })


# ─── Constraint System (geography → vision) ─────────────────────────

class RegionConstraint(BaseModel):
    """A binary constraint: a region either ALLOWS or BLOCKS a vision component."""
    region_id: str
    component: str                    # cow, sheep, goats, chickens, bees, etc.
    allowed: bool                     # True = can do here, False = blocked
    reason: str                       # one-sentence explanation of WHY
    severity: str = "hard"            # hard = physics/climate blocks it; soft = harder but possible


class RegionConstraints(BaseModel):
    """All constraints for a region."""
    region_id: str
    region_name: str
    constraints: list[RegionConstraint]

    def is_allowed(self, component: str) -> bool | None:
        for c in self.constraints:
            if c.component == component:
                return c.allowed
        return None  # component not specified for this region

    def get_blocked(self) -> list[RegionConstraint]:
        return [c for c in self.constraints if not c.allowed]

    def get_allowed(self) -> list[RegionConstraint]:
        return [c for c in self.constraints if c.allowed]


# ─── Goal Decomposition Engine ──────────────────────────────────────

class DecompositionStep(BaseModel):
    """One step in breaking down a far-away goal into today's action."""
    step: int
    goal: str
    requires: list[str] = Field(default_factory=list)  # node IDs
    satisfied: bool = False
    next_step: str | None = None     # which requirement to resolve next
    leaf_action: str | None = None   # if this is actionable TODAY
    region_block: str | None = None  # if a region blocks this step


class DecompositionChain(BaseModel):
    """A full decomposition from far-away goal to today's actions."""
    goal: str
    chain: list[DecompositionStep]
    today_actions: list[str] = Field(default_factory=list)
    blocked_by_region: dict = Field(default_factory=dict)  # component → region that blocks it

    def get_leaf_actions(self) -> list[str]:
        """Extract all actionable today-steps."""
        return [s.leaf_action for s in self.chain if s.leaf_action]

    def get_blockers(self) -> list[dict]:
        """Find all steps blocked by region constraints."""
        return [{"step": s.step, "goal": s.goal, "blocked_by": s.region_block}
                for s in self.chain if s.region_block]


# ─── State Snapshot ─────────────────────────────────────────────────

class StateSnapshot(BaseModel):
    """Point-in-time capture of current state. Git-trackable."""
    snapshot_date: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    region: str | None = None
    points: int = 0
    points_breakdown: dict = Field(default_factory=dict)   # what you have
    skills: dict = Field(default_factory=dict)              # skill → level
    legal: dict = Field(default_factory=dict)               # status of each legal item
    animals: dict = Field(default_factory=dict)             # what you own
    plants: dict = Field(default_factory=dict)              # what's planted
    infrastructure: dict = Field(default_factory=dict)      # what's built
    milestones_completed: list[str] = Field(default_factory=list)

    def content_hash(self) -> str:
        return content_hash({
            "snapshot_date": self.snapshot_date,
            "region": self.region,
            "points": self.points,
            "skills": self.skills,
            "legal": self.legal,
        })

    def can_do(self, component: str, region: str | None = None) -> bool:
        """Check if a vision component is currently possible."""
        # This would query the constraint system + current state
        # Placeholder — real implementation checks dependencies
        return False


class InterviewEvent(BaseModel):
    """An AI interview question with prediction."""
    question_id: str
    asked_at: str
    question: str
    reason: str = ""                # why this question was asked
    target_concept: str = ""        # what this question probes

    # Prediction (freeze BEFORE user sees question)
    prediction: dict = Field(default_factory=lambda: {
        "likely_answer": "",
        "confidence": 0.5,
        "expected_latency_seconds": 3,
        "expected_reaction": "",
    })

    # Response (filled AFTER user answers)
    response_video_id: str | None = None
    response_transcript: str | None = None
    response_latency_ms: int | None = None
    reaction_features: dict | None = None

    # Prediction error (computed after response)
    prediction_error: float | None = None  # 0=perfect prediction, 1=total surprise

    def content_hash(self) -> str:
        return content_hash({
            "question_id": self.question_id,
            "question": self.question,
        })
