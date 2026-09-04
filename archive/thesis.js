// LifeOS — Thesis: The Aperture Theory
// What reality is, what should be true, this is a live experiment.

const THESIS = {
  title: "The Aperture Theory",
  subtitle: "Reality is what you measure, track, and act on",
  
  // The core hypothesis
  hypothesis: "The quality of your life is proportional to the quality of what you choose to measure and track. What you don't measure doesn't improve. What you measure compounds. The AI layer makes continuous measurement possible at near-zero marginal cost.",
  
  // What should be true
  claims: [
    {
      id: "C1",
      claim: "Attention determines reality",
      evidence: "Kahneman (2011): 'We are far too willing to reject the belief that much of what we see is random.' What you attend to becomes your experienced world. The aperture — what you notice, track, and optimize — determines what becomes real.",
      status: "hypothesis",
      testable: "Track attention allocation for 30 days. Measure correlation between tracked attention and life satisfaction."
    },
    {
      id: "C2",
      claim: "Measurement compounds",
      evidence: "Clear (2018): 'You do not rise to the level of your goals. You fall to the level of your systems.' Tracking creates feedback loops. Feedback loops enable optimization. Optimization compounds over time. 1% daily improvement = 37x in one year.",
      status: "hypothesis",
      testable: "Compare life metrics before/after starting tracking. Measure delta in key areas."
    },
    {
      id: "C3",
      claim: "The AI layer enables continuous measurement",
      evidence: "Previously, self-tracking required manual effort. An AI agent can observe patterns, suggest experiments, and maintain continuity across sessions. This reduces the marginal cost of measurement to near zero.",
      status: "hypothesis",
      testable: "Track AI interactions over time. Measure whether AI suggestions improve outcomes vs. no AI."
    },
    {
      id: "C4",
      claim: "Life can be treated as a longitudinal N=1 experiment",
      evidence: "Single-subject research design is valid in psychology and medicine. N=1 studies with proper controls can establish causal relationships. The key is: frozen targets, controlled variables, measured outcomes, reproducible methods.",
      status: "hypothesis",
      testable: "Run 90-day experiments with frozen targets. Measure actual outcomes vs. predictions."
    },
    {
      id: "C5",
      claim: "What you measure becomes what you optimize",
      evidence: "Goodhart's Law: 'When a measure becomes a target, it ceases to be a good measure.' But for personal development, the opposite applies: measuring what matters makes it matter more. The act of measurement focuses attention.",
      status: "hypothesis",
      testable: "Track which areas improve after measurement starts. Compare to areas not tracked."
    },
    {
      id: "C6",
      claim: "Compound effects dominate linear effects",
      evidence: "Daily habits compound. Skills compound. Relationships compound. Money compounds. The question is not 'what should I do today?' but 'what compounds over 10 years?'",
      status: "hypothesis",
      testable: "Model compound growth for each tracked area. Compare actual trajectory to linear prediction."
    }
  ],

  // Experimental method
  method: {
    title: "The Experimental Method",
    layers: [
      {
        name: "Observe",
        description: "Track what actually happens. Habits, energy, output, mood, relationships. The raw data of your life.",
        tool: "Habit tracking, daily journal, AI pattern detection"
      },
      {
        name: "Hypothesize",
        description: "What would improve if you changed X? Based on observation, form testable claims about causation.",
        tool: "Weekly review, AI analysis, literature review"
      },
      {
        name: "Experiment",
        description: "Run the change for a defined period. Keep controls. Measure the outcome. This is not self-help — it's science.",
        tool: "90-day sprints, frozen targets, controlled variables"
      }
    ],
    principles: [
      "One variable at a time — don't change 5 things and attribute improvement to one",
      "Freeze the target before starting — no moving the goalposts",
      "Measure outcomes, not intentions — what happened, not what you planned",
      "Reproducibility — could you run the same experiment again and get similar results?",
      "Negative results are valuable — knowing what doesn't work is knowledge"
    ]
  },

  // The live experiment
  experiment: {
    title: "Current Live Experiment",
    hypothesis: "Building an autonomous security research lab will produce measurable capability improvements that transfer across domains",
    method: "BitSec → BountyBench → RedTeam SN61 (transfer ladder)",
    control: "Frozen WorkerVersion v0",
    candidate: "Mutated WorkerVersion v1",
    metrics: ["detection_rate", "f1_score", "false_positive_rate"],
    status: "RUNNING",
    started: "2026-09-01",
    results: {
      baseline_dr: "7.6%",
      best_dr: "25.7%",
      promotions: 1,
      rejections: 2
    }
  },

  // What this means
  implications: [
    "Your life is not a story to be told — it's an experiment to be run",
    "The quality of your measurements determines the quality of your decisions",
    "AI makes continuous measurement possible at near-zero cost",
    "What compounds beats what's intense",
    "The aperture you choose determines the reality you experience",
    "This is not philosophy — it's testable, falsifiable, and improvable"
  ]
};

window.THESIS = THESIS;
