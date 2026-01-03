"use client";
import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiches = async () => {
    if (!query) return;
    setLoading(true);
    
    try {
      // Call your internal API route
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="text-blue-600" /> Niche Explorer
      </h2>
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchNiches()}
          placeholder="e.g. 'Log book for...'"
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button 
          onClick={fetchNiches} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md"
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {results.length > 0 ? (
          results.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-xl flex justify-between items-center bg-gray-50 hover:bg-white hover:shadow-md transition-all group">
              <span className="font-medium text-slate-700">{item}</span>
              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                target="_blank" 
                className="text-blue-600 text-xs font-bold border border-blue-200 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all"
              >
                VIEW ON AMAZON
              </a>
            </div>
          ))
        ) : (
          !loading && <div className="col-span-2 text-center py-10 border-2 border-dashed border-gray-100 rounded-xl text-slate-400 italic">No niches found yet. Try searching for "Journal for" or "Coloring".</div>
        )}
      </div>
    </div>
  );
}