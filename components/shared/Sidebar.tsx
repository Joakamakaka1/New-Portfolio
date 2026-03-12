"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ── SIDEBAR DESKTOP ── */}
      <aside className="hidden md:flex w-72 h-full bg-red-500 flex-col pt-10 flex-shrink-0 z-10 transition-colors duration-300">
        <nav className="flex flex-col gap-2 w-full mt-8" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.path}
                className={`w-full pl-8 pr-4 py-4 flex items-center transition-colors group ${
                  isActive
                    ? "bg-white text-black font-extrabold"
                    : "text-white font-extrabold"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-xl tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── BOTTOM NAV MOBILE ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#f8f8f8] border-t border-gray-200 z-50 flex items-center justify-around px-2"
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.path}
              className="flex-1 max-w-[80px] h-full flex items-center justify-center"
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
            >
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isActive ? "text-[#e60012]" : "text-gray-500"}`}
                >
                  {item.name.substring(0, 5)}
                </span>
                {isActive && (
                  <div className="absolute top-2 w-8 h-1 bg-[#e60012] rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
