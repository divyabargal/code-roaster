"use client";

import React from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { IssueCard } from "@/components/IssueCard";
import { FixedCode } from "@/components/FixedCode";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasCorrectedCode = Boolean(result?.correctedCode && result.correctedCode.trim().length > 0);
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim().length > 0);
  const takeawaySectionNumber = hasCorrectedCode ? 4 : 3;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD]">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-[#111111] bg-[#F5F5F3] shrink-0 font-mono text-xs">
        <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
          AUDIT // REPORT
        </span>
        <span className="font-bold text-[#111111] uppercase tracking-wider text-xs">
          Roast Report
        </span>
        <span className="w-16" /> {/* Empty spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="p-4 sm:p-5 space-y-6">
            {/* Section 1: Roast */}
            <section>
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="bg-[#F5F5F3] border-l-4 border-[#111111] p-4 text-[#111111] font-sans text-sm sm:text-base leading-relaxed italic shadow-[2px_2px_0px_#111111]">
                &ldquo;{result.roast}&rdquo;
              </div>
            </section>

            {/* Section 2: What's Wrong */}
            <section>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>
              {result.issues.length === 0 ? (
                <div className="p-3 border border-[#86EFAC] bg-[#DCFCE7] text-[#16A34A] font-mono text-xs font-semibold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </section>

            {/* Section 3: Fix */}
            {hasCorrectedCode && (
              <section>
                <FixedCode
                  sectionNumber={3}
                  language={language}
                  code={result.correctedCode}
                  onApply={onApplyFix}
                />
              </section>
            )}

            {/* Takeaway Section */}
            {hasTakeaway && (
              <section>
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="font-mono text-xs text-[#111111] leading-relaxed bg-[#F5F5F3] p-3 border border-[#E6E6E2]">
                  {result.takeaway}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
