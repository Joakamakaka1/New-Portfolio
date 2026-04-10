"use client";

import { useRef, useLayoutEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import {
  GitFork,
  Star,
  ExternalLink,
  Package,
  Users,
  CalendarDays,
} from "lucide-react";
import type { GitHubProfile, GitHubRepository } from "@/types";

// ─── Language → colour mapping ────────────────────────────────────────────────
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

interface HomeContentProps {
  profile: GitHubProfile;
  latestRepos: GitHubRepository[];
}

export default function HomeContent({
  profile,
  latestRepos,
}: HomeContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const reposRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple entrance — no staggered secondary lifts
      gsap.fromTo(
        mainTitleRef.current,
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        heroRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out" },
      );

      gsap.fromTo(
        subTitleRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.15, ease: "power2.out" },
      );

      gsap.fromTo(
        reposRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "all" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [now] = useState(() => Date.now());

  function formatRelativeDate(isoDate: string): string {
    const diff = now - new Date(isoDate).getTime();
    const days = Math.floor(diff / 86_400_000);
    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} sem`;
    if (days < 365) return `Hace ${Math.floor(days / 30)} meses`;
    return `Hace ${Math.floor(days / 365)} años`;
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto scrollbar-hide"
      style={{ color: "var(--st-on-surface)" }}
    >
      <h1
        ref={mainTitleRef}
        className="font-black text-3xl md:text-4xl tracking-tight mb-8 md:mb-12 mt-2 md:mt-0"
        style={{ color: "var(--st-on-surface)" }}
      >
        Mi portfolio
      </h1>

      {/* ── Hero banner with glassmorphism card ── */}
      <div
        ref={heroRef}
        className="w-full rounded-xl py-5 px-3 md:px-5 mb-10 relative"
        style={{
          background:
            "linear-gradient(to top right, var(--st-primary) 0%, var(--st-secondary-container) 100%)",
        }}
      >

        {/* Glass card */}
        <div
          className="st-glass rounded-xl p-6 md:p-12 w-full h-auto md:h-[520px] z-10 relative flex flex-col md:flex-row gap-8 md:gap-12 items-stretch"
          style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
        >
          {/* Left: Profile info */}
          <div className="flex-1 flex flex-col">
            {/* Role badge */}
            <span
              className="inline-block px-4 py-1.5 text-white text-xs font-black tracking-widest uppercase rounded-full mb-6 self-start shadow-md"
              style={{ background: "var(--st-primary)" }}
            >
              Fullstack Developer
            </span>

            {/* Hero name */}
            <h2
              className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6"
              style={{ color: "var(--st-on-surface)" }}
            >
              {profile.name}
            </h2>

            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              style={{ color: "var(--st-on-surface-variant)" }}
            >
              Apasionado por la tecnología y su impacto. Desarrollador Fullstack
              especializado en Frontend y Backend. Bienvenido a mi portfolio
              interactivo.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <a
                href="/proyectos"
                className="px-8 py-4 text-white text-sm md:text-base font-bold tracking-wide rounded-lg hover:scale-105 transition-transform shadow-lg"
                style={{
                  background: "var(--st-primary)",
                  boxShadow: "0 4px 14px rgba(183, 0, 12, 0.3)",
                }}
              >
                VER PROYECTOS
              </a>
              <a
                href="/contacto"
                className="px-8 py-4 text-sm md:text-base font-bold tracking-wide rounded-lg border-2 hover:bg-white transition-colors"
                style={{
                  borderColor: "var(--st-surface-container-high)",
                  color: "var(--st-on-surface)",
                }}
              >
                CONTACTO
              </a>
            </div>
          </div>

          {/* Right: Stats column */}
          <div className="w-full lg:w-140 flex flex-row md:flex-col gap-2 sm:gap-4 justify-center">
            <StatCard
              icon={<Package className="w-6 h-6" />}
              value={profile.publicRepos}
              label="Repos"
              color="var(--st-primary)"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              value={profile.followers}
              label="Seguidores"
              color="var(--st-secondary)"
            />
            <StatCard
              icon={<CalendarDays className="w-6 h-6" />}
              value={new Date(profile.createdAt).toLocaleDateString("es-ES", {
                month: "short",
                year: "numeric",
              })}
              label="Miembro"
              color="var(--st-tertiary)"
            />
          </div>
        </div>
      </div>

      {/* ── Latest repos section ── */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2
            ref={subTitleRef}
            className="font-black text-3xl tracking-tighter"
            style={{ color: "var(--st-on-surface)" }}
          >
            Últimos Repositorios
          </h2>
          <p
            className="text-sm font-medium mt-1"
            style={{ color: "var(--st-on-surface-variant)" }}
          >
            Proyectos actualizados recientemente en GitHub.
          </p>
        </div>
        <a
          href="https://github.com/Joakamakaka1?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-xs font-black tracking-[0.1em] uppercase hover:gap-3 transition-all"
          style={{ color: "var(--st-primary)" }}
        >
          Ver todos
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div
        ref={reposRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6"
      >
        {latestRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="st-card st-glow-hover group rounded-xl p-8 flex flex-col cursor-pointer"
          >
            {/* Header: icon + status */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "var(--st-primary-fixed)",
                  color: "var(--st-primary)",
                }}
              >
                <Package className="w-5 h-5" />
              </div>
              <ExternalLink
                className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ color: "var(--st-on-surface-variant)" }}
              />
            </div>

            {/* Name */}
            <h3
              className="font-bold text-base mb-2 group-hover:text-[var(--st-primary)] transition-colors duration-300 truncate"
              style={{ color: "var(--st-on-surface)" }}
            >
              {repo.name}
            </h3>

            {/* Description */}
            <p
              className="text-xs font-medium leading-relaxed line-clamp-2 mb-5 flex-1"
              style={{ color: "var(--st-on-surface-variant)" }}
            >
              {repo.description ?? "Sin descripción"}
            </p>

            {/* Footer: language + stats + date */}
            <div
              className="flex items-center justify-between text-[10px] font-bold tracking-wide pt-4"
              style={{
                borderTop: "1px solid var(--st-surface-container)",
                color: "var(--st-on-surface-variant)",
              }}
            >
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background:
                          LANGUAGE_COLORS[repo.language] ?? "#9ca3af",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazersCount > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3" /> {repo.stargazersCount}
                  </span>
                )}
                {repo.forksCount > 0 && (
                  <span className="flex items-center gap-0.5">
                    <GitFork className="w-3 h-3" /> {repo.forksCount}
                  </span>
                )}
              </div>
              <span className="uppercase tracking-widest">
                {formatRelativeDate(repo.updatedAt)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Stat Mini-Card ────────────────────────────────────────────────────────── */
function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: ReactNode;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-5 p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-black/5"
      style={{ background: "rgba(255,255,255,0.7)" }}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `color-mix(in srgb, ${color} 10%, transparent)`, color }}
      >
        {icon}
      </div>
      <div className="text-center md:text-left mt-1 md:mt-0">
        <p
          className="text-lg sm:text-xl md:text-4xl font-black leading-none animate-count-up"
          style={{ color: "var(--st-on-surface)" }}
        >
          {value}
        </p>
        <p className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mt-1 md:mt-2"
          style={{ color: "var(--st-on-surface-variant)" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
