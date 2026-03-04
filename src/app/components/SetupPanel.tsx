'use client';

import { useState } from 'react';

export default function SetupPanel({
    defaultTopic,
    defaultDifficulty,
    onStart,
}: {
    defaultTopic: string;
    defaultDifficulty: string;
    onStart: (topic: string, diff: string) => Promise<void>;
}) {
    const [topic, setTopic] = useState(defaultTopic);
    const [difficulty, setDifficulty] = useState(defaultDifficulty);
    const [isStarting, setIsStarting] = useState(false);

    const topics = [
        { id: 'Python', label: '🐍 Python' },
        { id: 'Data Structures', label: '📊 DSA' },
        { id: 'System Design', label: '🏗️ System Design' },
        { id: 'SQL', label: '🗄️ SQL' },
        { id: 'Machine Learning', label: '🤖 ML Basics' },
        { id: 'Behavioral', label: '💬 Behavioral' },
        { id: 'Web APIs', label: '🌐 Web APIs' },
        { id: 'OOP', label: '📦 OOP' },
        { id: 'JavaScript', label: '⚡ JavaScript' },
    ];

    const handleStart = async () => {
        setIsStarting(true);
        try {
            await onStart(topic, difficulty);
        } catch (err) {
            console.error(err);
        }
        setIsStarting(false);
    };

    return (
        <div id="setup-panel" style={{ display: 'flex' }}>
            <div className="setup-hero">
                <h1>
                    You belong<br />in <em>tech.</em>
                </h1>
                <p>
                    Practice real technical interview questions with an AI coach that gives
                    you honest, actionable feedback.
                </p>
            </div>

            <div className="setup-card">
                <div className="form-group">
                    <label>Choose a topic</label>
                    <div className="topic-grid">
                        {topics.map((t) => (
                            <button
                                key={t.id}
                                className={`topic-btn ${topic === t.id ? 'selected' : ''}`}
                                onClick={() => setTopic(t.id)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Difficulty</label>
                    <div className="diff-row">
                        {['Easy', 'Medium', 'Hard'].map((d) => (
                            <button
                                key={d}
                                className={`diff-btn ${difficulty === d ? 'selected' : ''}`}
                                data-d={d}
                                onClick={() => setDifficulty(d)}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className="start-btn"
                    onClick={handleStart}
                    disabled={isStarting}
                >
                    {isStarting ? 'Loading...' : 'Start Interview →'}
                </button>
            </div>

            <style jsx>{`
        #setup-panel {
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 40px 0;
          animation: fadeUp 0.6s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .setup-hero { text-align: center; }
        .setup-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }
        .setup-hero h1 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--accent), var(--accent2) 50%, var(--accent3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .setup-hero p { color: var(--muted); font-size: 1rem; max-width: 440px; margin: 0 auto; line-height: 1.6; }

        .setup-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 540px;
        }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        .topic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .topic-btn {
          padding: 10px 8px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .topic-btn:hover { border-color: var(--accent); color: var(--text); }
        .topic-btn.selected {
          background: #7c6af720;
          border-color: var(--accent);
          color: var(--accent);
          font-weight: 500;
        }

        .diff-row { display: flex; gap: 8px; }
        .diff-btn {
          flex: 1;
          padding: 10px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .diff-btn:hover { color: var(--text); }
        .diff-btn.selected[data-d="Easy"] { border-color: var(--accent3); color: var(--accent3); background: #43e8b015; }
        .diff-btn.selected[data-d="Medium"] { border-color: var(--accent); color: var(--accent); background: #7c6af720; }
        .diff-btn.selected[data-d="Hard"] { border-color: var(--accent2); color: var(--accent2); background: #f75f8a15; }

        .start-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.02em;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .start-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .start-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px #7c6af740; }
        .start-btn:hover::after { opacity: 0.08; }
        .start-btn:active { transform: translateY(0); }
        .start-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        @media (max-width: 600px) {
          .topic-grid { grid-template-columns: repeat(2, 1fr); }
          .setup-hero h1 { font-size: 1.8rem; }
        }
      `}</style>
        </div>
    );
}
