"use client";
import { useState } from "react";
import { resolveTeosName } from "@/lib/sovereign-resolver";
import { NAMESPACES, REGION_PRICES, type Region } from "@/lib/namespaces";

const TIERS = ["1 char", "2 chars", "3 chars", "4 chars", "5+ chars"];

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("eg");
  const [status, setStatus] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [connected, setConnected] = useState(false);

  const selected = NAMESPACES.find((n) => n.code === code) || NAMESPACES[0];
  const prices = REGION_PRICES[selected.region as Region];

  const onSearch = async () => {
    if (!name) return;
    setStatus("CHECKING...");
    const r = await resolveTeosName(name + ".teos");
    if (r.exists) { setStatus("TAKEN"); setCheckout(false); }
    else { setStatus("AVAILABLE"); if (connected) setCheckout(true); }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-4 right-4 z-50">
        <button onClick={() => setConnected((c) => !c)}
          className="bg-amber-600 text-black font-bold px-4 py-2 rounded">
          {connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 to-red-700 text-center py-2 text-xs tracking-widest">
        LIVE FROM ALEXANDRIA · TEOS IDENTITY GATEWAY
      </div>

      <div className="px-6 pt-12 text-center">
        <h1 className="text-4xl text-amber-500 font-bold tracking-wider">TEOS SOVEREIGN ROOT</h1>
        <p className="text-slate-300 mt-4">yourname.teos is your root key. Country namespaces open soon.</p>

        <div className="max-w-md mx-auto mt-10 border border-amber-700/50 bg-[#12100c] rounded p-6">
          <input value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Search your name"
            className="w-full p-3 text-black rounded mb-4 bg-[#e8dcc0] font-semibold" />
          <select value={code} onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 mb-4 bg-[#1c1a16] text-white rounded border border-slate-700">
            {NAMESPACES.map((n) => (
              <option key={n.code} value={n.code}>{n.flag} {n.name} (.{n.code})</option>
            ))}
          </select>

          <button onClick={onSearch}
            className="w-full bg-gradient-to-b from-amber-500 to-amber-700 text-black font-bold p-3 rounded">
            Reserve Your Name
          </button>
          <p className="mt-4 text-center text-amber-500 font-semibold">{status}</p>
          {status === "AVAILABLE" && !connected && (
            <p className="mt-2 text-center text-xs text-slate-400">Connect your wallet to continue.</p>
          )}
        </div>

        <div className="max-w-md mx-auto mt-10 border-2 border-amber-600 rounded p-6 bg-[#12100c]">
          <h3 className="text-amber-500 text-2xl tracking-widest text-center mb-6">TEOS ROOT</h3>
          {[["1 char","$2,000"],["2 chars","$600"],["3 chars","$180"],["4 chars","$80"],["5+ chars","$30"]].map((t,i)=>(
            <div key={i} className="flex justify-between border-b border-slate-800 py-3">
              <span className="text-slate-300">{t[0]}</span><span className="text-amber-400 font-bold">{t[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {checkout && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#12100c] border border-amber-700/60 rounded p-8 max-w-sm w-full">
            <h3 className="text-amber-500 tracking-widest mb-6 text-center">
              CHECKOUT - {selected.flag} .{selected.code.toUpperCase()} ({selected.region})
            </h3>
            <div className="space-y-3 mb-6">
              {TIERS.map((t, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{t}</span><span className="text-amber-400">${prices[i].toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setCheckout(false)} className="w-full bg-amber-600 text-black font-bold py-3 rounded">
              Submit Reservation Request
            </button>
          </div>
        </div>
      )}

      <footer className="mt-20 px-6 py-12 text-center text-xs text-slate-500 border-t border-amber-700/30">
        <p className="text-amber-500 tracking-widest mb-4">FOUNDER TEOS - ALEXANDRIA EGYPT</p>
        <p className="max-w-2xl mx-auto leading-relaxed mb-4">
          TEOS names are digital identities inside the TEOS system on Solana. They are not internet TLDs,
          not the official domains of any country or government entity, and have no affiliation with ICANN
          or any national registry. Country codes such as .EG are internal namespace labels within TEOS only.
        </p>
        <p>(c) 2026 Elmahrosa International - elmahrosa.org</p>
      </footer>
    </div>
  );
}