"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ProjectCarousel from "@/components/features/projects/ProjectCarousel";
import type { Project } from "@/types";

interface ProyectosContentProps {
  projects: Project[];
}

  export default function ProyectosContent({ projects }: ProyectosContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const carouselContainerRef = useRef<HTMLDivElement>(null);
  
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 0.5 },
        });

        tl.fromTo(
          titleRef.current,
          { y: -40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
        );

        tl.fromTo(
          carouselContainerRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            clearProps: "all",
          },
          "-=0.1",
        );
      }, containerRef);
      return () => ctx.revert();
    }, []);
  
    return (
      <div 
        ref={containerRef}
        className="h-full w-full flex flex-col pt-0 pb-4 overflow-y-auto scrollbar-hide text-black"
      >
        <h1
          ref={titleRef}
          className="text-black font-bold text-4xl mb-12 flex items-center mt-2 md:mt-0"
        >
          Mis proyectos
        </h1>
  
        <div ref={carouselContainerRef} className="w-full flex flex-col h-max">
          <ProjectCarousel projects={projects} />
        </div>
      </div>
    );
  }
