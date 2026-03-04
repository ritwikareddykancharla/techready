'use client';

import { useState, useRef, useEffect } from 'react';
import SetupPanel from './components/SetupPanel';
import InterviewPanel from './components/InterviewPanel';

export default function Home() {
  const [activePanel, setActivePanel] = useState<'setup' | 'interview'>('setup');
  const [sessionData, setSessionData] = useState({
    topic: 'Python',
    difficulty: 'Medium',
    messages: [] as any[],
  });

  const handleStart = async (topic: string, difficulty: string) => {
    try {
      const res = await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to start error');

      setSessionData({
        topic,
        difficulty,
        messages: data.messages,
      });
      setActivePanel('interview');
    } catch (err) {
      alert('Error connecting. Check your configuration and try again.');
      throw err;
    }
  };

  const handleReset = () => {
    setActivePanel('setup');
    setSessionData({ ...sessionData, messages: [] });
  };

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="app-container">
        <header>
          <div>
            <div className="logo">Tech<span>Ready</span></div>
            <div className="tagline">// ai-powered mock interviews</div>
          </div>
          <div className="status-pill">
            <div className={`status-dot ${activePanel === 'interview' ? 'live' : ''}`}></div>
            <span>{activePanel === 'interview' ? 'live' : 'offline'}</span>
          </div>
        </header>

        {activePanel === 'setup' ? (
          <SetupPanel
            defaultTopic={sessionData.topic}
            defaultDifficulty={sessionData.difficulty}
            onStart={handleStart}
          />
        ) : (
          <InterviewPanel
            sessionData={sessionData}
            setSessionData={setSessionData}
            onReset={handleReset}
          />
        )}
      </div>
    </>
  );
}
