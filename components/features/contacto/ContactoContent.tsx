"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function ContactoContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      const menuItems = menuRef.current?.children;
      if (menuItems) {
        tl.fromTo(
          menuItems,
          { x: -30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.08 },
          "-=0.3",
        );
      }

      tl.fromTo(
        contentRef.current,
        { x: 30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col pt-0 pb-4 text-black overflow-y-auto scrollbar-hide"
    >
      <h1
        ref={titleRef}
        className="text-black font-bold text-4xl mb-12 flex items-center mt-2 md:mt-0"
      >
        Contacto
      </h1>

      <h2
        ref={subTitleRef}
        className="text-black font-bold text-lg mb-4 flex items-center mt-2 md:mt-0"
      >
        Ajustes de Contacto
      </h2>

      {/* Layout tipo pantalla de ajustes de Nintendo Switch */}
      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100%-2rem)] w-full gap-4 md:gap-8 p-0 mt-2 overflow-hidden pb-8 md:pb-0">
        {/* Lado izquierdo: Pestañas de métodos de contacto */}
        <div
          ref={menuRef}
          className="w-full md:w-[30%] md:pr-4 flex flex-row md:flex-col gap-2 relative overflow-x-auto scrollbar-hide shrink-0 snap-x"
        >
          <div className="hidden md:block absolute left-[-16px] top-[14px] bottom-auto w-1.5 h-10 bg-[#e60012] z-10 rounded-full" />

          <div className="relative cursor-pointer bg-white border border-transparent ring-[3px] ring-inset ring-[#e60012] px-4 md:p-4 rounded-full md:rounded text-black font-extrabold flex items-center h-10 md:h-14 shrink-0 snap-start">
            <span className="z-10 mx-2 md:ml-2 whitespace-nowrap">
              Mensaje Directo
            </span>
          </div>

          <a
            href="https://www.linkedin.com/in/tu-perfil-aqui/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil de LinkedIn (nueva pestaña)"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded text-black font-bold hover:bg-gray-100 flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2"
          >
            <ArrowUpRight
              size={18}
              className="text-gray-400 group-hover:text-black transition-colors"
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Joakamakaka"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil de GitHub (nueva pestaña)"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded text-black font-bold hover:bg-gray-100 flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2"
          >
            <ArrowUpRight
              size={18}
              className="text-gray-400 group-hover:text-black transition-colors"
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">GitHub</span>
          </a>

          <a
            href="mailto:tu-correo@ejemplo.com"
            aria-label="Enviar correo electrónico"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded text-black font-bold hover:bg-gray-100 flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2"
          >
            <ArrowUpRight
              size={18}
              className="text-gray-400 group-hover:text-black transition-colors"
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">Correo Electrónico</span>
          </a>
        </div>

        {/* Lado derecho: Formulario de contacto */}
        <div ref={contentRef} className="flex-1 py-2 md:px-0 flex flex-col">
          <h3 className="text-xl md:text-[28px] font-extrabold text-gray-800 mb-6 md:mb-8 border-b-2 border-gray-200 pb-2">
            Enviar Mensaje
          </h3>

          <form className="flex flex-col gap-6 w-full max-w-2xl" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                Tu Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="border-2 border-gray-200 rounded-md p-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#e60012] font-bold text-gray-800 transition-colors"
                placeholder="Ej. Mario"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="border-2 border-gray-200 rounded-md p-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#e60012] font-bold text-gray-800 transition-colors"
                placeholder="mario@nintendo.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="border-2 border-gray-200 rounded-md p-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#e60012] font-bold text-gray-800 transition-colors resize-none appearance-none"
                placeholder="¡Hola! Me gustaría conectar..."
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="relative group cursor-pointer bg-white border-2 border-gray-200 text-gray-800 font-extrabold py-3 px-8 rounded-full transition-all hover:border-transparent hover:ring-[3px] hover:ring-inset hover:ring-[#e60012] active:scale-95 flex items-center gap-3"
              >
                <span
                  className="bg-[#e60012] text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-black"
                  aria-hidden="true"
                >
                  X
                </span>
                <span>Enviar Mensaje</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
