const GENESIS_MINTED = new Set([
  "ayman","elmahrosa","ahmed","amira","anas","ehab","ekram",
  "lareen","layan","rovan","salma","soha","sohayb",
]);

export interface ResolvedIdentity { exists: boolean; owner?: string; }

export async function resolveTeosName(domain: string): Promise<ResolvedIdentity> {
  const base = domain.replace(".teos", "").replace(".eg", "").toLowerCase();
  if (GENESIS_MINTED.has(base)) {
    return { exists: true, owner: "5qMY...gjcT" };
  }
  return { exists: false };
}
