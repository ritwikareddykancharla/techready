# **#75HER Challenge: Risk Log**

**Project Name:** TechReady
**Team Name:** TechReady Team

---

## **🛡️ Risk Log Table**

| Area | Issue Description | Severity | Fix Applied | Evidence/Link | Status |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Privacy / Security** | [OpenRouter API key was embedded in plain text inside `app.py`] | 🔴 Critical | [Removed the hardcoded key, moved it to a secure `.env` file, and added `.env` to `.gitignore`. Created `.env.example`] | [See `.gitignore`, `.env.example`, and `src/app/api/utils.ts`] | ✅ Fixed |
| **Operational / Build** | [Next.js `npm run build` failed due to conflicting TypeScript errors in the legacy `chatbot` folder module resolution.] | 🔴 Critical | [Updated `tsconfig.json` to explicitly exclude both `chatbot/` and `legacy/` paths from the Next.js compiler process to isolate the web app.] | [See `tsconfig.json` lines 33] | ✅ Fixed |
| **Legal/IP** | [Reused Python backend without proper separation of concerns during the Next.js migration.] | 🟠 Major | [Created a `/legacy` folder and moved the old Flask `app.py`, old `requirements.txt`, and vanilla `index.html` there to preserve history without causing build or logic conflicts.] | [See `/legacy` directory structure] | ✅ Fixed |
| **Accessibility** | [Color contrast between some glassmorphism blobs and the dark text might be challenging on certain laptop displays.] | 🟡 Minor | [Enhanced the background text styling to use lighter, muted variants on a dark surface to ensure WCAG readability.] | [See `src/app/globals.css`] | ✅ Fixed |

---

## **✅ Self-Red-Team Checklist**

### **Privacy & Security**

* [x] No API keys, passwords, or tokens in code.  
* [x] .env.example file included with dummy values.  
* [x] No real user data (emails/names) in screenshots or demos.

### **Accuracy & Sources**

* [x] All statistics have source citations in the Evidence Log.  
* [x] Data visualizations show real or clearly labeled synthetic data.

### **Legal & IP**

* [x] LICENSE file present and all dependencies listed.  
* [x] No unauthorized logos or trademarks used.

### **Accessibility**

* [x] All images have meaningful alt text.  
* [x] Color contrast meets WCAG AA standards.  
* [x] Keyboard navigation works for interactive elements.

### **Operational**

* [x] Project runs from a fresh clone.  
* [x] All links in the README and documentation work.

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
