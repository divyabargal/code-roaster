"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj?.label || language;

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);

  const updateCursor = (el: HTMLTextAreaElement) => {
    const textBefore = el.value.substring(0, el.selectionStart);
    const linesBefore = textBefore.split("\n");
    const line = linesBefore.length;
    const col = linesBefore[linesBefore.length - 1].length + 1;
    setCursor({ line, col });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            start + 4;
          updateCursor(textareaRef.current);
        }
      });
    }
  };

  const handleSelect = () => {
    if (textareaRef.current) {
      updateCursor(textareaRef.current);
    }
  };

  // Sync scroll on mount/change
  useEffect(() => {
    handleScroll();
  }, [code]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-[#111111] bg-[#F5F5F3] shrink-0 font-mono text-xs">
        <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
          INPUT // SRC
        </span>
        <span className="font-bold text-[#111111] uppercase tracking-wider text-xs">
          Your Code
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-bold text-neutral-600 hover:text-[#111111] hover:underline uppercase cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-neutral-300">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[11px] font-bold text-neutral-600 hover:text-[#D94826] hover:underline uppercase cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex relative overflow-hidden min-h-0 bg-[#FDFDFD]">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[#F5F5F3] border-r border-[#E6E6E2] select-none overflow-hidden shrink-0 py-3 text-right pr-2.5 font-mono text-xs leading-[21px]"
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const isError = lineNum === errorLine;
            return (
              <div
                key={lineNum}
                className={`h-[21px] transition-colors ${
                  isError
                    ? "bg-[#D94826]/15 text-[#D94826] font-bold -mr-2.5 pr-2.5 border-r-2 border-[#D94826]"
                    : "text-neutral-400"
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="relative flex-1 h-full overflow-hidden">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursor(e.target);
            }}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}
            onClick={handleSelect}
            onKeyUp={handleSelect}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="// Paste your code here..."
            className="w-full h-full p-3 font-mono text-xs leading-[21px] text-[#111111] bg-transparent resize-none focus:outline-none whitespace-pre overflow-auto"
            style={{ tabSize: 4 }}
          />
        </div>
      </div>

      {/* Bottom Status Strip Overlay */}
      <div className="h-7 px-3 flex items-center justify-between border-t border-[#E6E6E2] bg-[#F5F5F3] shrink-0 font-mono text-[11px] text-neutral-500">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div className="hidden sm:block text-neutral-400">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </div>
  );
}
