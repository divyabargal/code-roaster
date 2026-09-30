import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
      <div className="w-16 h-16 border-2 border-dashed border-[#111111]/30 flex items-center justify-center mb-4">
        <span className="font-mono text-2xl font-bold text-neutral-400">{"{}"}</span>
      </div>
      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#111111] mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-neutral-500 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
