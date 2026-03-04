# **#75HER Challenge: Decision Log**

**Project Name:** TechReady

**Team Name:** Ritwika Kancharla

---

## **🛠 Decision Log**

| Category | Decision → Why | Tradeoff |
| :---- | :---- | :---- |
| **Tech Stack** | **[Switching from Flask to Next.js]** → [Allows for seamless Vercel deployment and unifies the frontend and backend into a single repository architecture.] | [Required rewriting the existing Python backend into TypeScript API routes under tight hackathon time constraints.] |
| **Tech Stack** | **[Vanilla CSS over Tailwind]** → [We already had a highly stylized glassmorphism design with animated background grids/blobs that would be tedious and unnecessary to convert to Tailwind utility classes.] | [Slightly harder to manage standard spacing, but perfect for a highly custom premium aesthetic.] |
| **Architecture** | **[Serverless API Routes in Next.js]** → [Reduces the need to spin up and pay for an always-on backend server like Heroku/Render; scales infinitely during demo day.] | [Stateless environment means we had to store conversation history on the client-side React state instead of server memory.] |
| **AI Integration** | **[Using OpenRouter API]** → [Gives us access to multiple LLMs without juggling multiple API keys. Used `gpt-4o-mini` for high speed and cost efficiency.] | [Adds an extra hop to the API call, minutely increasing latency.] |
| **Feature Scope** | **[Pre-defined Prompt Injection]** → [System roles are hardcoded on the backend (`utils.ts`) to ensure the AI always acts as an encouraging mock interviewer and doesn't break character.] | [Reduces user customization, but guarantees high-quality, targeted hackathon scope.] |

---

## **✅ Submission Checklist**

* [x] At least 5 decisions documented.  
* [x] Every decision has a clear, specific tradeoff.  
* [x] Decisions reflect choices made **DURING** the hackathon.  
* [x] Organized by category (Tech Stack, Architecture, etc.).  
* [x] File saved as DECISION_LOG.md in the /docs/ folder.

---

*Part of the #75HER Challenge | CreateHER Fest 2026*