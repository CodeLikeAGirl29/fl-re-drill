'use client';

export default function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full max-h-[80vh] overflow-hidden flex flex-col border border-white/20">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">Math Formulas</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <section>
            <h4 className="font-bold text-blue-600 text-[10px] uppercase tracking-widest mb-2">Transfer Taxes</h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs leading-relaxed text-slate-600">
              <p><strong>Deed Stamps:</strong> (Price / 100) * $0.70</p>
              <p className="mt-2 text-[10px] italic text-slate-400">Note: Always round UP to the nearest 100 first.</p>
              <p className="mt-4"><strong>Note Stamps:</strong> (Debt / 100) * $0.35</p>
              <p className="mt-4"><strong>Intangible Tax:</strong> New Mortgage * $0.002</p>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-purple-600 text-[10px] uppercase tracking-widest mb-2">Measurements</h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
              <p><strong>1 Acre:</strong> 43,560 Sq Ft</p>
              <p className="mt-2"><strong>1 Section:</strong> 640 Acres</p>
            </div>
          </section>
        </div>
      </div>
      {/* Click outside to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
}