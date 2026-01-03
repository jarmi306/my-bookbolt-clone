"use client";
import { useState } from 'react';
import { Search, TrendingUp, ExternalLink } from 'lucide-react';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiches = async () => {
    if (!query) return;
    setLoading(true);
    
    try {
      // We use the AllOrigins proxy to bypass CORS restrictions
      const amazonUrl = `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(amazonUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      // AllOrigins wraps the response in a 'contents' string
      const contents = JSON.parse(data.contents);
      
      // Amazon returns [query, [suggestions], ...]
      setResults(contents[1] || []);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Proxy error. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-900 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={24} /> Niche Explorer Pro
        </h2>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-8">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNiches()}
            placeholder="Search e.g. 'Word search for...'"
            className="flex-1 p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={fetchNiches} 
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? '...' : 'SEARCH'}
          </button>
        </div>

        <div className="space-y-2">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-all">
                <span className="text-slate-700 font-medium">{item}</span>
                <a 
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                  target="_blank" 
                  className="text-xs font-bold text-blue-600 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  AMAZON ↗
                </a>
              </div>
            ))
          ) : (
            !loading && <p className="text-center py-10 text-slate-400 italic">No niches found. Type a keyword above.</p>
          )}
        </div>
      </div>
    </div>
  );
}