// lifeOS API Backend — opencode-go + mimo-v2.5
const API_BASE = 'https://opencode.ai/zen/go/v1';
const MODEL = 'mimo-v2.5';

// Hardcoded API key (from vault)
const API_KEY = 'sk-fv9GAkxq7nRiVTX0l8gLEUoPc79spJGqU9HkSjswVLnoQfTuWz5HY1R8hA44g8ZU';

async function callLLM(prompt, maxTokens = 2000) {
    try {
        const response = await fetch(`${API_BASE}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: maxTokens,
                temperature: 0.7,
            }),
        });
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    } catch (e) {
        console.error('LLM error:', e);
        return '';
    }
}

// AI-powered life analysis
async function analyzeLife(data) {
    const prompt = `You are a life optimization AI. Based on this data, provide insights:

Age: ${data.age}
Habits: ${JSON.stringify(data.habits)}
Focus goal: ${data.focusGoal}
Recent reviews: ${JSON.stringify(Object.values(data.reviews || {}).slice(-2))}

Provide:
1. Top 3 patterns you notice
2. One specific recommendation for this week
3. What's compounding well vs what's stagnating

Be concise and actionable.`;

    return await callLLM(prompt);
}

// AI-powered habit coaching
async function coachHabit(habit, history) {
    const prompt = `You are a habit coach. Analyze this habit pattern:

Habit: ${habit.name}
Last 7 days: ${JSON.stringify(history)}
Streak: ${habit.streak || 0} days

Provide:
1. Pattern analysis (consistency, gaps, trends)
2. One specific suggestion to improve
3. Motivation based on compound effects

Be concise.`;

    return await callLLM(prompt);
}

// AI-powered weekly review insights
async function reviewInsights(review) {
    const prompt = `You are a reflective coach. Analyze this weekly review:

Wins: ${review.wins}
Lessons: ${review.lessons}
Focus: ${review.focus}

Provide:
1. What patterns do you see in the wins?
2. What's the core lesson from the lessons?
3. Is the focus aligned with the wins?

Be concise and honest.`;

    return await callLLM(prompt);
}

// Life countdown calculations
function calculateCountdown(age, horizon = 90) {
    const now = new Date();
    const birthYear = now.getFullYear() - age;
    const birthDate = new Date(birthYear, now.getMonth(), now.getDate());

    // Hours remaining to horizon
    const msToHorizon = (horizon - age) * 365.25 * 24 * 60 * 60 * 1000;
    const hoursToHorizon = Math.floor(msToHorizon / (1000 * 60 * 60));
    const daysToHorizon = Math.floor(hoursToHorizon / 24);
    const yearsToHorizon = horizon - age;

    // Current decade
    const decadeStart = Math.floor(age / 10) * 10;
    const decadeEnd = decadeStart + 10;
    const yearsInDecade = age - decadeStart;
    const yearsLeftInDecade = decadeEnd - age;
    const hoursInDecade = yearsLeftInDecade * 365.25 * 24 * 60 * 60 * 1000 / (1000 * 60 * 60);

    // Hours in current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const msInYear = endOfYear - startOfYear;
    const msElapsed = now - startOfYear;
    const hoursElapsed = Math.floor(msElapsed / (1000 * 60 * 60));
    const hoursLeftInYear = Math.floor((msInYear - msElapsed) / (1000 * 60 * 60));

    // Major milestones
    const milestones = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
    const nextMilestone = milestones.find(m => m > age) || horizon;

    return {
        age,
        horizon,
        daysToHorizon,
        hoursToHorizon,
        yearsToHorizon,
        yearsInDecade,
        yearsLeftInDecade,
        hoursInDecade: Math.floor(hoursInDecade),
        hoursElapsedInYear: hoursElapsed,
        hoursLeftInYear,
        nextMilestone,
        hoursToNextMilestone: Math.floor((nextMilestone - age) * 365.25 * 24),
    };
}

// Export for use in main app
window.lifeOS = {
    callLLM,
    analyzeLife,
    coachHabit,
    reviewInsights,
    calculateCountdown,
    API_KEY,
    MODEL,
};
