"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { resolveTeosName } from "@/lib/sovereign-resolver";

export default function SovereignProfile() {
  const params = useParams();
  const name = String(params?.name || "name").toLowerCase();
  const [id, setId] = useState<{exists:boolean;owner?:string}|null>(null);
  
  useEffect(() => { 
    resolveTeosName(name + ".teos").then(setId).catch(() => setId({exists:false})); 
  }, [name]);

  const status = !id ? "CHECKING SOVEREIGNTY..." : 
    (id.owner?.includes("Mainnet") ? "Verified on Solana Mainnet" : 
    (id.owner?.includes("Genesis") ? "Genesis Registered" : "Available for Claim"));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-24 h-24 rounded-full bg-red-900 border-2 border-amber-600 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">🔱</div>
      <h1 className="text-5xl text-amber-500 font-bold mt-6 tracking-widest">{name.toUpperCase()}.TEOS</h1>
      <p className="text-slate-400 mt-2 text-sm tracking-widest">{status}</p>
      
      <div className="mt-8 max-w-md w-full border border-amber-700/40 bg-[#12100c] rounded-xl p-6 text-center shadow-2xl">
        <h2 className="text-xl text-white font-semibold">Ayman Seif</h2>
        <p className="text-amber-500 text-xs mt-1">Founder, Elmahrosa International</p>
        <p className="text-slate-400 text-sm mt-4">Building sovereign digital infrastructure from Alexandria, Egypt. Law over Code.</p>
        
        <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
          <a href="#" className="hover:text-amber-500 underline">X</a>
          <a href="#" className="hover:text-amber-500 underline">LinkedIn</a>
          <a href="#" className="hover:text-amber-500 underline">GitHub</a>
        </div>
        
        <div className="mt-6 pt-4 border-t border-amber-700/30">
          <span className="text-xs text-emerald-400 bg-emerald-950/30 py-1 px-3 rounded-full border border-emerald-800/50">⚡ Powered by TEOS Sovereign Builder (Clone Ready)</span>
        </div>
      </div>

      <footer className="mt-12 text-[10px] text-slate-600 text-center max-w-lg px-4">
        <p>TEOS names are digital identities on Solana, not internet TLDs. No affiliation with ICANN.</p>
        <p className="mt-2">© 2026 Elmahrosa International</p>
      </footer>
    </div>
  );
}