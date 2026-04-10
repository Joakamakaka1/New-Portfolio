export default function Footer() {
  return (
    <footer
      className="hidden md:flex h-14 w-full items-center justify-center px-6 flex-shrink-0 z-10"
      style={{ background: "var(--st-surface)" }}
    >
      <p
        className="text-[10px] font-bold tracking-[0.15em] uppercase"
        style={{ color: "var(--st-on-surface-variant)" }}
      >
        © {new Date().getFullYear()} Joaquin Castro Salas
      </p>
    </footer>
  );
}
