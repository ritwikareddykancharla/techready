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

**Powered by React, Next.js App Router + OpenRouter**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Frontend | React, TypeScript, Vanilla CSS Glassmorphism |
| Backend | Next.js Serverless API Routes |
| AI Integration | OpenRouter API |
| LLM | `openai/gpt-4o-mini` (configurable) |
| Hosting | Vercel |

---

## 🚀 Quickstart

```bash
# 1. Clone the repo
git clone https://github.com/ritwikareddykancharla/techready.git
cd techready

# 2. Install dependencies
npm install
# or bun install / yarn install

# 3. Set your API key
cp .env.example .env
# Edit .env and paste your OpenRouter API key

# 4. Run the development server
npm run dev
```

Then open **http://localhost:3000** in your browser. That's it!

---

## ⚙️ Configuration

Edit `.env`:
```
OPENROUTER_API_KEY=your_key_here
```

To change the LLM model, edit `src/app/api/utils.ts`:
```typescript
export const MODEL = "openai/gpt-4o-mini";      // Fast, cheap
// export const MODEL = "anthropic/claude-3-haiku";  // Alternative
```

---

## 🏗️ Architecture

```text
Browser (React / Next.js Frontend)
       │
       │  fetch('/api/start')
       │  fetch('/api/respond')
       │  fetch('/api/hint')
       │  fetch('/api/skip')
       ▼
Next.js API Routes (src/app/api/.../route.ts)
       │
       │  Maintains conversation history via client-side state
       │  Injects system prompt (TechReady persona) from utils.ts
       ▼
OpenRouter API
       │
       ▼
LLM (gpt-4o-mini / claude / etc.)
```

No database. No auth. Stateless backend — conversation history lives in the React component state and is sent with each request.

---

## 🧠 Decision Log

| Decision | Why | Tradeoff |
|---|---|---|
| Next.js over Flask | Full-stack framework allows seamless Vercel deployment, unifying frontend and backend. | Required migrating the original Python backend to TypeScript under tight hackathon constraints. |
| Serverless API Routes | Reduces the need for an always-on backend server; scales infinitely. | History must be stored client-side rather than in server memory. |
| Vanilla CSS over Tailwind | Project has a highly stylized glassmorphism design that was easier to maintain in standard CSS. | Slightly harder to manage standard whitespace utilities. |
| OpenRouter over direct OpenAI | One key, model flexibility, and cost control. | Extra API hop. |
| React Component State | Fast and robust for a single-page chat experience without a database. | History is lost on a hard page refresh. |

---

## ⚠️ Known Issues & Next Steps

**Known Issues:**
- Session history resets on page refresh (no persistence yet)
- No rate limiting on the backend (can burn API credits fast)
- Mobile keyboard may cover input on some phones

**Next Steps:**
- [ ] Add session saving (localStorage or simple DB like Supabase)
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

- [Next.js](https://nextjs.org/) — React web framework
- [OpenRouter](https://openrouter.ai) — unified LLM API
- Fonts: Syne, DM Mono, DM Sans (Google Fonts)
