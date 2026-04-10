"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Briefcase,
  Sparkles,
  FolderOpen,
  Mail,
} from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import type { ReactNode } from "react";

/** Map nav paths to icons */
const NAV_ICONS: Record<string, ReactNode> = {
  "/": <Compass className="w-5 h-5" />,
  "/experiencia": <Briefcase className="w-5 h-5" />,
  "/habilidades": <Sparkles className="w-5 h-5" />,
  "/proyectos": <FolderOpen className="w-5 h-5" />,
  "/contacto": <Mail className="w-5 h-5" />,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ── SIDEBAR DESKTOP — Dark gradient with red/orange accent ── */}
      <aside
        className="hidden md:flex w-64 h-full flex-col py-8 flex-shrink-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--st-primary) 0%, var(--st-primary-container) 100%)",
        }}
      >
        {/* Brand mark */}
        <div className="px-6 mb-12">
          <h2 className="text-xl font-black tracking-tighter leading-none text-white">
            JCastro
          </h2>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-white/90">
            Fullstack Developer
          </p>
        </div>

        <nav
          className="flex flex-col gap-0 w-full flex-1"
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.path}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-colors duration-200 ${
                  isActive
                    ? "bg-white border-l-4 border-[var(--st-secondary-container)] font-bold"
                    : "font-medium"
                }`}
                style={{ color: isActive ? "#191c1d" : "rgba(255,255,255,0.8)" }}
                aria-current={isActive ? "page" : undefined}
              >
                <span>
                  {NAV_ICONS[item.path]}
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest">
                  {item.name}
                </span>
              </Link>
            );                                
          })}
        </nav>

        {/* Bottom CTA — Bright orange */}
        <div className="px-6 mt-auto">
          <a
            href="mailto:joaquincastro@example.com"
            className="block w-full py-3 font-black text-[10px] tracking-widest uppercase text-center rounded-lg transition-transform active:opacity-80"
            style={{
              background: "var(--st-on-primary)",
              color: "var(--st-primary)",
              boxShadow: "0 4px 14px rgba(183, 0, 12, 0.3)",
            }}
          >
            Contáctame
          </a>
        </div>
      </aside>

      {/* ── BOTTOM NAV MOBILE ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 z-50 flex items-center justify-around px-2"
        style={{
          background:
            "linear-gradient(90deg, var(--st-primary) 0%, var(--st-primary-container) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
        }}
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.path}
              className="flex-1 max-w-[72px] h-full flex items-center justify-center"
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
            >
              <div className="relative flex flex-col items-center justify-center gap-1 w-full h-full">
                {isActive && (
                  <div
                    className="absolute top-2 w-8 h-1 rounded-full"
                    style={{ background: "var(--st-secondary-container)" }}
                  />
                )}
                <span
                  className="transition-colors"
                  style={{
                    color: isActive
                      ? "var(--st-secondary-container)"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  {NAV_ICONS[item.path]}
                </span>
                <span
                  className="text-[9px] font-bold tracking-wider"
                  style={{
                    color: isActive
                      ? "#ffffff"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.name.substring(0, 6)}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
