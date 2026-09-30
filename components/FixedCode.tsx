"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import type { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj?.extension || "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="space-y-3">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-mono font-bold text-[#16A34A] tracking-wider uppercase bg-[#DCFCE7] border border-[#86EFAC] px-1.5 py-0.5">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[#111111] bg-white shadow-[2px_2px_0px_#111111]">
        {/* Filename & Ready status header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#F5F5F3] border-b border-[#111111] font-mono text-xs">
          <span className="font-bold text-[#111111]">{filename}</span>
          <span className="text-[11px] font-bold text-[#16A34A] tracking-wider uppercase">
            ● READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3 text-xs font-mono text-[#111111] overflow-x-auto whitespace-pre leading-relaxed bg-[#FDFDFD]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="px-3 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-[#111111] bg-[#111111] text-white hover:bg-neutral-800 transition-colors cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.4)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
