"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const FORMULAS = [
  {
    name: "Commission",
    formula: "Sales Price × Commission Rate",
    example: "$300,000 × 0.06 = $18,000",
  },
  {
    name: "Net to Seller",
    formula: "Sales Price × (100% – Commission Rate)",
    example: "$200,000 × 0.94 = $188,000",
  },
  {
    name: "LTV Ratio",
    formula: "Loan Amount ÷ Appraised Value or Price",
    example: "$160,000 ÷ $200,000 = 80%",
  },
  {
    name: "Property Tax",
    formula: "Assessed Value × Tax Rate",
    example: "$150,000 × 0.02 = $3,000",
  },
];

interface FormulaSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FormulaSheet({
  isOpen,
  onOpenChange,
}: FormulaSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-slate-950/90 backdrop-blur-xl border-l border-white/10 w-[400px] sm:w-[540px] text-white">
        <SheetHeader className="border-b border-white/5 pb-6">
          <SheetTitle className="text-2xl font-black italic uppercase text-cyan-400">
            Formula <span className="text-white">Vault</span>
          </SheetTitle>
          <SheetDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            Florida Exam Math Reference
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
            {FORMULAS.map((f, i) => (
              <div
                key={i}
                className="group p-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-cyan-400 font-black uppercase text-xs mb-1">
                  {f.name}
                </h3>
                <p className="text-lg font-mono tracking-tighter text-white mb-2">
                  {f.formula}
                </p>
                <div className="bg-black/40 p-2 rounded text-[11px] font-bold text-slate-500 italic">
                  Example: {f.example}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
