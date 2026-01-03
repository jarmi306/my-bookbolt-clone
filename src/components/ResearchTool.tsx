"use client";
import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
// Import the action we just created
import { getAmazonSuggestions } from '@/app/actions';

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiches = async () => {
    if (!query) return;
    setLoading(true);
    
    // Call the server-side function instead of a direct fetch
    const suggestions = await getAmazonSuggestions(query);
    setResults(suggestions);
    
    setLoading(false);
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
          placeholder="e.g. 'Coloring book for...'"
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchNiches} 
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Analyze'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {results.length > 0 ? (
          results.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-xl flex justify-between items-center bg-gray-50 hover:bg-blue-50 transition-colors">
              <span className="font-medium text-slate-700">{item}</span>
              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(item)}&i=stripbooks`} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 text-sm font-bold bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-all"
              >
                AMAZON ↗
              </a>
            </div>
          ))
        ) : (
          !loading && <p className="text-slate-400 text-center col-span-2 py-10">No results found. Try a different keyword.</p>
        )}
      </div>
    </div>
  );
}