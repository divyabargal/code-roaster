import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t border-[#111111] bg-[#FDFDFD] shrink-0 font-mono text-[11px] select-none">
      {/* Main Status Row */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 text-neutral-600 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-neutral-500">STATUS:</span>
          {isRoasting ? (
            <span className="text-[#D97706] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              PROCESSING...
            </span>
          ) : (
            <span className="text-[#16A34A] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-neutral-300 mx-1.5">|</span>
          <span className="hidden sm:inline text-neutral-500">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="uppercase tracking-widest font-semibold text-neutral-400 text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second Line: Workshop Attribution */}
      <div className="border-t border-[#E6E6E2]/70 py-1 text-center text-[10px] text-neutral-400 font-mono">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
