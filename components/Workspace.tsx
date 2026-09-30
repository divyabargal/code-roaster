"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { TopBar } from "@/components/TopBar";
import { RoastControls } from "@/components/RoastControls";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { CodeEditor } from "@/components/CodeEditor";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import type {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || !code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");
    setRoastResult(null);

    const codeToRoast = code;

    try {
      const result = await requestRoast({
        language,
        code: codeToRoast,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(codeToRoast);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "An unknown error occurred.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  const handleApplyFix = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter roasts from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRoast]);

  // Error line is only highlighted if editor holds the exact roasted code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] mx-auto my-2 sm:my-4 h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] bg-[#FDFDFD] flex flex-col overflow-hidden">
      {/* Top Bar with Roast Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Conditionally Rendered Error Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Body: Responsive Split Panes */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Left: Code Editor (~54-55% desktop) */}
        <div className="w-full lg:w-[55%] h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-[#111111] flex flex-col min-h-0">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right: Roast Report (~46-45% desktop) */}
        <div className="w-full lg:w-[45%] h-1/2 lg:h-full flex flex-col min-h-0">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>

      {/* Footer Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
