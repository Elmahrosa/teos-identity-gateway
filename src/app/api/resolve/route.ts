import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, { commitment: "confirmed" });
const TEOS_PROGRAM_ID = new PublicKey("H7TajhCaofXSZ4MAsxmAArCet77yoAeWx878XaZDBDLN");

const GENESIS_MINTED = new Set([
  "ayman","elmahrosa","ahmed","amira","anas","ehab","ekram",
  "lareen","layan","rovan","salma","soha","sohayb",
]);

export async function GET(req: Request) {
  console.log("[TEOS] Resolver called for:", req.url);
  const domain = (new URL(req.url).searchParams.get("domain") || "").toLowerCase().trim();
  const base = domain.replace(".teos", "").replace(".eg", "");
  if (!base) return NextResponse.json({ exists: false, reason: "empty" });

  try {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("teos"), Buffer.from(base)],
      TEOS_PROGRAM_ID
    );
    console.log("[TEOS] Derived PDA:", pda.toBase58());
    const info = await connection.getAccountInfo(pda);
    if (info && info.data && info.data.length > 0) {
      return NextResponse.json({ exists: true, owner: "Verified on Solana Mainnet", pda: pda.toBase58() });
    }
    return NextResponse.json({ exists: false, pda: pda.toBase58() });
  } catch (e: any) {
    console.error("[TEOS] PDA Error Details:", e.message || e);
  }

  if (GENESIS_MINTED.has(base)) {
    return NextResponse.json({ exists: true, owner: "Registry Verified (Genesis)" });
  }
  return NextResponse.json({ exists: false, reason: "rpc-unreachable" });
}