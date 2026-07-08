import { ensureMaterialStoreLoaded } from "@/lib/materials/material-loader.server";
import { getAllMasterMaterials } from "@/lib/store/material-store";
import type { Material } from "@/types";

export async function getLegacyMaterials(): Promise<Material[]> {
  await ensureMaterialStoreLoaded();
  return getAllMasterMaterials().map((m) => ({
    id: m.id,
    name: m.name,
    category: m.legacyCategory,
    supplier: m.supplier,
    unit: m.unit,
    currentPrice: m.currentPrice,
    previousPrice: m.previousPrice,
    availability: m.availability === "made_to_order" ? "low_stock" : m.availability,
    stock: m.stockQuantity,
    projectIds: m.projectIds,
  }));
}
