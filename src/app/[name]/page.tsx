"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { resolveTeosName } from "@/lib/sovereign-resolver";

function SovereignProfileContent() {
  const params = useParams();
  const name = String(params?.name || "name").toLowerCase();
  const [id, setId] = useState<{exists:boolean;owner?:string}|null>(null);

  useEffect(() => {
    resolveTeosName(name + ".teos").then(setId).catch(() => setId({exists:false}));
  }, [name]);

  const status = !id
    ? "Resolving identity..."
    : id.owner?.includes("Mainnet")
    ? "Verified on Solana Mainnet"
    : id.owner?.includes("Genesis")
    ? "Verified in Genesis Registry"
    : "Identity available for reservation";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-red-900 to-black border-2 border-amber-600 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-6">
        <span aria-hidden="true">ID</span>
      </div>

      <h1 className="text-4xl sm:text-5xl text-amber-500 font-bold mt-2 tracking-wider text-center">
        {name.toUpperCase()}.TEOS
      </h1>
      <p className="text-slate-400 mt-3 text-sm tracking-wide text-center max-w-lg">{status}</p>

      <div className="mt-8 max-w-md w-full border border-amber-700/40 bg-[#12100c] rounded-xl p-6 text-center shadow-2xl">
        <h2 className="text-xl text-white font-semibold">Sovereign Digital Identity</h2>
        <p className="text-amber-500 text-xs mt-2 font-medium">Identity · Ownership · Verification</p>
        <p className="text-slate-300 text-sm mt-5 leading-relaxed">
          This profile represents a TEOS digital identity name. TEOS names are internal digital identities
          within the TEOS system on Solana, not internet TLDs and not official domains of any government.
        </p>
        <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">Reserve a name</Link>
          <a href="https://elmahrosa.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">Elmahrosa</a>
        </div>
      </div>

      <footer className="mt-12 text-[10px] text-slate-600 text-center max-w-lg px-4 leading-relaxed">
        <p className="mb-2">
          TEOS names are digital identities inside the TEOS system on Solana. They are not internet TLDs,
          and have no affiliation with ICANN or any national registry.
        </p>
        <p className="mt-3 text-slate-700">© 2026 Elmahrosa International</p>
      </footer>
    </div>
  );
}

export default function SovereignProfile() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <SovereignProfileContent />
    </Suspense>
  );
}
