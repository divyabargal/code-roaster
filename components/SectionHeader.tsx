import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E6E6E2]">
      <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#111111]">
        {formattedNumber} // {title}
      </span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
