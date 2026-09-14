'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Eraser, Pen, Trash2, Download } from 'lucide-react';
import Link from 'next/link';

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    const handleResize = () => {
      // Save current drawing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = tool === 'eraser' ? '#09090b' : color;
    ctx.lineWidth = brushSize;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'aura-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-screen w-screen bg-[#09090b] overflow-hidden relative">
      {/* Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#18181b]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl z-10">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="h-8 w-px bg-white/10 mx-2" />
        
        <button 
          onClick={() => setTool('pen')}
          className={\`p-3 rounded-xl transition-colors \${tool === 'pen' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10 text-zinc-400'}\`}
        >
          <Pen className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => setTool('eraser')}
          className={\`p-3 rounded-xl transition-colors \${tool === 'eraser' ? 'bg-zinc-700 text-white' : 'hover:bg-white/10 text-zinc-400'}\`}
        >
          <Eraser className="w-5 h-5" />
        </button>

        <input 
          type="color" 
          value={color}
          onChange={(e) => { setColor(e.target.value); setTool('pen'); }}
          className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-1"
        />

        <input 
          type="range" 
          min="1" 
          max="50" 
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-24 mx-2 accent-blue-500"
        />

        <div className="h-8 w-px bg-white/10 mx-2" />
        
        <button onClick={clearCanvas} className="p-3 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-zinc-400 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
        
        <button onClick={downloadCanvas} className="p-3 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="block touch-none cursor-crosshair"
      />
    </div>
  );
}
