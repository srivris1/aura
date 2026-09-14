'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { Send, Mic, Square, Code, Sparkles, LogOut, GitBranch, Globe, Download, PenTool } from 'lucide-react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [dbMessages, setDbMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
        if (data) {
          setDbMessages(data.map(m => ({ id: m.id, role: m.role, content: m.content })));
        }
      }
      setIsLoadingHistory(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setDbMessages([]);
    });
    return () => subscription.unsubscribe();
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({
    api: '/api/chat',
    initialMessages: dbMessages as any,
    onFinish: async (message: any) => {
      if (user && user.id !== 'guest') {
        try { await supabase.from('messages').insert({ role: 'assistant', content: message.content }); } catch (e) {}
      }
    }
  } as any) as any;

  const [isRecording, setIsRecording] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (dbMessages.length > 0 && messages.length === 0) {
      setMessages(dbMessages as any);
    }
  }, [dbMessages, messages.length, setMessages]);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
      if (error) throw error;
    } catch (e) {
      setUser({ id: 'guest', user_metadata: { avatar_url: '' } } as any);
      setDbMessages([]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const mySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (user && user.id !== 'guest') {
      try { await supabase.from('messages').insert({ role: 'user', content: input }); } catch (e) {}
    }
    handleSubmit(e);
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        
        const codeMatch = lastMessage.content.match(/```(?:tsx|jsx|html)\n([\s\S]*?)```/);
        if (codeMatch && codeMatch[1]) {
          setActiveCode(codeMatch[1].trim());
        }
      }
    }
  }, [messages]);

  const handleVoice = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleInputChange({ target: { value: input + ' ' + transcript } } as any);
        setIsRecording(false);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      
      recognition.start();
    } else {
      alert("Voice recognition is not supported in this browser.");
    }
  };

  const downloadCode = () => {
    if (!activeCode) return;
    const blob = new Blob([activeCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Component.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoadingHistory) {
    return <div className="h-screen flex items-center justify-center bg-[#09090b]"><div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#18181b] border border-white/10 rounded-2xl p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome to Aura</h1>
          <p className="text-zinc-400">Your AI programming assistant with Live Sandboxing.</p>
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
          >
            <GitBranch className="w-5 h-5" />
            Continue with GitHub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden font-sans">
      
      <div className={`flex flex-col h-full transition-all duration-500 ease-in-out \${activeCode ? 'w-1/2 border-r border-white/10' : 'w-full max-w-4xl mx-auto'}`}>
        
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#09090b]/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h1 className="font-semibold text-lg tracking-tight">Aura AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/draw" className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors font-medium border border-blue-500/20">
              <PenTool className="w-4 h-4" />
              Whiteboard
            </Link>
            <button onClick={handleLogout} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Globe className="w-12 h-12 text-blue-400/50" />
              <h2 className="text-xl font-medium">What shall we build today?</h2>
              <p className="max-w-md text-sm">Ask Aura to create a React component, and watch it render live in the sandbox.</p>
            </div>
          ) : (
            messages.map((m: any) => (
              <motion.div 
                key={m.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 \${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center overflow-hidden \${m.role === 'user' ? 'bg-blue-600' : 'bg-[#27272a]'}`}>
                  {m.role === 'user' ? user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" alt="User" /> : <div className="text-xs">U</div> : <Sparkles className="w-4 h-4 text-blue-400" />}
                </div>
                <div className={`max-w-[85%] \${m.role === 'user' ? 'bg-blue-600/20 text-blue-50' : 'bg-transparent text-zinc-300'} px-5 py-3 rounded-2xl prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#18181b] prose-pre:border prose-pre:border-white/10`}>
                  
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="px-5 py-3 rounded-2xl bg-transparent text-zinc-500 animate-pulse">Aura is thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        
        <div className="p-4 bg-gradient-to-t from-[#09090b] to-transparent">
          <form onSubmit={mySubmit} className="relative max-w-3xl mx-auto flex items-end gap-2 bg-[#18181b] p-2 rounded-2xl border border-white/10 shadow-2xl focus-within:border-white/20 transition-all">
            <button 
              type="button" 
              onClick={handleVoice}
              className={`p-3 rounded-xl transition-colors \${isRecording ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-white/5 text-zinc-400'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <textarea
              className="w-full bg-transparent p-3 text-zinc-100 placeholder:text-zinc-500 resize-none outline-none max-h-32 min-h-[44px]"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Aura to build something incredible..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  mySubmit(e);
                }
              }}
            />
            {isLoading ? (
              <button type="button" onClick={stop} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                <Square className="w-5 h-5 fill-current" />
              </button>
            ) : (
              <button type="submit" disabled={!input.trim()} className="p-3 bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white text-black rounded-xl transition-colors">
                <Send className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </div>

      
      <AnimatePresence>
        {activeCode && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '50%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-[#1e1e1e] flex flex-col"
          >
            <div className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-6 bg-[#18181b]">
              <div className="flex items-center gap-2 text-zinc-400">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-300">Live Preview</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={downloadCode} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-300 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button onClick={() => setActiveCode(null)} className="text-xs text-zinc-500 hover:text-white transition-colors">Close</button>
              </div>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <Sandpack
                template="react-ts"
                theme="dark"
                files={{
                  "/App.tsx": activeCode,
                }}
                options={{
                  showNavigator: false,
                  showTabs: true,
                  editorHeight: "100%",
                }}
                customSetup={{
                  dependencies: {
                    "lucide-react": "latest",
                    "framer-motion": "latest",
                    "clsx": "latest",
                    "tailwind-merge": "latest"
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
