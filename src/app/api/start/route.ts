import { NextResponse } from 'next/server';
import { callOpenRouter, SYSTEM_PROMPT } from '../utils';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const topic = data.topic || 'Python';
        const difficulty = data.difficulty || 'Medium';

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Start a ${difficulty} difficulty mock interview on the topic: ${topic}. Ask me the first question. Keep it focused and clear.` },
        ];

        const reply = await callOpenRouter(messages);

        return NextResponse.json({
            message: reply,
            messages: [...messages, { role: 'assistant', content: reply }],
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
