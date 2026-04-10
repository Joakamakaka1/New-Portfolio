"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight, Send } from "lucide-react";

export default function ContactoContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(subTitleRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.05, ease: "power2.out" });
      gsap.fromTo(menuRef.current, { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out" });
      gsap.fromTo(contentRef.current, { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out", clearProps: "all" });
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
        Contacto
      </h1>

      <h2
        ref={subTitleRef}
        className="font-bold text-lg mb-4 flex items-center mt-2 md:mt-0"
        style={{ color: "var(--st-on-surface)" }}
      >
        Ajustes de Contacto
      </h2>

      {/* Layout tipo pantalla de ajustes de Nintendo Switch */}
      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100%-2rem)] w-full gap-4 md:gap-8 p-0 mt-2 overflow-hidden pb-8 md:pb-0">
        {/* Left side: Contact method tabs */}
        <div
          ref={menuRef}
          className="w-full md:w-[30%] md:pr-4 flex flex-row md:flex-col gap-2 relative overflow-x-auto scrollbar-hide shrink-0 snap-x"
        >
          <div
            className="hidden md:block absolute left-[-16px] top-[14px] bottom-auto w-1.5 h-10 rounded-full z-10"
            style={{ background: "var(--st-primary-container)" }}
          />

          <div
            className="relative cursor-pointer px-4 md:p-4 rounded-full md:rounded-lg font-extrabold flex items-center h-10 md:h-14 shrink-0 snap-start st-card"
            style={{
              outline: "3px solid var(--st-primary-container)",
              outlineOffset: "-3px",
              color: "var(--st-on-surface)",
            }}
          >
            <span className="z-10 mx-2 md:ml-2 whitespace-nowrap">
              Mensaje Directo
            </span>
          </div>

          <a
            href="https://www.linkedin.com/in/tu-perfil-aqui/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil de LinkedIn (nueva pestaña)"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded-lg font-bold flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2 hover:bg-[var(--st-surface-container)]"
            style={{ color: "var(--st-on-surface)" }}
          >
            <ArrowUpRight
              size={18}
              className="opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--st-on-surface-variant)" }}
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Joakamakaka1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil de GitHub (nueva pestaña)"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded-lg font-bold flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2 hover:bg-[var(--st-surface-container)]"
            style={{ color: "var(--st-on-surface)" }}
          >
            <ArrowUpRight
              size={18}
              className="opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--st-on-surface-variant)" }}
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">GitHub</span>
          </a>

          <a
            href="mailto:tu-correo@ejemplo.com"
            aria-label="Enviar correo electrónico"
            className="relative group cursor-pointer px-4 md:p-4 rounded-full md:rounded-lg font-bold flex items-center h-10 md:h-14 transition-colors shrink-0 snap-start gap-2 hover:bg-[var(--st-surface-container)]"
            style={{ color: "var(--st-on-surface)" }}
          >
            <ArrowUpRight
              size={18}
              className="opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--st-on-surface-variant)" }}
              aria-hidden="true"
            />
            <span className="z-10 whitespace-nowrap">Correo Electrónico</span>
          </a>
        </div>

        {/* Right side: Contact form */}
        <div ref={contentRef} className="flex-1 py-2 md:px-0 flex flex-col">
          <h3
            className="text-xl md:text-[28px] font-extrabold mb-6 md:mb-8 pb-2"
            style={{
              color: "var(--st-on-surface)",
              borderBottom: "2px solid var(--st-surface-container)",
            }}
          >
            Enviar Mensaje
          </h3>

          <form className="flex flex-col gap-6 w-full max-w-2xl" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--st-on-surface-variant)" }}
              >
                Tu Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="rounded-lg p-3 font-bold transition-colors outline-none"
                style={{
                  background: "var(--st-surface-container-low)",
                  color: "var(--st-on-surface)",
                  border: "2px solid var(--st-surface-container)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-primary-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-lowest)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--st-primary-fixed)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-surface-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-low)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="Ej. Mario"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--st-on-surface-variant)" }}
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-lg p-3 font-bold transition-colors outline-none"
                style={{
                  background: "var(--st-surface-container-low)",
                  color: "var(--st-on-surface)",
                  border: "2px solid var(--st-surface-container)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-primary-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-lowest)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--st-primary-fixed)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-surface-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-low)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="mario@nintendo.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--st-on-surface-variant)" }}
              >
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="rounded-lg p-3 font-bold transition-colors resize-none appearance-none outline-none"
                style={{
                  background: "var(--st-surface-container-low)",
                  color: "var(--st-on-surface)",
                  border: "2px solid var(--st-surface-container)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-primary-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-lowest)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--st-primary-fixed)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--st-surface-container)";
                  e.currentTarget.style.background = "var(--st-surface-container-low)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="¡Hola! Me gustaría conectar..."
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="group cursor-pointer font-extrabold py-3 px-8 rounded-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3"
                style={{
                  background: "var(--st-primary)",
                  color: "var(--st-on-primary)",
                  boxShadow: "0 4px 14px rgba(183, 0, 12, 0.3)",
                }}
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
