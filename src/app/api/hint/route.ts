import { NextResponse } from 'next/server';
import { callOpenRouter } from '../utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const history = data.messages || [];

        const hintRequest = [...history, { role: 'user', content: "I'm stuck. Can you give me a small hint without revealing the full answer? Just a nudge in the right direction." }];
        const reply = await callOpenRouter(hintRequest);

        return NextResponse.json({
            message: reply,
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
