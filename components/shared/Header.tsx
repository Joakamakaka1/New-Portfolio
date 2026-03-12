"use client";

import { useState, useEffect } from "react";
import { Search, Wifi } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

    setTime(fmt());
    const interval = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[72px] md:h-[96px] w-full flex items-center justify-between px-6 md:px-16 flex-shrink-0 bg-transparent z-20">
      {/* Left side: Profile / Logo */}
      <div className="flex flex-col md:flex-row items-center gap-4 group cursor-pointer relative">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-200 border-2 border-transparent overflow-hidden flex items-center justify-center group-hover:border-[#e60012] transition-colors shadow-sm relative z-10">
          <span className="text-gray-500 font-bold text-lg md:text-xl">JC</span>
        </div>
        {/* Semantic: name is branding identity, not a page heading */}
        <p className="font-bold text-black tracking-wide text-xs md:text-2xl hidden sm:block">
          Joaquin Castro
        </p>
      </div>

      {/* Right side: System Status Icons */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Global Search Icon */}
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group text-gray-500 hover:text-gray-900 transition-colors shadow-sm relative overflow-visible"
          role="button"
          aria-label="Buscar"
          tabIndex={0}
        >
          <div className="absolute -inset-1 border-2 border-[#e60012] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
          <Search className="w-4 h-4 md:w-5 md:h-5 z-10" />
        </div>

        {/* System Clock + WiFi */}
        <div className="flex items-center gap-2 md:gap-3 text-gray-500 font-extrabold text-xs md:text-lg tracking-wide">
          <time aria-label="Hora actual">{time}</time>
          <div className="flex items-center gap-2 opacity-80">
            <Wifi className="w-7 h-7 md:w-7 md:h-7" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
