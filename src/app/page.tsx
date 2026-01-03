"use client";
import { useState } from 'react';
// Note the @/ which points to the src folder we configured above
import ResearchTool from '@/components/ResearchTool';
import InteriorGenerator from '@/components/InteriorGenerator';
import { Search, Layout, BookOpen } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'research' | 'design'>('research');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar / Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">KDP Suite <span className="text-blue-600">Pro</span></span>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'research' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            <Search size={18} /> Research
          </button>
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'design' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            <Layout size={18} /> Interiors
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {activeTab === 'research' ? <ResearchTool /> : <InteriorGenerator />}
      </div>
      
      <footer className="text-center py-10 text-slate-400 text-sm">
        Personal KDP Toolset • Built with Next.js & Termux
      </footer>
    </main>
  );
}// Deployment Fix
