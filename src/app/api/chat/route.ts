import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

const fallbackComponents = [
  {
    keywords: ['crypto', 'analytics', 'chart', 'dashboard', 'finance'],
    name: 'Crypto Analytics Card',
    code: `import React, { useState } from 'react';

export default function CryptoCard() {
  const [activeTab, setActiveTab] = useState('1D');
  
  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl text-white font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Portfolio Balance</span>
          <h2 className="text-3xl font-bold mt-1 text-white">$48,290.50</h2>
        </div>
        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
          +12.4%
        </span>
      </div>

      <div className="h-32 flex items-end gap-2 my-6 pt-4 border-b border-zinc-800/80 pb-4">
        {[35, 45, 30, 65, 80, 55, 95, 85, 110, 90, 120].map((val, idx) => (
          <div key={idx} className="flex-1 bg-zinc-800 hover:bg-blue-500 transition-colors rounded-t group relative" style={{ height: \`\${(val / 120) * 100}%\` }}>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-[10px] text-zinc-300 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700">
              \${val}k
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1.5 bg-zinc-800/60 p-1 rounded-lg">
          {['1D', '1W', '1M', '1Y'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={\`px-2.5 py-1 rounded-md text-xs font-medium transition-all \${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'}\`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors">
          Trade Now
        </button>
      </div>
    </div>
  );
}`
  },
  {
    keywords: ['music', 'player', 'audio', 'song'],
    name: 'Animated Music Player',
    code: `import React, { useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(42);

  return (
    <div className="max-w-sm mx-auto p-6 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-3xl border border-zinc-700/50 shadow-2xl text-white font-sans">
      <div className="w-full aspect-square bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden mb-6">
        <div className={\`w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-md \${isPlaying ? 'animate-spin' : ''}\`} style={{ animationDuration: '8s' }}>
          <div className="w-8 h-8 rounded-full bg-white/40" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="font-bold text-lg text-white">Cybernetic Dreamscape</h3>
        <p className="text-zinc-400 text-sm mt-1">Aura Synthwave Labs</p>
      </div>

      <div className="space-y-2 mb-6">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-purple-500 bg-zinc-700 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-zinc-400">
          <span>1:42</span>
          <span>3:58</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button className="text-zinc-400 hover:text-white transition-colors text-lg">⏮</button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white text-xl shadow-lg transition-transform active:scale-95"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="text-zinc-400 hover:text-white transition-colors text-lg">⏭</button>
      </div>
    </div>
  );
}`
  },
  {
    keywords: ['pricing', 'plan', 'table', 'tier', 'subscription'],
    name: 'Glassmorphic Pricing Card',
    code: `import React, { useState } from 'react';

export default function PricingCard() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="max-w-md mx-auto p-8 bg-zinc-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl text-white shadow-2xl font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Pro Plan</span>
          <h3 className="text-2xl font-bold mt-1 text-white">Full Superpowers</h3>
        </div>
        <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/20">
          Popular
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-5xl font-extrabold text-white">\${annual ? '24' : '29'}</span>
        <span className="text-zinc-400 text-sm">/ month</span>
      </div>

      <div className="space-y-3 mb-8 text-sm text-zinc-300">
        {['Unlimited React Sandboxes', 'Real-time AI Streaming', 'Voice Dictation Assistant', 'Custom Supabase Integration', 'Export to Production Next.js'].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-blue-400 font-bold">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 transition-all">
        Start 14-Day Free Trial
      </button>
    </div>
  );
}`
  }
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastUserMsg = messages?.filter((m: any) => m.role === 'user').slice(-1)[0]?.content || '';

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
    try {
      const result = streamText({
        model: google('gemini-1.5-pro'),
        messages,
        system: `You are Aura, an advanced AI programming assistant. 
When asked to build a UI component, return the code enclosed in a block like this:
\`\`\`tsx
export default function Component() {
  return <div>Hello World</div>;
}
\`\`\`
Focus on returning functional, beautiful Tailwind CSS components. Keep explanations concise.`,
      });
      return result.toTextStreamResponse();
    } catch (e) {
      console.error(e);
    }
  }

  const query = lastUserMsg.toLowerCase();
  let match = fallbackComponents.find(item => item.keywords.some(k => query.includes(k))) || fallbackComponents[0];

  const streamPayload = `I've created the **${match.name}** for you! Here is the full interactive React component ready to run in your live sandbox:

\`\`\`tsx
${match.code}
\`\`\`

You can interact with it in the live preview panel on the right or download the code.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < streamPayload.length; i += 12) {
        controller.enqueue(encoder.encode(streamPayload.slice(i, i + 12)));
        await new Promise(r => setTimeout(r, 12));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
