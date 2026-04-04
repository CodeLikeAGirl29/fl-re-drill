'use client';

import { useState } from 'react';
import { X, Delete, Divide, Minus, Plus, Equal } from 'lucide-react';

export default function Calculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Using Function constructor as a safer alternative to eval for simple math
      const result = new Function(`return ${equation + display}`)();
      setDisplay(String(Number(result).toLocaleString(undefined, { maximumFractionDigits: 4 })));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="fixed bottom-24 right-8 z-[70] w-64 bg-[#1e293b] border border-[#444444] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam Calculator</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition">
          <X size={16} />
        </button>
      </div>

      {/* Display */}
      <div className="p-4 bg-black/20 text-right">
        <div className="text-[10px] text-blue-400 h-4 font-mono">{equation}</div>
        <div className="text-2xl font-bold text-white truncate font-mono">{display}</div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-1 p-2 bg-[#1e293b]">
        <button onClick={clear} className="col-span-2 p-3 text-xs font-bold bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition">AC</button>
        <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className="p-3 bg-white/5 text-white rounded-lg hover:bg-white/10 flex justify-center"><Delete size={16} /></button>
        <button onClick={() => handleOperator('/')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center"><Divide size={16} /></button>

        {[7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10">{n}</button>
        ))}
        <button onClick={() => handleOperator('*')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xl">×</button>

        {[4, 5, 6].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10">{n}</button>
        ))}
        <button onClick={() => handleOperator('-')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center"><Minus size={16} /></button>

        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10">{n}</button>
        ))}
        <button onClick={() => handleOperator('+')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center"><Plus size={16} /></button>

        <button onClick={() => handleNumber('0')} className="col-span-2 p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10">0</button>
        <button onClick={() => handleNumber('.')} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10">.</button>
        <button onClick={calculate} className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex justify-center"><Equal size={16} /></button>
      </div>
    </div>
  );
}