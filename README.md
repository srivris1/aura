# Aura AI - Next-Gen Programming Assistant 🚀

Welcome to Aura! This is my submission for **Challenge 01** of the Codenex recruitment drive. I wanted to build something that wasn't just a standard ChatGPT clone, but a tool that actually feels like a pair-programming environment.

## 🌟 The Highlighting Feature (Out of the Box)
The absolute biggest "out of the box" feature I built is the **Live React Sandbox**. 

Standard AI chats just give you markdown code blocks that you have to copy and paste. I integrated `Sandpack` (the runtime behind CodeSandbox) directly into the UI. Whenever you ask Aura to write a React component, my custom parser extracts the code from the streaming response in real-time. Once extracted, a beautiful split-screen UI slides in using Framer Motion, instantly spinning up an in-browser Node/React environment to render the code live! You can even tweak the code in the sandbox or instantly download it as a `.tsx` file.

## Features
* **Live Sandpack Rendering:** Instantly previews AI-generated React components.
* **Supabase PostgreSQL:** Your chat history is fully saved to a remote database and restored when you return.
* **GitHub OAuth:** Secure one-click login.
* **Voice Input:** Talk directly to the AI using the Web Speech API.
* **Framer Motion:** Smooth micro-animations, layout transitions, and glassmorphism UI.

## Tech Stack
* **Framework:** Next.js (App Router)
* **AI:** Vercel AI SDK (with Gemini 1.5 Pro)
* **Database/Auth:** Supabase
* **Styling:** Tailwind CSS v4
* **Live Editor:** @codesandbox/sandpack-react

## Project Structure
Here is a brief overview of how I structured the application:
* `/src/app/page.tsx` - The main UI shell. This contains the chat interface, the Framer Motion animations, and the Sandpack component wrapper.
* `/src/app/api/chat/route.ts` - The server-side API route. This handles securely communicating with the Gemini API and streaming the data back to the client.
* `/src/lib/supabase.ts` - Contains the Supabase client configuration for database queries.
* `/src/app/globals.css` - Custom Tailwind v4 styling and typography variables.

I built this with a heavy focus on UX and architecture. Hope you enjoy it!
