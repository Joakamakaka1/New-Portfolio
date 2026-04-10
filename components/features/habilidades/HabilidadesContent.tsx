"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import type { IconType } from "react-icons";
import {
  FaReact,
  FaAngular,
  FaPython,
  FaJava,
  FaDocker,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiFastapi,
  SiSpringboot,
  SiMysql,
  SiKubernetes,
  SiNestjs,
  SiNodedotjs,
  SiGo,
} from "react-icons/si";
import type { SkillData } from "@/types";

// Icon map lives here in the Client bundle only — not serialized across boundary
const ICON_MAP: Record<string, IconType> = {
  FaReact,
  FaAngular,
  FaPython,
  FaJava,
  FaDocker,
  FaGitAlt,
  FaFigma,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiFastapi,
  SiSpringboot,
  SiMysql,
  SiKubernetes,
  SiNestjs,
  SiNodedotjs,
  SiGo,
};

interface HabilidadesContentProps {
  skills: ReadonlyArray<SkillData>;
}

export default function HabilidadesContent({
  skills,
}: HabilidadesContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const skillsListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(subTitleRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.05, ease: "power2.out" });
      gsap.fromTo(skillsListRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out", clearProps: "all" });
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
        Mis habilidades
      </h1>

      <h2
        ref={subTitleRef}
        className="font-bold text-lg mb-4 flex items-center mt-2 md:mt-0"
        style={{ color: "var(--st-on-surface)" }}
      >
        Contenido Descargable (DLCs) y Habilidades
      </h2>

      <div
        ref={skillsListRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] gap-5 mt-2 pb-6"
      >
        {skills.map((skill) => {
          const Icon = ICON_MAP[skill.iconKey];
          return (
            <div
              key={skill.id}
              className="st-card st-glow-hover group rounded-xl p-3 flex items-center cursor-pointer relative overflow-hidden"
            >
              <div
                className={`w-[84px] h-[84px] bg-gradient-to-br ${skill.color} rounded-lg flex-shrink-0 flex items-center justify-center shadow-inner z-10 relative overflow-hidden text-white/90 drop-shadow-md`}
                aria-hidden="true"
              >
                {Icon && (
                  <Icon
                    size={44}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
              </div>

              <div className="ml-4 flex flex-col justify-center flex-1 max-w-[calc(100%-100px)] z-10">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: "var(--st-on-surface-variant)" }}
                >
                  {skill.type}
                </span>
                <h3
                  className="text-base font-bold leading-tight mt-0.5 truncate group-hover:text-[var(--st-primary)] transition-colors"
                  style={{ color: "var(--st-on-surface)" }}
                >
                  {skill.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
