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
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });

      tl.fromTo(titleRef.current, { y: -40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 });
      tl.fromTo(expTitleRef.current, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "+=0.1");

      const expCards = expListRef.current?.children;
      if (expCards) {
        tl.fromTo(
          expCards,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" },
          "-=0.3",
        );
      }

      tl.fromTo(studiesTitleRef.current, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.4");

      const studiesCards = studiesListRef.current?.children;
      if (studiesCards) {
        tl.fromTo(
          studiesCards,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" },
          "-=0.3",
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
        Mi experiencia
      </h1>

      <div className="mb-8 mt-2 md:mt-0">
        <h2
          ref={expTitleRef}
          className="text-black font-bold text-lg mb-4 flex items-center"
        >
          Experiencia Laboral
        </h2>
        <div ref={expListRef} className="flex flex-col gap-4 mt-2">
          {experience.map((item) => (
            <ExperienceCard key={item.id} item={item} tagColor="blue" />
          ))}
        </div>
      </div>

      <div className="pb-6">
        <h2
          ref={studiesTitleRef}
          className="text-black font-bold text-lg mb-4 flex items-center"
        >
          Estudios y Formación
        </h2>
        <div ref={studiesListRef} className="flex flex-col gap-4 mt-2">
          {studies.map((item) => (
            <ExperienceCard key={item.id} item={item} tagColor="red" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  item,
  tagColor,
}: {
  item: ExperienceData;
  tagColor: "blue" | "red";
}) {
  const Icon = ICON_MAP[item.iconKey];

  const tagClasses =
    tagColor === "blue"
      ? "text-blue-600 bg-blue-50 border-blue-100"
      : "text-red-600 bg-red-50 border-red-100";

  return (
    <article
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center shadow-sm relative overflow-hidden transition-[box-shadow,border-color,background-color] duration-300 hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#e60012]/50"
      tabIndex={0}
    >
      <div
        className={`w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br ${item.color} rounded flex-shrink-0 flex items-center justify-center border border-white/20 shadow-inner z-10 relative overflow-hidden text-white/90 drop-shadow-md mb-4 sm:mb-0`}
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
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${tagClasses} px-2 py-0.5 rounded mr-auto sm:mr-4 mb-2 sm:mb-0 border`}
          >
            {item.type} • {item.entity}
          </span>
          <span className="text-xs font-bold text-gray-500">{item.date}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 leading-tight mb-2 transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-3xl">
          {item.description}
        </p>
      </div>

      <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#e60012] group-focus:border-[#e60012] rounded-lg pointer-events-none transition-colors duration-200 z-20" />
    </article>
  );
}
