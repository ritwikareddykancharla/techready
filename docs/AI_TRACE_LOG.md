# **#75HER Challenge: AI Trace Log**

**Project Name:** TechReady

**Team Name:** Ritwika Kancharla

---

## **💡 Purpose & Principles**

**Purpose:** Document how you utilized AI tools (goose, Claude, ChatGPT, etc.) to prove you **"augmented, not abdicated"** your responsibilities. This log demonstrates that while AI helped speed up your process, **you** owned the critical thinking, final choices, and implementation.

---

## **🤖 AI Trace Entries**

### **Trace #1: Code Generation & Migration**

* **Tool:** Antigravity (Claude Sonnet 3.5)
* **Prompt:** Migrate existing Flask + HTML backend to a modern Next.js 14+ application using React components.
* **AI Response:** Provided a step-by-step implementation plan and generated the API routes (`app/api/start`, `respond`, etc.) along with rewriting vanilla HTML/JS into `SetupPanel` and `InterviewPanel` React components.
* **✅ What You Kept:** The core logical mapping and the CSS styling which was kept exactly as the original to preserve the premium aesthetic.
* **✏️ What I Changed:** Verified the OpenRouter API payload structure, ensured Environment Variables were correctly loaded using `process.env`, and decoupled `callOpenRouter` into a reusable `utils.ts` file.
* **🔍 Verification:** Ran `npm run build` and tested the chat interface locally ensuring responses streamed correctly without a Flask backend.

---

### **Trace #2: Architecture Planning**

* **Tool:** Antigravity (Claude Sonnet 3.5)
* **Prompt:** Should I make this a Next.js app or keep it as Flask?
* **AI Response:** Highlighted tradeoffs. Flask is simple but Next.js offers effortless Vercel deployment, modern UI integrations, and a consolidated frontend/backend.
* **✅ What You Kept:** The decision to migrate to Next.js to leverage Vercel's edge network and improve the user interface for hackathon presentation.
* **✏️ What I Changed:** Decided to avoid Tailwind CSS and keep the custom vanilla CSS glassmorphism implementation intact for a unique look.
* **🔍 Verification:** Checked Next.js build performance and confirmed the CSS animations (blobs, grid) still rendered flawlessly in the React lifecycle.

---

### **Trace #3: Debugging**

* **Tool:** Antigravity (Claude Sonnet 3.5)
* **Prompt:** Next.js build failing with TypeScript errors related to `Cannot find module '@/lib/db/queries'` in the legacy chatbot folder.
* **AI Response:** Suggested modifying `tsconfig.json` to exclude the legacy python/chatbot folders.
* **✅ What You Kept:** The exact `tsconfig.json` exclusion array modifications.
* **✏️ What I Changed:** Added explicit exclusions for both `chatbot` and `legacy` folders to ensure complete isolation.
* **🔍 Verification:** Ran `npm run build` again and verified the project compiled successfully with 0 type errors.

---

## **✅ Submission Checklist**

* [x] At least 3–6 entries documented.  
* [x] Every entry shows a clear verification method (e.g., unit tests, cross-referencing).  
* [x] Clear distinction between AI output and your manual changes.  
* [x] Log is connected to the **Evidence Log** for any facts or code used.  
* [x] Demonstrates the "augment, not abdicate" principle.

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
