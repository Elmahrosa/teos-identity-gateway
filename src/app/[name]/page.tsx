import { resolveTeosName } from "@/lib/sovereign-resolver";

export default async function SovereignProfile({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const displayName = (name || "name").toUpperCase();
  const id = await resolveTeosName(name + ".teos");
  
  // تحديد الحالة بناءً على نتيجة المحلل
  const isMinted = id.exists && id.owner?.includes("Mainnet");
  const isGenesis = id.exists && id.owner?.includes("Genesis");
  const statusText = isMinted ? "Sovereign Identity — Verified on Solana Mainnet" : 
                     isGenesis ? "Sovereign Identity — Genesis Registered" : 
                     "Namespace Available for Sovereign Claim";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6">
      {/* الختم السيادي */}
      <div className="w-28 h-28 rounded-full bg-gradient-to-b from-red-900 to-black border-2 border-amber-600 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
        🔱
      </div>

      {/* الاسم والحالة */}
      <h1 className="text-5xl sm:text-6xl tracking-[0.15em] text-amber-500 font-bold mt-8 text-center">
        {displayName}.TEOS
      </h1>
      <p className="mt-4 text-sm tracking-widest uppercase text-slate-400 text-center max-w-lg">
        {statusText}
      </p>

      {/* بطاقة الهوية السيادية */}
      <div className="mt-10 max-w-md w-full border border-amber-700/40 bg-[#12100c] rounded-xl p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl text-white font-semibold">Ayman Seif</h2>
          <p className="text-amber-500 text-sm mt-1 tracking-wide">Founder, Elmahrosa International</p>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed">
            Building sovereign digital infrastructure from Alexandria, Egypt. 
            Law over Code. Human authority over autonomous execution.
          </p>
        </div>

        {/* روابط التواصل */}
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">X / Twitter</a>
          <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">LinkedIn</a>
          <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">GitHub</a>
        </div>

        {/* شارة ميزة "انسخ موقعك" (للعرض التوضيحي) */}
        <div className="mt-8 pt-6 border-t border-amber-700/30">
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 py-2 px-4 rounded-full mx-auto w-fit border border-emerald-800/50">
            <span>⚡</span>
            <span>Powered by TEOS Sovereign Builder (Clone Ready)</span>
          </div>
        </div>
      </div>

      {/* التذييل القانوني */}
      <footer className="mt-16 text-[10px] tracking-widest text-slate-600 uppercase text-center max-w-2xl px-4">
        <p className="mb-2">Law Over Code • Dig Site 022 Alexandria</p>
        <p>
          TEOS names are digital identities inside the TEOS system on Solana. 
          They are not internet TLDs, not official domains of any country, 
          and have no affiliation with ICANN or any national registry.
        </p>
        <p className="mt-4 text-slate-700">© 2026 Elmahrosa International — elmahrosa.org</p>
      </footer>
    </div>
  );
}