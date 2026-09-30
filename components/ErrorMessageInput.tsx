import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b border-[#111111] bg-[#F5F5F3] p-3 transition-all">
      <div className="flex items-center justify-between pb-1.5 mb-1.5">
        <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-neutral-600">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs text-neutral-600 hover:text-[#111111] hover:underline cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Traceback (most recent call last):\n  File "solution.py", line 4, in calculate_average\nTypeError: unsupported operand type(s) for +=: 'int' and 'list'`}
        className="w-full p-2 text-xs font-mono bg-white border border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] text-[#111111] resize-y placeholder:text-neutral-400"
        spellCheck={false}
      />
    </div>
  );
}
