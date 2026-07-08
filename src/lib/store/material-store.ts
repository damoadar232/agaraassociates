import type { MasterMaterial, MaterialLibraryFilters } from "@/types/material-library";

let materials: MasterMaterial[] | null = null;

export function isMaterialStoreInitialized(): boolean {
  return materials !== null;
}

export function initializeMaterialStore(seed: MasterMaterial[]): void {
  if (!materials) {
    materials = seed.map((m) => ({ ...m }));
  }
}

function requireMaterials(): MasterMaterial[] {
  if (!materials) {
    throw new Error(
      "Material store not initialized. Call ensureMaterialStoreLoaded() on the server first.",
    );
  }
  return materials;
}

export function getAllMasterMaterials(includeArchived = false) {
  const list = requireMaterials();
  return includeArchived ? list : list.filter((m) => !m.archived);
}

export function getMasterMaterialById(id: string) {
  return requireMaterials().find((m) => m.id === id);
}

export function getMasterMaterialBySku(sku: string) {
  return requireMaterials().find((m) => m.sku.toLowerCase() === sku.toLowerCase());
}

export function toggleMaterialFavorite(id: string) {
  materials = requireMaterials().map((m) =>
    m.id === id ? { ...m, isFavorite: !m.isFavorite } : m,
  );
  return getMasterMaterialById(id);
}

export function archiveMaterial(id: string) {
  materials = requireMaterials().map((m) => (m.id === id ? { ...m, archived: true } : m));
}

export function incrementMaterialUsage(id: string) {
  materials = requireMaterials().map((m) =>
    m.id === id
      ? {
          ...m,
          usageCount: m.usageCount + 1,
          lastUsedAt: new Date().toISOString().split("T")[0],
        }
      : m,
  );
}

export function getUniqueBrands() {
  return [...new Set(getAllMasterMaterials().map((m) => m.brand))].sort();
}

export function getUniqueVendors() {
  const names = new Set<string>();
  getAllMasterMaterials().forEach((m) => {
    m.vendors.forEach((v) => names.add(v.name));
    names.add(m.supplier);
  });
  return [...names].sort();
}

export function filterMasterMaterials(filters: MaterialLibraryFilters): MasterMaterial[] {
  let result = getAllMasterMaterials();

  if (filters.quickFilter === "favorites") {
    result = result.filter((m) => m.isFavorite);
  } else if (filters.quickFilter === "recent") {
    result = result
      .filter((m) => m.lastUsedAt)
      .sort((a, b) => (b.lastUsedAt ?? "").localeCompare(a.lastUsedAt ?? ""));
  } else if (filters.quickFilter === "frequent") {
    result = [...result].sort((a, b) => b.usageCount - a.usageCount);
  }

  if (filters.categoryId) {
    result = result.filter((m) => m.categoryId === filters.categoryId);
  }
  if (filters.subcategoryId) {
    result = result.filter((m) => m.subcategoryId === filters.subcategoryId);
  }
  if (filters.brands.length > 0) {
    result = result.filter((m) => filters.brands.includes(m.brand));
  }
  if (filters.vendors.length > 0) {
    result = result.filter((m) =>
      filters.vendors.some(
        (v) => m.supplier === v || m.vendors.some((mv) => mv.name === v),
      ),
    );
  }
  if (filters.availability.length > 0) {
    result = result.filter((m) => filters.availability.includes(m.availability));
  }
  if (filters.priceMin != null) {
    result = result.filter((m) => m.currentPrice >= filters.priceMin!);
  }
  if (filters.priceMax != null) {
    result = result.filter((m) => m.currentPrice <= filters.priceMax!);
  }
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.sku.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.supplier.toLowerCase().includes(q) ||
        m.specification?.toLowerCase().includes(q),
    );
  }

  return result;
}

export function getMaterialStats() {
  const active = getAllMasterMaterials();
  return {
    total: active.length,
    inStock: active.filter((m) => m.availability === "in_stock").length,
    lowStock: active.filter((m) => m.availability === "low_stock").length,
    favorites: active.filter((m) => m.isFavorite).length,
    brands: getUniqueBrands().length,
    vendors: getUniqueVendors().length,
  };
}

export function getMaterialsByCategory(categoryId: string) {
  return getAllMasterMaterials().filter((m) => m.categoryId === categoryId);
}

export function getMaterialsBySubcategory(categoryId: string, subcategoryId: string) {
  return getAllMasterMaterials().filter(
    (m) => m.categoryId === categoryId && m.subcategoryId === subcategoryId,
  );
}

export function getCategoryMaterialCounts() {
  const counts: Record<string, number> = {};
  getAllMasterMaterials().forEach((m) => {
    counts[m.categoryId] = (counts[m.categoryId] ?? 0) + 1;
  });
  return counts;
}

export function getSubcategoryMaterialCounts(categoryId: string) {
  const counts: Record<string, number> = {};
  getMaterialsByCategory(categoryId).forEach((m) => {
    counts[m.subcategoryId] = (counts[m.subcategoryId] ?? 0) + 1;
  });
  return counts;
}

export type MaterialFormInput = Pick<
  MasterMaterial,
  | "name"
  | "sku"
  | "categoryId"
  | "subcategoryId"
  | "brand"
  | "supplier"
  | "unit"
  | "currentPrice"
  | "gst"
  | "specification"
  | "availability"
> & { previousPrice?: number };

export function addMaterial(input: MaterialFormInput): MasterMaterial {
  const id = `ml-${Date.now()}`;
  const material: MasterMaterial = {
    id,
    sku: input.sku,
    name: input.name,
    categoryId: input.categoryId,
    subcategoryId: input.subcategoryId,
    brand: input.brand,
    manufacturer: input.brand,
    supplier: input.supplier,
    unit: input.unit,
    specification: input.specification,
    imageGradient: "from-stone-300 to-stone-500",
    currentPrice: input.currentPrice,
    previousPrice: input.previousPrice ?? input.currentPrice,
    gst: input.gst,
    moq: 1,
    leadTimeDays: 7,
    availability: input.availability ?? "in_stock",
    stockQuantity: 0,
    vendors: [
      {
        id: `v-${id}`,
        name: input.supplier,
        price: input.currentPrice,
        leadTimeDays: 7,
        isPreferred: true,
      },
    ],
    preferredVendorId: `v-${id}`,
    alternateMaterialIds: [],
    compatibleMaterialIds: [],
    isFavorite: false,
    usageCount: 0,
    archived: false,
    legacyCategory: "tiles",
  };
  materials = [material, ...requireMaterials()];
  return material;
}

export function updateMaterial(id: string, patch: Partial<MaterialFormInput>): MasterMaterial | undefined {
  materials = requireMaterials().map((m) => {
    if (m.id !== id) return m;
    const updated = { ...m, ...patch };
    if (patch.currentPrice != null && patch.currentPrice !== m.currentPrice) {
      updated.previousPrice = m.currentPrice;
    }
    return updated;
  });
  return getMasterMaterialById(id);
}

export function importMaterials(rows: MaterialFormInput[]): number {
  rows.forEach((row) => addMaterial(row));
  return rows.length;
}

export function getAllSubcategoryMaterialCounts(): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};
  getAllMasterMaterials().forEach((m) => {
    result[m.categoryId] ??= {};
    result[m.categoryId][m.subcategoryId] = (result[m.categoryId][m.subcategoryId] ?? 0) + 1;
  });
  return result;
}

export function paginateMaterials(items: MasterMaterial[], page: number, limit: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    page: safePage,
    limit,
    total,
    totalPages,
  };
}
