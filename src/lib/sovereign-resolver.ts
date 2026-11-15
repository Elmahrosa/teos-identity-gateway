export interface ResolvedIdentity { exists: boolean; owner?: string; }
export async function resolveTeosName(domain: string): Promise<ResolvedIdentity> {
  const res = await fetch(/api/resolve?domain=\);
  if (!res.ok) return { exists: false };
  return res.json();
}