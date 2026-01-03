"use client";
import { useState } from 'react';
import { Search, TrendingUp, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNiches = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (res.ok && Array.isArray(data)) {
        setResults(data);
      } else {
        // Show the specific error from the backend
        setError(data.error || "Unknown Error");
      }
    } catch (err) {
      setError("Network error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={24} /> Niche Explorer Pro
          </h2>
          <p className="text-slate-400 text-xs mt-1">High-Precision KDP Research</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNiches()}
            placeholder="Search e.g. 'Activity book for...'"
            className="flex-1 p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 shadow-sm transition-all"
          />
          <button 
            onClick={fetchNiches} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-blue-100 flex items-center justify-center min-w-[80px]"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-200 hover:bg-white transition-all group">
                <span className="text-slate-700 font-medium">{item}</span>
                <a 
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-white border border-slate-200 px-4 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                >
                  AMAZON <ExternalLink size={12} />
                </a>
              </div>
            ))
          ) : (
            !loading && !error && (
              <div className="text-center py-12">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-400" />
                </div>
                <p className="text-slate-400 italic">Enter a keyword to unlock trending Amazon suggestions</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}