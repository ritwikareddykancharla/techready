'use client';

import { useState, useRef, useEffect } from 'react';

export default function InterviewPanel({
    sessionData,
    setSessionData,
    onReset,
}: {
    sessionData: any;
    setSessionData: any;
    onReset: () => void;
}) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [sessionData.messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const answer = input.trim();
        setInput('');
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
        }

        // Optimistically add user message
        const newMessages = [...sessionData.messages, { role: 'user', content: answer }];
        setSessionData({ ...sessionData, messages: newMessages });
        setIsLoading(true);

        try {
            const res = await fetch('/api/respond', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer, messages: sessionData.messages }),
            });
            const data = await res.json();
            setSessionData({ ...sessionData, messages: data.messages });
        } catch (err) {
            setSessionData({
                ...sessionData,
                messages: [...newMessages, { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' }],
            });
        }
        setIsLoading(false);
    };

    const handleHint = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/hint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: sessionData.messages }),
            });
            const data = await res.json();
            setSessionData({
                ...sessionData,
                messages: [...sessionData.messages, { role: 'assistant', content: '💡 ' + data.message }],
            });
        } catch (err) {
            setSessionData({
                ...sessionData,
                messages: [...sessionData.messages, { role: 'assistant', content: '⚠️ Could not fetch hint.' }],
            });
        }
        setIsLoading(false);
    };

    const handleSkip = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/skip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: sessionData.messages, topic: sessionData.topic }),
            });
            const data = await res.json();
            setSessionData({ ...sessionData, messages: data.messages });
        } catch (err) {
            setSessionData({
                ...sessionData,
                messages: [...sessionData.messages, { role: 'assistant', content: '⚠️ Could not skip.' }],
            });
        }
        setIsLoading(false);
    };

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
    };

    return (
        <div id="interview-panel" className="active" style={{ display: 'flex' }}>
            <div className="interview-meta">
                <div className="meta-badges">
                    <span className="badge badge-topic">{sessionData.topic}</span>
                    <span className="badge badge-diff">{sessionData.difficulty}</span>
                </div>
                <button className="reset-btn" onClick={onReset}>
                    ← New Session
                </button>
            </div>

            <div id="chat-area">
                {sessionData.messages
                    .filter((m: any) => m.role !== 'system')
                    .map((msg: any, i: number) => (
                        <div key={i} className={`message ${msg.role}`}>
                            <div className={`msg-avatar ${msg.role}`}>
                                {msg.role === 'assistant' ? '🪿' : '👩'}
                            </div>
                            <div className="msg-content">
                                <div className="msg-sender">
                                    {msg.role === 'assistant' ? 'TechReady AI' : 'You'}
                                </div>
                                <div className="msg-bubble">{msg.content}</div>
                            </div>
                        </div>
                    ))}

                {isLoading && (
                    <div className="message typing-indicator">
                        <div className="msg-avatar ai">🪿</div>
                        <div className="msg-content">
                            <div className="msg-sender">TechReady AI</div>
                            <div className="msg-bubble">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="input-area">
                <div className="action-row">
                    <button className="action-btn" onClick={handleHint} disabled={isLoading}>
                        💡 Hint
                    </button>
                    <button className="action-btn" onClick={handleSkip} disabled={isLoading}>
                        ⏭ Skip
                    </button>
                </div>
                <div className="textarea-wrap">
                    <textarea
                        ref={textAreaRef}
                        placeholder="Type your answer here... (Shift+Enter for new line)"
                        rows={2}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKey}
                    />
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                    >
                        ↑
                    </button>
                </div>
                <div className="hint-text">
                    Press Enter to send · Shift+Enter for new line
                </div>
            </div>

            <style jsx>{`
        #interview-panel { flex: 1; flex-direction: column; gap: 0; overflow: hidden; padding-bottom: 16px; animation: fadeUp 0.5s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .interview-meta {
          padding: 12px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
        }
        .meta-badges { display: flex; gap: 8px; }
        .badge { padding: 4px 10px; border-radius: 100px; font-family: 'DM Mono', monospace; font-size: 0.7rem; }
        .badge-topic { background: #7c6af720; color: var(--accent); border: 1px solid #7c6af740; }
        .badge-diff { background: #f75f8a15; color: var(--accent2); border: 1px solid #f75f8a30; }
        
        .reset-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .reset-btn:hover { border-color: var(--accent2); color: var(--accent2); }

        #chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message { display: flex; gap: 12px; animation: msgIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes msgIn { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: none; } }

        .msg-avatar {
          width: 32px; height: 32px; border-radius: 10px; display: flex;
          align-items: center; justify-content: center; font-size: 0.9rem;
          flex-shrink: 0; margin-top: 2px;
        }
        .msg-avatar.ai, .msg-avatar.assistant { background: linear-gradient(135deg, var(--accent), var(--accent2)); }
        .msg-avatar.user { background: var(--surface2); border: 1px solid var(--border); }

        .msg-content { flex: 1; }
        .msg-sender {
          font-family: 'DM Mono', monospace; font-size: 0.68rem; line-height: 1;
          color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .msg-bubble {
          background: var(--ai-bubble); border: 1px solid var(--border);
          border-radius: 4px 16px 16px 16px; padding: 14px 18px; font-size: 0.93rem;
          line-height: 1.7; color: var(--text); white-space: pre-wrap;
        }
        .message.user .msg-bubble {
          background: var(--user-bubble); border-color: #2a2a50;
          border-radius: 16px 4px 16px 16px; color: #c8c8f0;
        }

        .typing-indicator .msg-bubble { display: flex; gap: 5px; align-items: center; padding: 16px 18px; width: fit-content; }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }

        .input-area { border-top: 1px solid var(--border); padding-top: 16px; display: flex; flex-direction: column; gap: 10px; }
        .action-row { display: flex; gap: 8px; }
        .action-btn {
          padding: 7px 14px; border-radius: 8px; font-size: 0.77rem; font-family: 'DM Mono', monospace;
          cursor: pointer; transition: all 0.2s; border: 1px solid var(--border); background: var(--surface2); color: var(--muted);
        }
        .action-btn:hover:not(:disabled) { color: var(--text); border-color: var(--accent); }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .textarea-wrap { position: relative; }
        textarea {
          width: 100%; background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; color: var(--text); font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem; line-height: 1.6; padding: 14px 54px 14px 18px; resize: none;
          min-height: 56px; max-height: 160px; transition: border-color 0.2s; overflow-y: auto;
        }
        textarea:focus { outline: none; border-color: var(--accent); }
        textarea::placeholder { color: var(--muted); }

        .send-btn {
          position: absolute; right: 10px; bottom: 10px; width: 36px; height: 36px;
          border-radius: 10px; background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none; color: white; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.08); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .hint-text { font-size: 0.72rem; color: var(--muted); text-align: center; font-family: 'DM Mono', monospace; }
      `}</style>
        </div>
    );
}
