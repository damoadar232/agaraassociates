import type { ApiResponse } from "@/types";

const BASE = import.meta.env.VITE_API_URL ?? "";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json: ApiResponse<T> = await res.json();
  return json.data;
}
