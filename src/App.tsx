/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Disc, LayoutDashboard, PlayCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-4xl w-full space-y-12 text-center relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e8253a] to-[#f5c842] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative w-full h-full rounded-full bg-[#111] border-4 border-[#1a1a1a] flex items-center justify-center animate-[spin_8s_linear_infinite]">
                <Disc className="w-32 h-32 text-[#e8253a] opacity-80" />
                <div className="absolute w-12 h-12 bg-[#e8253a] rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-black tracking-tighter uppercase italic font-['Bebas_Neue']">
            HackBoard <span className="text-[#e8253a]">AI</span>
          </h1>
          <p className="text-[#d4cfc4] text-xl font-['Space_Mono'] tracking-widest uppercase opacity-60">
            Hackathon Live Scoring System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <a 
            href="/participant.html" 
            className="group relative p-10 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e8253a] transition-all duration-500 rounded-xl overflow-hidden text-left"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e8253a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <PlayCircle className="w-14 h-14 mb-6 text-[#e8253a] group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-3xl font-bold mb-3 font-['Bebas_Neue'] tracking-wider">Audience View</h2>
            <p className="text-[#d4cfc4] text-sm font-['DM_Sans'] leading-relaxed">
              Real-time rankings, team cards, live analytics, and voting for participants.
            </p>
          </a>

          <a 
            href="/admin.html" 
            className="group relative p-10 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f5c842] transition-all duration-500 rounded-xl overflow-hidden text-left"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f5c842] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <LayoutDashboard className="w-14 h-14 mb-6 text-[#f5c842] group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-3xl font-bold mb-3 font-['Bebas_Neue'] tracking-wider">Admin Console</h2>
            <p className="text-[#d4cfc4] text-sm font-['DM_Sans'] leading-relaxed">
              Manage scores, set round timers, trigger multipliers, and announce the winner.
            </p>
          </a>
        </div>

        <div className="pt-16 border-t border-[#2a2a2a] flex items-center justify-center gap-4 text-[#d4cfc4] text-xs font-['Space_Mono'] tracking-[0.2em] uppercase opacity-40">
          <span>Est. 2026</span>
          <span className="w-1.5 h-1.5 bg-[#e8253a] rounded-full"></span>
          <span>HackBoard AI</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Bebas+Neue&family=DM+Sans:wght@400;700&display=swap');
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
