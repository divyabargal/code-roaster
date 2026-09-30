import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-500 uppercase text-[11px] tracking-wider">
          Level:
        </span>
        <div className="flex items-center gap-2.5 bg-white border border-[#E6E6E2] px-2 py-1 shadow-[1px_1px_0px_#111111]">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-3.5 h-3.5 rounded-full border border-[#111111] flex items-center justify-center transition-all ${
                    isSelected ? "bg-white" : "bg-[#F5F5F3]"
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#111111]" />
                  )}
                </span>
                <span
                  className={`text-xs ${
                    isSelected ? "font-bold text-[#111111]" : "text-neutral-500"
                  }`}
                >
                  {level.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selector */}
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-neutral-500 uppercase text-[11px] tracking-wider">
          Lang:
        </span>
        <div className="relative inline-block">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white border border-[#111111] px-2.5 py-1 pr-6 font-mono text-xs text-[#111111] cursor-pointer focus:outline-none shadow-[1px_1px_0px_#111111]"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-[10px] text-[#111111]">
            ▾
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-2.5 py-1 text-xs font-mono font-medium cursor-pointer transition-colors ${
          errorDrawerOpen
            ? "bg-[#111111] text-white border border-[#111111]"
            : "bg-white text-[#111111] border border-dashed border-[#111111] hover:bg-[#F5F5F3]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        disabled={isRoasting}
        onClick={onRoast}
        className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
          isRoasting
            ? "bg-neutral-500 text-white cursor-not-allowed animate-pulse border border-neutral-600"
            : "bg-[#111111] text-white hover:bg-neutral-900 border border-[#111111] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-[#2A2A2A] text-[10px] text-neutral-200 px-1 py-0.5 border border-[#444444] font-normal tracking-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
