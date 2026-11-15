export interface ResolvedIdentity { exists: boolean; owner?: string; }

export async function resolveTeosName(domain: string): Promise<ResolvedIdentity> {
  const res = await fetch(`/api/resolve?domain=${encodeURIComponent(domain)}`);
  if (!res.ok) throw new Error("TEOS resolver unavailable");
  return res.json();
}
