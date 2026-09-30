import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
      <div className="w-16 h-16 border-2 border-[#D94826] bg-[#FEE2E2]/30 flex items-center justify-center mb-4">
        <span className="font-mono text-3xl font-bold text-[#D94826]">!</span>
      </div>
      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#D94826] mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-neutral-600 max-w-sm leading-relaxed mb-6 whitespace-pre-wrap break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-[#111111] bg-[#111111] text-white hover:bg-white hover:text-[#111111] transition-colors cursor-pointer shadow-[2px_2px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
