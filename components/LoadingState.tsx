import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
      <div className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center mb-4 bg-white shadow-[2px_2px_0px_#111111]">
        <span className="font-mono text-2xl font-bold text-[#111111] inline-block animate-spin">
          /
        </span>
      </div>
      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#111111] mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-neutral-500 max-w-xs leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
