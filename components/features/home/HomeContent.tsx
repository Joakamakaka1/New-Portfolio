"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface HomeContentProps {
  news: NewsItem[];
}

export default function HomeContent({ news }: HomeContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

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

      const newsCards = newsRef.current?.children;
      if (newsCards) {
        tl.fromTo(
          newsCards,
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

      <div className="w-full min-h-[420px] bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex flex-col justify-end p-6 mb-8 relative overflow-hidden border border-gray-100">
        <div
          ref={greetingRef}
          className="bg-white p-5  max-w-xl w-full shadow-lg border-l-4 border-[#e60012] z-10"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
            ¡Hola, soy Joaquin Castro!
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
            Apasionado por la tecnología y su impacto. Desarrollador Fullstack
            especializado en Frontend y Backend. Bienvenido a mi portfolio
            interactivo.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 z-0 pointer-events-none"></div>
      </div>

      <h2
        ref={subTitleRef}
        className="text-black font-bold text-lg mb-4 flex items-center"
      >
        Novedades y Anuncios
      </h2>

      <div
        ref={newsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 mt-4"
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer bg-white rounded-xl p-4 flex flex-col shadow-sm border border-gray-200 hover:border-transparent hover:ring-[3px] hover:ring-inset hover:ring-[#e60012] relative overflow-hidden transition-[box-shadow,border-color,background-color] duration-300"
          >
            <div className="relative group w-full aspect-video overflow-hidden mb-3 flex-shrink-0">
              <Image
                src={item.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                <h4 className="text-white font-extrabold tracking-wide text-lg text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                  ¡Lee la noticia!
                </h4>
              </div>
            </div>

            <h3 className="font-bold text-gray-800 text-sm transition-colors duration-300">
              {item.title}
            </h3>
            <span className="text-xs font-bold text-gray-500 mt-1 tracking-wide">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
