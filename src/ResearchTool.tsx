"use client";
import { useState } from 'react';
import { Search, ExternalLink, TrendingUp } from 'lucide-react';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiches = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // Using Amazon's internal suggestion API (Proxying through a CORS bypass if needed)
      // For local development, this usually works directly
      const res = await fetch(`https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data[1] || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-transparent">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" /> KDP Niche Explorer
        </h2>
        <p className="text-slate-500 text-sm mt-1">Discover what people are actually typing into Amazon.</p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchNiches()}
              placeholder="e.g. 'Activity book for...'"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button 
            onClick={fetchNiches} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Analyze'}
          </button>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((item, idx) => (
              <div key={idx} className="group p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all flex justify-between items-center">
                <span className="font-medium text-slate-700">{item}</span>
                <div className="flex gap-3">
                  <a 
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    AMAZON <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>Enter a base keyword to see high-traffic KDP niches</p>
          </div>
        )}
      </div>
    </div>
  );
}