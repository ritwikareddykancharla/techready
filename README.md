# TechReady — AI Mock Interview Coach

> *Helping women and underrepresented engineers break into tech — one interview at a time.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 4-Line Problem Frame

| | |
|---|---|
| **User** | Women and underrepresented engineers preparing for technical job interviews |
| **Problem** | Mock interview practice is expensive, inaccessible, or intimidating — leaving candidates underprepared |
| **Constraints** | Must work without a login, be free to use, and provide real-time feedback in plain language |
| **Success Test** | A user can complete a full mock interview session, receive structured feedback, and feel more confident about their next real interview |

---

## 💡 What It Does

TechReady is an AI-powered mock interview coach that:

- Asks real technical interview questions across 9 topics (Python, DSA, SQL, ML, System Design, Behavioral, APIs, OOP, JavaScript)
- Gives **structured feedback** after every answer: what you got right ✅, what to improve 🔧, ideal answer 💡, and a score ⭐
- Provides **hints** when you're stuck — without giving away the answer
- Lets you **skip** questions and move on
- Tracks conversation context to ask progressively relevant follow-ups
- Runs entirely in the browser — no login required

**Powered by Goose (Block) + OpenRouter**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python + Flask |
| AI Agent | Goose (Block) via OpenRouter API |
| LLM | `openai/gpt-4o-mini` (configurable) |
| Frontend | Vanilla HTML/CSS/JS (no framework needed) |
| Hosting | Localhost / Render / Railway |

---

## 🚀 Quickstart (1 command)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/techready-interview
cd techready-interview

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set your API key
cp .env.example .env
# Edit .env and paste your OpenRouter API key

# 4. Run!
python app.py
```

Then open **http://localhost:5000** in your browser. That's it!

---

## ⚙️ Configuration

Edit `.env`:
```
OPENROUTER_API_KEY=your_key_here
```

To change the LLM model, edit `app.py`:
```python
MODEL = "openai/gpt-4o-mini"      # Fast, cheap
# MODEL = "anthropic/claude-3-haiku"  # Alternative
# MODEL = "google/gemini-flash-1.5"   # Another option
```

---

## 🏗️ Architecture

```
Browser (HTML/CSS/JS)
       │
       │  HTTP POST /api/start
       │  HTTP POST /api/respond
       │  HTTP POST /api/hint
       │  HTTP POST /api/skip
       ▼
Flask Backend (app.py)
       │
       │  Maintains conversation history per session
       │  Injects system prompt (TechReady persona)
       ▼
OpenRouter API
       │
       ▼
LLM (gpt-4o-mini / claude / gemini)
```

No database. No auth. Stateless per session — conversation history lives in the browser and is sent with each request.

---

## 🧠 Decision Log

| Decision | Why | Tradeoff |
|---|---|---|
| Flask over FastAPI | Simpler setup for hackathon timeline | Less async performance |
| OpenRouter over direct Anthropic/OpenAI | One key, model flexibility, cost control | Extra API hop |
| Stateless (history in browser) | No database needed, faster to build | History lost on page refresh |
| Vanilla JS over React | No build step, faster iteration | Less reactive UI |
| gpt-4o-mini as default | Fast + cheap for real-time chat | Slightly less depth than gpt-4o |

---

## ⚠️ Known Issues & Next Steps

**Known Issues:**
- Session history resets on page refresh (no persistence yet)
- No rate limiting on the backend (can burn API credits fast)
- Mobile keyboard may cover input on some phones

**Next Steps:**
- [ ] Add session saving (localStorage or simple DB)
- [ ] Score tracking across multiple questions
- [ ] Voice input support for more realistic practice
- [ ] Spaced repetition — resurface questions you got wrong
- [ ] Company-specific question packs (FAANG, startups, etc.)

---

## 🎯 SDG Alignment

**SDG 4 — Quality Education**: Provides free, accessible technical interview preparation to underrepresented engineers who can't afford coaching.

**SDG 5 — Gender Equality**: Specifically designed to build confidence and technical fluency in women entering the tech workforce.

**SDG 10 — Reduced Inequalities**: Levels the playing field between candidates with and without access to mentors or expensive bootcamps.

---

## 📜 License

MIT — free to use, modify, and share.

---

## 🙏 Credits

- [Goose by Block](https://github.com/block/goose) — open-source agentic AI framework
- [OpenRouter](https://openrouter.ai) — unified LLM API
- [Flask](https://flask.palletsprojects.com) — Python web framework
- Fonts: Syne, DM Mono, DM Sans (Google Fonts)
