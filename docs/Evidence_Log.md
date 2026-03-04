# **#75HER Challenge: Evidence Log**

**Project Name:** TechReady
**Team Name:** Ritwika Kancharla

---

## **📊 Evidence Log Table**

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
| :---- | :---- | :---- | :---- | :---- | :---- |
| [Google Fonts] | Fonts for 'Syne', 'DM Mono', and 'DM Sans' | [https://fonts.google.com/](https://fonts.google.com/) | Asset | Open Font License (OFL) | Used for overall typography |
| [Next.js] | Full-stack React framework | [https://nextjs.org/](https://nextjs.org/) | Code | MIT License | v14.0+ |
| [OpenRouter] | API routing for LLM access | [https://openrouter.ai/](https://openrouter.ai/) | API | Terms of Service | Used `openai/gpt-4o-mini` |
| [React] | UI components | [https://react.dev/](https://react.dev/) | Code | MIT License | Core UI |
| [Vercel] | Hosting Platform | [https://vercel.com/](https://vercel.com/) | Infra | Terms of Service | Deployed serverless API |

---

## **🤖 AI-Generated Content Log**

| AI Tool Used | Purpose | What AI Generated | What You Changed | Verification Method |
| :---- | :---- | :---- | :---- | :---- |
| [Antigravity/Claude] | [Migration to Next.js] | [Converted Python Flask routes to Next.js API route syntax in `src/app/api`] | [Refactored to separate logic into `utils.ts` and ensure environment variables loaded properly from `.env`] | [Tested start, respond, hint, and skip endpoints locally via UI] |
| [Antigravity/Claude] | [UI Componentization] | [Split single `index.html` into generic `SetupPanel.tsx` and `InterviewPanel.tsx` React components] | [Mapped the client-side state correctly over to the new props system.] | [Tested full user flow manually in staging environment on localhost:3000] |

---

## **✅ Submission Checklist**

* [x] At least 3 credible sources documented.  
* [x] Every image, icon, and asset has license info.  
* [x] All code dependencies (npm/pip) are listed with licenses.  
* [x] AI-generated content includes a "What You Changed" description.  
* [x] All links are active and accessible to judges.  
* [x] No "TBD" or placeholder text remains.

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
