# Aura - AI Programming Assistant 🚀

Hey Codenex team! This is my submission for the **Second Year Challenge 01: Build Your Own AI**.

When I saw the challenge, I knew I didn't just want to build another ChatGPT clone that just spits out markdown. I wanted to build something that feels like magic. So, I built **Aura**.

Aura is a generative AI assistant, but its killer feature is **Live Code Sandboxing**. 

## ✨ The "Highlight" Feature: Live Sandboxing
If you ask Aura to build a React component or some UI, it doesn't just give you a code block. It instantly splits the screen and renders a **live, interactive preview** of that code right in the browser. 
It uses `@codesandbox/sandpack-react` to spin up a secure, client-side Node environment on the fly. This took quite a bit of effort to get right with the streaming AI chunks, but the result is incredible. It basically turns Aura into an instant UI generator (kind of like Claude Artifacts!).

Oh, and there's also a **Voice Input** button because typing is too slow when you're in the zone.

## 🛠️ Tech Stack 
To meet the requirements (OAuth + DB + External API), I chose a very robust, modern stack:

* **Framework:** Next.js (App Router) + Tailwind CSS v4. It gives that buttery smooth feel.
* **Authentication & Database (OAuth + DB):** Supabase. I used GitHub OAuth for a seamless developer login, and Supabase Postgres will eventually persist the chat histories (the session state is working perfectly).
* **External API:** Google Gemini API (`gemini-1.5-pro`). I used Vercel's AI SDK to handle the text streaming. Gemini is ridiculously fast at spitting out React code.
* **UI/UX:** Framer Motion for the micro-animations (check out the staggered fade-ins and the side-panel slide).

## 📂 Project Structure
Just keeping it clean and standard:
* `src/app/api/chat/route.ts` - The API route that talks to Gemini and streams the response back.
* `src/app/page.tsx` - The main brain of the frontend. It handles the chat state, voice recognition, and the Sandpack rendering logic.
* `src/lib/supabase.ts` - Setup for the Supabase client.
* `src/lib/utils.ts` - Standard Tailwind class merging utility.

## 🚀 How to Run It Locally
If you want to spin it up yourself:
1. Clone the repo and `npm install`.
2. Create a `.env.local` file with your keys (check `.env.example`).
3. Run `npm run dev`.

## 💡 What I Learned
The hardest part was definitely parsing the streaming response to detect when a code block starts and ends, and then safely injecting that into an iframe without breaking the React hydration cycle. I had to learn a lot about how Web Streams actually work under the hood. 

I really poured a lot of heart into the UI and the sandbox feature to try and make it stand out. Hope you guys like it as much as I enjoyed building it!

*(P.S. Yes, I deployed it to Vercel for those brownie points!)*
