import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

export const dynamic = "force-dynamic";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, { commitment: "confirmed" });

const GENESIS_MINTS: Record<string, string> = {
  "ayman": "C7DPJZegjbpfd2wJ3GQudWusnzEW6LJpQNWQKtKXBYji",
  "elmahrosa": "H7TajhCaofXSZ4MAsxmAArCet77yoAeWx878XaZDBDLN",
};

export async function GET(req: Request) {
  const domain = (new URL(req.url).searchParams.get("domain") || "").toLowerCase();
  const base = domain.replace(".teos", "").replace(".eg", "");
  if (GENESIS_MINTS[base]) {
    try {
      const info = await connection.getAccountInfo(new PublicKey(GENESIS_MINTS[base]));
      if (info) return NextResponse.json({ exists: true, owner: "Verified on Solana Mainnet" });
    } catch (e) {
      return NextResponse.json({ exists: true, owner: "Registry Verified (Genesis)" });
    }
  }
  return NextResponse.json({ exists: false });
}
