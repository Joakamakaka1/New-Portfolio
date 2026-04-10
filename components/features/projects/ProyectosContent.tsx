"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ExternalLink, Github, LayoutGrid, Rows3 } from "lucide-react";
import type { Project } from "@/types";

interface ProyectosContentProps {
  projects: Project[];
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  completed: { label: "Completado", className: "st-status-complete" },
  "in-progress": { label: "En progreso", className: "st-status-progress" },
  pending: { label: "Próximamente", className: "st-status-active" },
};

export default function ProyectosContent({
  projects,
}: ProyectosContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        gridRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out", clearProps: "all" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [compact]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto scrollbar-hide"
      style={{ color: "var(--st-on-surface)" }}
    >
      {/* ── Header row ── */}
      <div className="flex items-end justify-between mb-8 mt-2 md:mt-0">
        <div>
          <h1
            ref={titleRef}
            className="font-black text-3xl md:text-4xl tracking-tight"
            style={{ color: "var(--st-on-surface)" }}
          >
            Mis proyectos
          </h1>
          <p
            className="text-sm font-medium mt-1"
            style={{ color: "var(--st-on-surface-variant)" }}
          >
            Selección de proyectos técnicos y aplicaciones fullstack.
          </p>
        </div>

        {/* Layout toggle */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--st-surface-container)" }}>
          <button
            onClick={() => setCompact(false)}
            className={`p-1.5 rounded-md transition-colors ${!compact ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
            aria-label="Vista cuadrícula"
          >
            <LayoutGrid className="w-4 h-4" style={{ color: !compact ? "var(--st-primary)" : "var(--st-on-surface-variant)" }} />
          </button>
          <button
            onClick={() => setCompact(true)}
            className={`p-1.5 rounded-md transition-colors ${compact ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
            aria-label="Vista lista"
          >
            <Rows3 className="w-4 h-4" style={{ color: compact ? "var(--st-primary)" : "var(--st-on-surface-variant)" }} />
          </button>
        </div>
      </div>

      {/* ── Project Grid ── */}
      <div
        ref={gridRef}
        className={`grid gap-6 pb-8 ${
          compact
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {projects.map((project) => {
          const status = STATUS_LABELS[project.status] ?? STATUS_LABELS.pending;
          return (
            <div
              key={project.id}
              className="st-card st-glow-hover group rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.images[0] || "/Prueba.png"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status badge */}
                <span
                  className={`absolute top-4 right-4 text-[10px] font-black tracking-[0.1em] uppercase px-3 py-1.5 rounded-full ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="font-bold text-lg md:text-xl mb-2 group-hover:text-[var(--st-primary)] transition-colors duration-300"
                  style={{ color: "var(--st-on-surface)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm font-medium leading-relaxed mb-5 line-clamp-2 flex-1"
                  style={{ color: "var(--st-on-surface-variant)" }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span key={tech} className="st-badge">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="st-badge">
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div
                  className="flex items-center gap-4 pt-4"
                  style={{ borderTop: "1px solid var(--st-surface-container)" }}
                >
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold hover:text-[var(--st-primary)] transition-colors"
                      style={{ color: "var(--st-on-surface-variant)" }}
                    >
                      <Github className="w-4 h-4" />
                      Repositorio
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold hover:text-[var(--st-secondary)] transition-colors"
                      style={{ color: "var(--st-on-surface-variant)" }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
