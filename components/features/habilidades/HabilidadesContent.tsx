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
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.5 },
      });

      tl.fromTo(
        titleRef.current,
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
      );
      tl.fromTo(
        subTitleRef.current,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        "+=0.1",
      );

      const cards = skillsListRef.current?.children;
      if (cards) {
        tl.fromTo(
          cards,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            ease: "back.out(1.2)",
            clearProps: "all",
          },
          "-=0.4",
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto text-black scrollbar-hide"
    >
      <h1
        ref={titleRef}
        className="text-black font-bold text-4xl mb-12 flex items-center mt-2 md:mt-0"
      >
        Mis habilidades
      </h1>

      <h2
        ref={subTitleRef}
        className="text-black font-bold text-lg mb-4 flex items-center mt-2 md:mt-0"
      >
        Contenido Descargable (DLCs) y Habilidades
      </h2>

      <div
        ref={skillsListRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] gap-6 mt-2 pb-6"
      >
        {skills.map((skill) => {
          const Icon = ICON_MAP[skill.iconKey];
          return (
            <div
              key={skill.id}
              className="group bg-white border border-gray-200 hover:border-transparent hover:ring-[3px] hover:ring-inset hover:ring-[#e60012] rounded-lg p-3 flex items-center shadow-sm relative overflow-hidden transition-[box-shadow,border-color,background-color] duration-300 cursor-pointer"
            >
              <div
                className={`w-[84px] h-[84px] bg-gradient-to-br ${skill.color} rounded flex-shrink-0 flex items-center justify-center border border-white/20 shadow-inner z-10 relative overflow-hidden text-white/90 drop-shadow-md`}
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
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {skill.type}
                </span>
                <h3 className="text-base font-bold text-gray-800 leading-tight mt-0.5 truncate">
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
