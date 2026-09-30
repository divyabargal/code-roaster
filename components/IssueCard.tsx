import React from "react";
import type { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyles: Record<
  Severity,
  { bg: string; text: string; border: string }
> = {
  "FATAL BUG": {
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    border: "border-[#FCA5A5]",
  },
  "CODE SMELL": {
    bg: "bg-[#FEF3C7]",
    text: "text-[#D97706]",
    border: "border-[#FCD34D]",
  },
  OPTIMIZATION: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#16A34A]",
    border: "border-[#86EFAC]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const severityStyle = severityStyles[issue.severity] || severityStyles["CODE SMELL"];

  return (
    <div className="border border-[#111111] bg-white shadow-[2px_2px_0px_#111111] p-3 transition-all">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E6E6E2]">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] text-white px-1.5 py-0.5 text-xs font-mono font-bold leading-none">
            {formattedIndex}
          </span>
          <span className="text-xs font-mono font-bold text-[#111111]">
            LINE {issue.line}
          </span>
          <span
            className={`${severityStyle.bg} ${severityStyle.text} ${severityStyle.border} border px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-500 text-right max-w-full sm:max-w-[50%] break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <pre className="border-l-2 border-[#D94826] bg-[#F5F5F3] p-2 text-xs font-mono text-[#111111] overflow-x-auto whitespace-pre my-2.5">
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1 mt-2">
        <div className="text-xs font-mono text-[#D94826] leading-relaxed">
          <span className="font-bold">✕ Diagnosis:</span> {issue.diagnosis}
        </div>
        <div className="text-xs font-mono text-[#16A34A] leading-relaxed">
          <span className="font-bold">✓ Expected:</span> {issue.expected}
        </div>
      </div>
    </div>
  );
}
