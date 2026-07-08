import type { MasterMaterial } from "@/types/material-library";

let loadPromise: Promise<MasterMaterial[]> | null = null;

export async function loadMaterialLibrarySeed(): Promise<MasterMaterial[]> {
  if (!loadPromise) {
    loadPromise = import("@/lib/mock/material-library-data").then(({ materialLibrarySeed }) =>
      materialLibrarySeed.map((m) => ({ ...m })),
    );
  }
  return loadPromise;
}

export async function ensureMaterialStoreLoaded(): Promise<void> {
  const { initializeMaterialStore, isMaterialStoreInitialized } = await import(
    "@/lib/store/material-store"
  );
  if (isMaterialStoreInitialized()) return;
  const seed = await loadMaterialLibrarySeed();
  initializeMaterialStore(seed);
}
