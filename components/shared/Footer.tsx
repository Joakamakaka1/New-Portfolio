export default function Footer() {
  return (
    <footer className="hidden md:flex h-16 w-full bg-white items-center justify-start px-6 md:px-16 flex-shrink-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-bold group-hover:bg-[#e60012] transition-colors shadow-sm relative">
            {/* Glow effect on hover matching Switch styling */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(230,0,18,0.5)] opacity-0"></div>
            B
          </div>
          <span className="text-gray-600 font-extrabold tracking-wide text-sm group-hover:text-gray-900">
            Atrás
          </span>
        </div>

        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-bold group-hover:bg-[#e60012] transition-colors shadow-sm relative">
            <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(230,0,18,0.5)] opacity-0"></div>
            A
          </div>
          <span className="text-gray-600 font-extrabold tracking-wide text-sm group-hover:text-gray-900">
            Confirmar
          </span>
        </div>
      </div>
    </footer>
  );
}
