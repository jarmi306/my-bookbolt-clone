"use client";
import { useState } from 'react';

export default function InteriorGenerator() {
  const [type, setType] = useState('lined');
  const [pages, setPages] = useState(120);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interior Generator</h2>
        <button onClick={handlePrint} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
          Download PDF (Print)
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">Interior Type</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="lined">College Ruled</option>
            <option value="dot">Dot Grid</option>
            <option value="blank">Blank Sketchbook</option>
          </select>
        </div>
        <div className="w-32">
          <label className="block text-sm font-bold mb-2">Pages</label>
          <input type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Preview Area */}
      <div className="bg-gray-200 p-8 rounded-lg flex justify-center overflow-auto max-h-[500px]">
        <div id="printable-area" className="bg-white w-[400px] h-[520px] shadow-2xl p-8 relative">
          {type === 'lined' && (
             <div className="h-full w-full border-l border-red-200 flex flex-col justify-between">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} className="border-b border-blue-100 h-full w-full"></div>
                ))}
             </div>
          )}
          {type === 'dot' && (
            <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          )}
          {type === 'blank' && <div className="h-full w-full border border-gray-100"></div>}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 italic text-center">
        Tip: Set browser print settings to "Save as PDF" and "No Margins".
      </p>
    </div>
  );
}