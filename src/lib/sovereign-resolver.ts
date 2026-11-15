import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, "confirmed");

// Real Mint Addresses from Solscan (Genesis Phase)
// As more names are minted, their addresses are added here.
const GENESIS_MINTS: Record<string, string> = {
  "ayman": "C7DPJZegjbpfd2wJ3GQudWusnzEW6LJpQNWQKtKXBYji",
  "elmahrosa": "H7TajhCaofXSZ4MAsxmAArCet77yoAeWx878XaZDBDLN",
};

export interface ResolvedIdentity { 
  exists: boolean; 
  owner?: string; 
}

export async function resolveTeosName(domain: string): Promise<ResolvedIdentity> {
  const base = domain.replace(".teos", "").replace(".eg", "").toLowerCase();
  
  // If it's in our Genesis registry, verify it on-chain
  if (GENESIS_MINTS[base]) {
    try {
      const pubKey = new PublicKey(GENESIS_MINTS[base]);
      const accountInfo = await connection.getAccountInfo(pubKey);
      
      // If the account exists on Solana Mainnet, the name is TAKEN
      if (accountInfo) {
        return { exists: true, owner: "Verified on Solana Mainnet" };
      }
    } catch (e) {
      console.error("Solana RPC Error:", e);
    }
  }
  
  // If not in registry or account doesn't exist, it's AVAILABLE
  return { exists: false };
}
