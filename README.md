# 🚀 Assignment

Set up a Node.js server with tRPC with a single API endpoint that accepts two PDFs: a job 
description and a CV. This server uses AI to analyze both files, identifying the candidate's 
strengths and weaknesses, and evaluates how well they align with the job description. Add 
basic UI using React and a framework of your choosing.


# 🚀 Project: Smart Recruitment

Smart Recruitment is a modular, AI-powered resume analysis platform designed to streamline candidate-job matching. Built with a modern monorepo architecture, it leverages **Google Gemini 1.5 Flash** via **Vertex AI**, **tRPC**, and **React** to deliver structured insights comparing resumes against job descriptions.

---

## 🧠 Features

- 🔍 **AI-Powered Matching**: Uses Gemini Flash to analyze resumes vs job descriptions.
- 📄 **PDF Upload Support**: Drag-and-drop interface for uploading resumes and job specs.
- 📊 **Insightful Reports**: Markdown-based output highlighting strengths, gaps, and alignment.
- 🧩 **Modular Architecture**: Built with Turborepo for scalable development.
- 🛡️ **Type-Safe APIs**: End-to-end type safety with tRPC and Zod.
- 🎨 **Modern UI**: Responsive design using Tailwind CSS.

---

## 📁 Project Structure

```bash
smartrecruitment/
├── apps/
│   ├── frontend/          # React + Vite client app
│   └── backend/           # tRPC server with Gemini integration
├── packages/
│   ├── api/               # Shared API contracts and procedures
│   ├── config-typescript/ # Centralized TS config
│   └── jest-presets/      # Shared testing presets
├── .env.example           # Environment variable template
├── turbo.json             # Turborepo pipeline config
└── README.md              # You're here!
```

---

## 🧰 Tech Stack

| Layer       | Tools & Libraries                                      |
|-------------|--------------------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS               |
| Backend     | Node.js, tRPC, Bun                                     |
| AI          | Google Gemini 1.5 Flash via Vertex AI                  |
| Validation  | Zod                                                    |
| Dev Tools   | Turborepo, Biome, Jest                                 |
| Hosting     | (Customizable: Vercel)                   |

---

## ⚙️ Setup Instructions

### 1. Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) ≥ 18.x
- [Bun](https://bun.sh/) ≥ 1.x
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (for Gemini access)

### 2. Install Dependencies

```bash
npm install
bun install
```

### 3. Configure Environment

Create `.env` files in both `apps/frontend` and `apps/backend` using the provided `.env.example` templates. Include:

```env
# apps/backend/.env
AUTHORIZATION_TOKEN = <YOUR_AUTHORIZATION_TOKEN>

# apps/frountend/.env
VITE_API_URL = http://localhost:9091

```


### 4. Start Development and running local

```bash
bun run dev
```
or

```bash
npm run dev
```

### 🧹 Code Quality

```bash
bun run format-and-lint:fix
bun run check-types
```

### 🏗️ Build for Production

```bash
bun run build
```

---

## 🧠 AI Integration Details

Smart Recruitment uses Google Gemini via Vertex AI to:

- Parse and semantically analyze resume content
- Compare against job requirements using embedding similarity
- Generate structured Markdown reports with actionable feedback

> The AI logic is encapsulated in `apps/package/api/src/clients/gemini.ts` for easy extension.

---

## 🧪 Testing

Unit and integration tests are configured using Jest:

```bash
bun run test
```

Test presets are shared via `packages/jest-presets`.

---

## 📦 Deployment

This project is designed to be deployable on platforms like:

- **Vercel** (frontend only)
---

## 🤝 Deployment Link

https://woolf-smart-recruitment-assistent-f.vercel.app/

---

## 📚 Resources

- [Google Gemini API Docs](https://cloud.google.com/vertex-ai/docs/generative-ai)
- [tRPC Documentation](https://trpc.io/docs)
- [Turborepo Guide](https://turbo.build/repo/docs)

---

### issue

If you are facing bellow or similar issues assistent\node_modules\lru-cache\node_modules\yallist\yallist.js'. Please verify that the package.json has a valid "main" entry
C:/Users/xxx/OneDrive/Desktop/woolf/woolf-smart-recruitment-assistent/apps/frontend/src/main.tsx

Cause:
A failed install (especially with OneDrive syncing interfering)

Solution: Reinstalling packages
* rm -rf node_modules
* rm package-lock.json
* rm bun.lock
* npm install