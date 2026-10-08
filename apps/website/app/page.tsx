import React from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] selection:bg-purple-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-[#090A0F]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden relative shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <img src="/icon.jpg" alt="Photonic Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Photonic</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#download" className="px-4 py-2 bg-white text-black rounded-full hover:bg-slate-200 transition-colors">
              Download App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-cyan-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Desktop Client v1.0 is live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            The premium client for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Google Photos.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience your memories in a beautiful, highly-optimized desktop environment. 
            Native performance, intelligent offline caching, and a stunning dark-mode interface.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Download for Windows
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-md">
              View Documentation
            </button>
          </div>
        </div>

        {/* App Preview Mockup */}
        <div className="max-w-6xl mx-auto mt-24 relative z-10">
          <div className="aspect-[16/10] rounded-2xl border border-white/10 bg-[#101319] shadow-2xl overflow-hidden flex flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#090A0F]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex items-center justify-center text-slate-500">
              <div className="flex flex-col items-center gap-4">
                <img src="/icon.jpg" alt="Icon" className="w-20 h-20 rounded-2xl shadow-xl shadow-cyan-500/20" />
                <span className="font-medium tracking-widest text-sm uppercase">Photonic Desktop UI</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
