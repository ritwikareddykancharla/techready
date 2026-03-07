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

export async function callOpenRouter(messages: { role: string; content: string }[]) {
    const apiKey = process.env.OPENROUTER_API_KEY || '';

    // DEBUGGING: Log whether the key exists to Vercel Server Logs
    console.log('[DEBUG] OPENROUTER_API_KEY exists?', !!process.env.OPENROUTER_API_KEY);
    console.log('[DEBUG] OPENROUTER_API_KEY length:', apiKey.length);

    // Early check for missing API key - this will help debug Vercel deployment
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY environment variable is not set. Please configure it in Vercel dashboard.');
    }

    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
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
        const errorText = await response.text();
        console.error('OpenRouter API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
        });
        
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OPENROUTER_API_KEY configuration.');
        }
        if (response.status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        
        throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response from AI service');
    }
    
    return data.choices[0].message.content;
}
