export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-8 px-4 text-center text-xs text-white/40 z-10 relative">
      <div className="max-w-5xl mx-auto flex sm:flex-row justify-between items-center text-xs text-white/50">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-white/80 font-medium tracking-tight">© 2026 Erlangga</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>S1 Teknik Informatika UNESA</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> All Systems Normal
          </span>
          <a href="#home" className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all flex items-center gap-1.5 font-medium">
            <span>Back to top</span>
            <span>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}