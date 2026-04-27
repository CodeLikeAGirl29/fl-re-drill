'use client';

import { useState } from 'react';
import { FiX } from "react-icons/fi";
import { BsXLg, BsSlashLg } from 'react-icons/bs';
import { IoBackspaceOutline } from "react-icons/io5";
import { FaPlus, FaMinus, FaEquals } from "react-icons/fa6";

export default function Calculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false); // New: prevents appending to results

  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    if (shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(prev => (prev === '0' ? num : prev + num));
    }
  };

  const handleOperator = (op: string) => {
    // Strip commas from display before moving to equation
    const cleanDisplay = display.replace(/,/g, '');
    setEquation(cleanDisplay + ' ' + op + ' ');
    setDisplay('0');
    setShouldReset(false);
  };

  const calculate = () => {
    try {
      // 1. Remove commas and map '×' to '*' for evaluation
      const currentVal = display.replace(/,/g, '');
      const rawEquation = (equation + currentVal).replace(/×/g, '*');

      // 2. Evaluate
      const result = new Function(`return ${rawEquation}`)();

      // 3. Format for display (maximum 4 decimal places for RE math)
      const formatted = Number(result).toLocaleString(undefined, {
        maximumFractionDigits: 4
      });

      setDisplay(String(formatted));
      setEquation('');
      setShouldReset(true); // Next number press starts a new calculation
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setShouldReset(false);
  };

  const handleBackspace = () => {
    if (shouldReset) {
      clear();
    } else {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[70] w-64 bg-[#1e293b] border border-[#444444] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
        <span className="text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest">Exam Calculator</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition">
          <FiX size={16} />
        </button>
      </div>

      <div className="p-4 bg-black/20 text-right">
        <div className="text-[0.625rem] text-blue-400 h-4 font-mono tracking-tight">{equation}</div>
        <div className="text-2xl font-bold text-white truncate font-mono tracking-tighter">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 p-2 bg-[#1e293b]">
        <button onClick={clear} className="col-span-2 p-3 text-xs font-bold bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition">AC</button>
        <button onClick={handleBackspace} className="p-3 bg-white/5 text-white rounded-lg hover:bg-white/10 flex justify-center items-center"><IoBackspaceOutline size={18} /></button>
        <button onClick={() => handleOperator('/')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"><BsSlashLg size={16} /></button>

        {[7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 text-lg">{n}</button>
        ))}
        <button onClick={() => handleOperator('×')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"><BsXLg size={14} /></button>

        {[4, 5, 6].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 text-lg">{n}</button>
        ))}
        <button onClick={() => handleOperator('-')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"><FaMinus size={18} /></button>

        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 text-lg">{n}</button>
        ))}
        <button onClick={() => handleOperator('+')} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"><FaPlus size={16} /></button>

        <button onClick={() => handleNumber('0')} className="col-span-2 p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 text-lg">0</button>
        <button onClick={() => handleNumber('.')} className="p-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 text-lg">.</button>
        <button onClick={calculate} className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex justify-center items-center"><FaEquals size={14} /></button>
      </div>
    </div>
  );
}