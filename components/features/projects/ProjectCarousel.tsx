"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { horizontalLoop } from "@/lib/utils/gsapHelpers";
import { Project } from "@/types";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);

  // Duplicamos los proyectos para el loop infinito
  const duplicatedProjects = [...projects, ...projects];

  useGSAP(
    () => {
      const slides = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!slides.length || !trackRef.current) return;

      gsap.set(
        slides.map((s) => s.querySelector(".card-inner")),
        { scale: 0.85, opacity: 0.4, filter: "blur(4px)" },
      );
      gsap.set(
        slides.map((s) => s.querySelector(".card-content")),
        { opacity: 0 },
      );

      gsap.set(trackRef.current, { overflow: "visible" });

      const gapSize = 8;

      loopRef.current = horizontalLoop(slides, {
        paused: true,
        paddingRight: gapSize,
        center: true,
        onChange: (slide: HTMLElement, index: number) => {
          const realIndex = index % projects.length;
          setActiveIndex(realIndex);

          const inners = slides.map((s) => s.querySelector(".card-inner"));
          const contents = slides.map((s) => s.querySelector(".card-content"));

          gsap.to(inners, {
            scale: 0.85,
            opacity: 0.5,
            filter: "blur(2px)",
            transformOrigin: "bottom center",
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(contents, { opacity: 0, duration: 0.2, overwrite: "auto" });

          gsap.to(slide.querySelector(".card-inner"), {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transformOrigin: "bottom center",
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.fromTo(
            slide.querySelector(".card-content"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 },
          );
        },
      });

      loopRef.current.toIndex(0, { duration: 0 });
    },
    { scope: containerRef, dependencies: [projects] },
  );

  const prevProject = () =>
    loopRef.current?.previous({ duration: 0.7, ease: "power3.inOut" });
  const nextProject = () =>
    loopRef.current?.next({ duration: 0.7, ease: "power3.inOut" });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects]);

  return (
    <div
      className="w-full flex flex-col h-max overflow-visible"
      ref={containerRef}
    >
      <div className="relative w-full min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden rounded-[24px]">
        <div
          ref={trackRef}
          className="w-full flex gap-2 md:gap-2 items-center h-full py-8"
        >
          {duplicatedProjects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() =>
                loopRef.current?.toIndex(i, {
                  duration: 0.7,
                  ease: "power3.inOut",
                })
              }
              className="flex-shrink-0 w-[85vw] sm:w-[80vw] md:w-[55vw] xl:w-[50vw] max-h-full aspect-[4/5] sm:aspect-video relative cursor-pointer"
            >
              <div
                className="card-inner w-full h-full relative rounded-[16px] md:rounded-[24px] overflow-hidden drop-shadow-2xl border-[4px] md:border-[6px] transition-colors duration-300"
                style={{
                  borderColor:
                    activeIndex === i % projects.length
                      ? "#e60012"
                      : "transparent",
                }}
              >
                <Image
                  src={project.images[0] || "/placeholder.png"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, 55vw"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="card-content absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 text-white flex flex-col gap-2 sm:gap-3 md:gap-4">
                  <h2 className="font-extrabold text-2xl sm:text-3xl md:text-5xl drop-shadow-lg leading-tight line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl drop-shadow-md font-medium line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full flex items-center shadow-lg whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full flex items-center shadow-lg whitespace-nowrap">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop arrows (hidden on mobile, inside image container) */}
        <button
          onClick={prevProject}
          aria-label="Proyecto anterior"
          className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 z-50 w-16 h-16 items-center justify-center bg-black/40 backdrop-blur-md text-white border-2 border-white/20 rounded-full hover:bg-[#e60012] hover:border-transparent hover:scale-110 transition-all shadow-xl"
        >
          <ChevronLeft className="w-10 h-10" aria-hidden="true" />
        </button>

        <button
          onClick={nextProject}
          aria-label="Proyecto siguiente"
          className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 z-50 w-16 h-16 items-center justify-center bg-black/40 backdrop-blur-md text-white border-2 border-white/20 rounded-full hover:bg-[#e60012] hover:border-transparent hover:scale-110 transition-all shadow-xl"
        >
          <ChevronRight
            className="w-10 h-10"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile controls: arrows + dots */}
      <div className="flex md:hidden justify-center items-center gap-6 py-4 z-10 shrink-0 mt-4">
        <button
          onClick={prevProject}
          aria-label="Proyecto anterior"
          className="w-12 h-12 flex items-center justify-center bg-white text-gray-800 border-2 border-gray-200 rounded-full active:bg-[#e60012] active:text-white transition-all shadow-md focus:outline-none"
        >
          <ChevronLeft className="w-8 h-8" aria-hidden="true" />
        </button>

        <div className="flex justify-center items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#e60012]" : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          aria-label="Proyecto siguiente"
          className="w-12 h-12 flex items-center justify-center bg-white text-gray-800 border-2 border-gray-200 rounded-full active:bg-[#e60012] active:text-white transition-all shadow-md focus:outline-none"
        >
          <ChevronRight className="w-8 h-8" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop dots */}
      <div className="hidden md:flex justify-center items-center gap-3 py-2 z-10 shrink-0">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-10 bg-[#e60012]" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
