import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, { commitment: "confirmed" });

const GENESIS_MINTS: Record<string, string> = {
  "ayman": "C7DPJZegjbpfd2wJ3GQudWusnzEW6LJpQNWQKtKXBYji",
  "elmahrosa": "H7TajhCaofXSZ4MAsxmAArCet77yoAeWx878XaZDBDLN",
};

export interface ResolvedIdentity { exists: boolean; owner?: string; }

export async function resolveTeosName(domain: string): Promise<ResolvedIdentity> {
  const base = domain.replace(".teos", "").replace(".eg", "").toLowerCase();
  if (GENESIS_MINTS[base]) {
    try {
      const pubKey = new PublicKey(GENESIS_MINTS[base]);
      const info = await connection.getAccountInfo(pubKey);
      if (info) return { exists: true, owner: "Verified on Solana Mainnet" };
    } catch (e) {
      console.warn("[TEOS] RPC blocked (CORS/403). Trusting Genesis registry.");
    }
    return { exists: true, owner: "Registry Verified (Genesis)" };
  }
  return { exists: false };
}
