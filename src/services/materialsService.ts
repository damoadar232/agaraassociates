import { ensureMaterialStoreLoaded } from "@/lib/materials/material-loader.server";
import {
  addMaterial,
  archiveMaterial,
  filterMasterMaterials,
  getAllMasterMaterials,
  getCategoryMaterialCounts,
  getAllSubcategoryMaterialCounts,
  getMaterialStats,
  getUniqueBrands,
  getUniqueVendors,
  importMaterials,
  paginateMaterials,
  toggleMaterialFavorite,
  updateMaterial,
} from "@/lib/store/material-store";
import { MATERIAL_CATEGORIES } from "@/lib/materials/categories";
import { priceTrends, materialAlternatives } from "@/lib/mock/materials-meta";
import type { MaterialLibraryFilters } from "@/types/material-library";
import type { MaterialFormInput } from "@/lib/store/material-store";

async function ensureLoaded() {
  await ensureMaterialStoreLoaded();
}

export async function getMaterialMeta() {
  await ensureLoaded();
  return {
    stats: getMaterialStats(),
    brands: getUniqueBrands(),
    vendors: getUniqueVendors(),
    categoryCounts: getCategoryMaterialCounts(),
    subcategoryCounts: getAllSubcategoryMaterialCounts(),
    priceTrends,
    alternatives: materialAlternatives,
  };
}

export async function getMaterialsPage(filters: MaterialLibraryFilters, page: number, limit: number) {
  await ensureLoaded();
  const filtered = filterMasterMaterials(filters);
  const paginated = paginateMaterials(filtered, page, limit);
  return {
    materials: paginated.items,
    meta: {
      page: paginated.page,
      limit: paginated.limit,
      total: paginated.total,
      totalPages: paginated.totalPages,
    },
  };
}

export async function getCompactMaterials() {
  await ensureLoaded();
  return getAllMasterMaterials().map((material) => ({
    id: material.id,
    sku: material.sku,
    name: material.name,
    categoryId: material.categoryId,
    subcategoryId: material.subcategoryId,
    brand: material.brand,
    supplier: material.supplier,
    unit: material.unit,
    currentPrice: material.currentPrice,
    previousPrice: material.previousPrice,
    gst: material.gst,
    availability: material.availability,
    usageCount: material.usageCount,
    isFavorite: material.isFavorite,
  }));
}

export async function addMaterialRecord(input: MaterialFormInput) {
  await ensureLoaded();
  return addMaterial(input);
}

export async function updateMaterialRecord(id: string, patch: Partial<MaterialFormInput>) {
  await ensureLoaded();
  return updateMaterial(id, patch);
}

export async function importMaterialRecords(rows: MaterialFormInput[]) {
  await ensureLoaded();
  return importMaterials(rows);
}

export async function archiveMaterialRecord(id: string) {
  await ensureLoaded();
  archiveMaterial(id);
}

export async function toggleMaterialFavoriteRecord(id: string) {
  await ensureLoaded();
  return toggleMaterialFavorite(id);
}

export { MATERIAL_CATEGORIES };
