// LifeOS — Personal Configuration (hardcoded for Tom)
// All data is pre-populated. No forms needed.

const CONFIG = {
    // Personal
    name: "Tom",
    age: 27,
    birthDate: "1999-03-15",
    horizon: 90,
    
    // Current focus
    focusGoal: "Build the Security Lab + Agent Security Observatory. Make the learning loop real. Wire Bitt + Private-Lab + CG/CGE into one autonomous system.",
    
    // North star
    northStar: "Autonomous agent security research lab. Measure, reproduce, prove improvement. Then scale to economic venues.",
    
    // 90-day sprint
    sprint90: {
        goal: "Get BitSec learning loop producing real promotions on ScaBench",
        started: "2026-09-01",
        weeks: [
            { week: 1, focus: "Wire CG bridge + ScaBench evaluator", done: true },
            { week: 2, focus: "Fix validity problems (label leakage, synthetic fallback)", done: true },
            { week: 3, focus: "Run paired evaluation v0 vs v1", done: true },
            { week: 4, focus: "Achieve >10% DR baseline on ScaBench", done: false },
            { week: 5, focus: "Wire CGE failure analysis → mutation", done: false },
            { week: 6, focus: "First real promotion (v0 → v1)", done: false },
            { week: 7, focus: "Test on BountyBench for near-transfer", done: false },
            { week: 8, focus: "Wire RedTeam SN61 for far-transfer", done: false },
            { week: 9, focus: "Full integration test (Ledger → Hydra → CGE)", done: false },
            { week: 10, focus: "Deploy to production + submit to SN60", done: false },
            { week: 11, focus: "Monitor results + iterate", done: false },
            { week: 12, focus: "Document + handoff", done: false },
        ],
    },
    
    // Habits (from email: weekly compounding)
    habits: [
        { name: "Exercise 30min", category: "Body", target: "Daily" },
        { name: "Read 20 pages", category: "Mind", target: "Daily" },
        { name: "Meditate 10min", category: "Meaning", target: "Daily" },
        { name: "Hindi practice", category: "Language", target: "5x/week" },
        { name: "Deep work 4hrs", category: "Work", target: "5x/week" },
        { name: "Walk 10k steps", category: "Body", target: "Daily" },
        { name: "No social media before noon", category: "Attention", target: "Daily" },
        { name: "Journal 5min", category: "Reflection", target: "Daily" },
    ],
    
    // Age-27 priorities (from email)
    priorities: [
        { id: "01", title: "Create reliable income floor", domain: "Freedom", detail: "Build work that survives geography, employers and market shifts." },
        { id: "02", title: "Automate saving and investing", domain: "Money", detail: "Increase percentage as income rises." },
        { id: "03", title: "Build physical reserve", domain: "Body", detail: "2+ strength sessions, 150+ aerobic minutes weekly." },
        { id: "04", title: "Make Hindi daily", domain: "Language", detail: "A modest daily floor plus real conversations." },
        { id: "05", title: "Prototype the life before buying it", domain: "Reality", detail: "Spend time in the places you think you want." },
        { id: "06", title: "Accumulate practical rural competence", domain: "Practical", detail: "Gardening, repairs, water systems, animal care." },
        { id: "07", title: "Keep fixed costs low", domain: "Freedom", detail: "Low burn = runway + experimentation." },
        { id: "08", title: "Deepen a few relationships", domain: "Relationships", detail: "Durable friendships + recurring communities." },
        { id: "09", title: "Record family history", domain: "Closing window", detail: "Talk to parents now. Information cannot be reconstructed later." },
        { id: "10", title: "Protect teeth, sleep, prevention", domain: "Maintenance", detail: "Make it automatic while nothing is wrong." },
        { id: "11", title: "Choose one craft worth a decade", domain: "Skill", detail: "Sustained mastery > perpetual sampling." },
        { id: "12", title: "Practice enough stillness", domain: "Meaning", detail: "Daily contemplative practice." },
    ],
    
    // Path to 35
    pathTo35: [
        { age: "27", title: "Foundation", text: "Stabilize income. Automate saving. Train consistently. Make Hindi daily. Write the target lifestyle in concrete terms." },
        { age: "28-29", title: "Prototype", text: "Spend time in northern India. Test rural routines. Learn gardening, repairs, cooking, water/solar basics." },
        { age: "30-31", title: "Location-independent work", text: "Build specialist reputation, recurring clients/products, investments." },
        { age: "32-33", title: "Select the environment", text: "Trial longer rentals. Learn local property/lease realities." },
        { age: "34-35", title: "Commit without trapping", text: "Establish the place when income, knowledge and competence make it robust." },
    ],
    
    // Aperture Theory settings
    aperture: {
        layers: ["Observe", "Hypothesize", "Experiment"],
        method: "Track what you measure. What you don't measure doesn't improve.",
        aiEnabled: true,
        apiModel: "mimo-v2.5",
    },
    
    // Visualization preferences (from Tufte/Cleveland)
    visualization: {
        principle: "Data-ink ratio: show the data, minimize decoration",
        hierarchy: "Position > length > angle > area > color",
        questions: {
            dashboard: "What's my trajectory right now?",
            habits: "Am I consistent?",
            focus: "Am I making progress?",
            timeline: "What becomes valuable when?",
            windows: "What's closing?",
        },
    },
};

// Export
window.CONFIG = CONFIG;
