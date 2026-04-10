"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import type { IconType } from "react-icons";
import {
  FaBriefcase, FaLaptopCode, FaWrench, FaGraduationCap,
} from "react-icons/fa";
import type { ExperienceData } from "@/types";

// Icon map lives here in the Client bundle only
const ICON_MAP: Record<string, IconType> = {
  FaBriefcase, FaLaptopCode, FaWrench, FaGraduationCap,
};

interface ExperienciaContentProps {
  experience: ExperienceData[];
  studies: ExperienceData[];
}

export default function ExperienciaContent({
  experience,
  studies,
}: ExperienciaContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const expTitleRef = useRef<HTMLHeadingElement>(null);
  const expListRef = useRef<HTMLDivElement>(null);
  const studiesTitleRef = useRef<HTMLHeadingElement>(null);
  const studiesListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(expTitleRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.05, ease: "power2.out" });
      gsap.fromTo(expListRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out", clearProps: "all" });
      gsap.fromTo(studiesTitleRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.15, ease: "power2.out" });
      gsap.fromTo(studiesListRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "all" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto scrollbar-hide"
      style={{ color: "var(--st-on-surface)" }}
    >
      <h1
        ref={titleRef}
        className="font-black text-3xl md:text-4xl tracking-tight mb-10 mt-2 md:mt-0"
        style={{ color: "var(--st-on-surface)" }}
      >
        Mi experiencia
      </h1>

      <div className="mb-8 mt-2 md:mt-0">
        <h2
          ref={expTitleRef}
          className="font-bold text-lg mb-4 flex items-center"
          style={{ color: "var(--st-on-surface)" }}
        >
          Experiencia Laboral
        </h2>
        <div ref={expListRef} className="flex flex-col gap-4 mt-2">
          {experience.map((item) => (
            <ExperienceCard key={item.id} item={item} variant="work" />
          ))}
        </div>
      </div>

      <div className="pb-6">
        <h2
          ref={studiesTitleRef}
          className="font-bold text-lg mb-4 flex items-center"
          style={{ color: "var(--st-on-surface)" }}
        >
          Estudios y Formación
        </h2>
        <div ref={studiesListRef} className="flex flex-col gap-4 mt-2">
          {studies.map((item) => (
            <ExperienceCard key={item.id} item={item} variant="study" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  item,
  variant,
}: {
  item: ExperienceData;
  variant: "work" | "study";
}) {
  const Icon = ICON_MAP[item.iconKey];

  const tagStyle =
    variant === "work"
      ? { background: "var(--st-tertiary-fixed)", color: "var(--st-tertiary)" }
      : { background: "var(--st-primary-fixed)", color: "var(--st-primary)" };

  return (
    <article
      className="st-card st-glow-hover group cursor-pointer rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center relative overflow-hidden"
      tabIndex={0}
    >
      <div
        className={`w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br ${item.color} rounded-lg flex-shrink-0 flex items-center justify-center shadow-inner z-10 relative overflow-hidden text-white/90 drop-shadow-md mb-4 sm:mb-0`}
        aria-hidden="true"
      >
        {Icon && (
          <Icon size={36} className="sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110" />
        )}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>

      <div className="sm:ml-6 flex flex-col justify-center flex-1 z-10 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center mb-1">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded mr-auto sm:mr-4 mb-2 sm:mb-0"
            style={tagStyle}
          >
            {item.type} • {item.entity}
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "var(--st-on-surface-variant)" }}
          >
            {item.date}
          </span>
        </div>
        <h3
          className="text-lg sm:text-xl font-extrabold leading-tight mb-2 group-hover:text-[var(--st-primary)] transition-colors duration-200"
          style={{ color: "var(--st-on-surface)" }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm font-medium leading-relaxed max-w-3xl"
          style={{ color: "var(--st-on-surface-variant)" }}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
