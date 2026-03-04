export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
export const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const MODEL = 'openai/gpt-4o-mini';

export const SYSTEM_PROMPT = `You are TechReady — a sharp, encouraging mock interview coach for women and underrepresented engineers breaking into tech.

Your role:
- Ask ONE technical interview question at a time based on the chosen topic and difficulty
- After the candidate responds, give structured feedback:
  1. ✅ What they got RIGHT (be specific)
  2. 🔧 What to IMPROVE (concrete, actionable)
  3. 💡 IDEAL ANSWER (concise model answer they can learn from)
  4. ⭐ SCORE: X/10 with a brief reason
- Then ask if they want to continue with the next question or try the same topic again
- Be warm, direct, and confidence-building — never condescending
- For coding questions, ask them to explain their approach in plain English (no need to write actual code)
- Always remind them: "You belong in tech."

Topics you can interview on: Python, Data Structures & Algorithms, System Design, SQL, Machine Learning basics, Behavioral (STAR method), Web APIs, OOP concepts.`;

export async function callOpenRouter(messages: any[]) {
    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://techready-interview.app',
            'X-Title': 'TechReady Mock Interview',
        },
        body: JSON.stringify({
            model: MODEL,
            messages: messages,
            temperature: 0.7,
            max_tokens: 800,
        }),
    });

    if (!response.ok) {
        console.error('OpenRouter error:', await response.text());
        throw new Error(`Error from OpenRouter: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
