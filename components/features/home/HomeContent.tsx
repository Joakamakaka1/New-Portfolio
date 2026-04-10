"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { GitFork, Star, ExternalLink } from "lucide-react";
import type { GitHubProfile, GitHubRepository } from "@/types";

// ─── Language → colour mapping ────────────────────────────────────────────────
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-500",
  Java: "bg-orange-500",
  HTML: "bg-red-500",
  CSS: "bg-purple-500",
  Shell: "bg-green-600",
  Dockerfile: "bg-sky-500",
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
  const greetingRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const reposRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.5 },
      });

      tl.fromTo(
        mainTitleRef.current,
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
      );

      tl.fromTo(
        greetingRef.current,
        { x: 60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1 },
        "-=0.15",
      );

      tl.fromTo(
        subTitleRef.current,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        "-=0.3",
      );

      const repoCards = reposRef.current?.children;
      if (repoCards) {
        tl.fromTo(
          repoCards,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            ease: "back.out(1.2)",
            clearProps: "all",
          },
          "-=0.4",
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /** Relative time label from ISO date string */
  function formatRelativeDate(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const days = Math.floor(diff / 86_400_000);
    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
    if (days < 365) return `Hace ${Math.floor(days / 30)} meses`;
    return `Hace ${Math.floor(days / 365)} años`;
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto text-black scrollbar-hide"
    >
      <h1
        ref={mainTitleRef}
        className="text-black font-bold text-4xl mb-12 flex items-center mt-2 md:mt-0"
      >
        Mi portfolio
      </h1>

      {/* ── Hero banner with real GitHub profile data ── */}
      <div className="w-full min-h-[420px] bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex flex-col justify-end p-6 mb-8 relative overflow-hidden border border-gray-100">
        <div
          ref={greetingRef}
          className="bg-white p-5 max-w-xl w-full shadow-lg border-l-4 border-[#e60012] z-10"
        >
          {/* Profile header row */}
          <div className="flex items-center gap-4 mb-3">
            <Image
              src={profile.avatarUrl}
              alt={`Avatar de ${profile.name}`}
              width={52}
              height={52}
              className="rounded-full border-2 border-gray-200 shadow-sm"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
                ¡Hola, soy {profile.name}!
              </h2>
              <p className="text-xs text-gray-400 font-semibold">
                @{profile.login}
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-4">
            Apasionado por la tecnología y su impacto. Desarrollador Fullstack
            especializado en Frontend y Backend. Bienvenido a mi portfolio
            interactivo.
          </p>
          {/* GitHub stats pills */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              📦 {profile.publicRepos} repos
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              👥 {profile.followers} seguidores
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              🗓️ Miembro desde{" "}
              {new Date(profile.createdAt).toLocaleDateString("es-ES", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 z-0 pointer-events-none"></div>
      </div>

      {/* ── Latest repos section ── */}
      <h2
        ref={subTitleRef}
        className="text-black font-bold text-lg mb-4 flex items-center"
      >
        Últimos Repositorios
      </h2>

      <div
        ref={reposRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 mt-4"
      >
        {latestRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer bg-white rounded-xl p-5 flex flex-col shadow-sm border border-gray-200 hover:border-transparent hover:ring-[3px] hover:ring-inset hover:ring-[#e60012] relative overflow-hidden transition-[box-shadow,border-color,background-color] duration-300"
          >
            {/* Repo name + external link icon */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#e60012] transition-colors duration-300 truncate">
                {repo.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-4 flex-1">
              {repo.description ?? "Sin descripción"}
            </p>

            {/* Footer: language + stats + date */}
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mt-auto">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] ?? "bg-gray-400"}`}
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
              <span className="tracking-wide">
                {formatRelativeDate(repo.updatedAt)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
