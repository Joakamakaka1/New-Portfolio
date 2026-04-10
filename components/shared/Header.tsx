"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Wifi } from "lucide-react";

interface HeaderProps {
  avatarUrl?: string;
  displayName?: string;
}

const FALLBACK_AVATAR =
  "https://avatars.githubusercontent.com/u/129002508?v=4";
const FALLBACK_NAME = "Joaquin Castro Salas";

export default function Header({
  avatarUrl = FALLBACK_AVATAR,
  displayName = FALLBACK_NAME,
}: HeaderProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

    const timeout = setTimeout(() => setTime(fmt()), 0);
    const interval = setInterval(() => setTime(fmt()), 10_000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 md:px-12 flex-shrink-0 z-20 st-glass-header shadow-sm">
      {/* Left side: Profile + clock */}
      <div className="flex items-center gap-4">
        <Image
          src={avatarUrl}
          alt={`Avatar de ${displayName}`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
          priority
        />
        <div className="hidden sm:block">
          <h2
            className="text-sm font-bold"
            style={{ color: "var(--st-on-surface)" }}
          >
            {displayName}
          </h2>
          <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
            <Search className="w-3 h-3" />
            <time aria-label="Hora actual">{time}</time>
          </p>
        </div>
      </div>

      {/* Center: Quick links (desktop) — matches Stitch nav */}
      <nav className="hidden md:flex items-center gap-6">
        <a
          href="https://github.com/Joakamakaka1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 font-bold text-sm hover:text-[var(--st-primary)] transition-colors"
        >
          Github
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 font-bold text-sm hover:text-[var(--st-primary)] transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="text-slate-600 font-bold text-sm hover:text-[var(--st-primary)] transition-colors"
        >
          Resume
        </a>
      </nav>

      {/* Right side: Actions — matches Stitch dark_mode + notifications */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-slate-600 hover:text-[var(--st-primary)] transition-colors"
          aria-label="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] tracking-widest uppercase">
          <time aria-label="Hora actual" className="hidden md:inline">{time}</time>
          <Wifi className="w-5 h-5 opacity-60" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
