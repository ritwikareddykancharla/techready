import { NextResponse } from 'next/server';
import { callOpenRouter } from '../utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const userAnswer = data.answer || '';
        const history = data.messages || [];

        const newHistory = [...history, { role: 'user', content: userAnswer }];
        const reply = await callOpenRouter(newHistory);

        return NextResponse.json({
            message: reply,
            messages: [...newHistory, { role: 'assistant', content: reply }],
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
