"use client";
import { useState, useEffect } from 'react';
import { Search, TrendingUp, ExternalLink } from 'lucide-react';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiches = () => {
    if (!query) return;
    setLoading(true);

    // Create a unique callback name for JSONP
    const callbackName = 'amazon_cb_' + Math.floor(Math.random() * 1000000);

    // This function will be called by Amazon's script
    (window as any)[callbackName] = (data: any) => {
      // Amazon JSONP returns [query, [suggestions], ...]
      setResults(data[1] || []);
      setLoading(false);
      // Clean up the script and global function
      document.getElementById(callbackName)?.remove();
      delete (window as any)[callbackName];
    };

    const script = document.createElement('script');
    script.id = callbackName;
    // We use the 'completion' endpoint with a callback parameter
    script.src = `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}&callback=${callbackName}`;
    
    script.onerror = () => {
      alert("Browser blocked the request. Try turning off Ad-Blockers.");
      setLoading(false);
    };

    document.body.appendChild(script);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp size={24} /> Niche Explorer Pro
        </h2>
        <p className="opacity-80 text-sm mt-1">Real-time Amazon Search Suggestions</p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-8">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNiches()}
            placeholder="Type a niche (e.g. 'Sudoku for')"
            className="flex-1 p-4 border-2 border-slate-100 rounded-xl outline-none focus:border-blue-500 transition-all text-lg"
          />
          <button 
            onClick={fetchNiches} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? '...' : 'SEARCH'}
          </button>
        </div>

        <div className="space-y-3">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 transition-all group">
                <span className="text-slate-700 font-semibold">{item}</span>
                <a 
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                  target="_blank" 
                  className="flex items-center gap-2 text-xs font-black text-blue-600 px-4 py-2 bg-white rounded-lg border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                >
                  CHECK NICHE <ExternalLink size={14} />
                </a>
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-400 font-medium italic">Enter a keyword to start your research</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}