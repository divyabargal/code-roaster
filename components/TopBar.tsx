import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b border-[#111111] bg-[#FDFDFD] flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2.5 gap-3 shrink-0">
      {/* Left: App Name + Version Badge */}
      <div className="flex items-center gap-2 select-none">
        <h1 className="font-sans font-extrabold uppercase tracking-widest text-base sm:text-lg text-[#111111]">
          {APP.name}
        </h1>
        <span className="border border-[#111111] px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#111111] bg-[#F5F5F3]">
          {APP.version}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center justify-start md:justify-end">
        {children}
      </div>
    </header>
  );
}
