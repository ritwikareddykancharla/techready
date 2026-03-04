import { NextResponse } from 'next/server';
import { callOpenRouter } from '../utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const history = data.messages || [];
        const topic = data.topic || 'the same topic';

        const skipMsg = [...history, { role: 'user', content: `Skip this question and give me a new ${topic} question please.` }];
        const reply = await callOpenRouter(skipMsg);

        return NextResponse.json({
            message: reply,
            messages: [...history, { role: 'assistant', content: reply }],
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
