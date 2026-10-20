/** Optional: verified certificates only; empty by design. */
export type Certificate = { name: string; issuer: string; year?: string; url?: string };
export const certificates: Certificate[] = [];
