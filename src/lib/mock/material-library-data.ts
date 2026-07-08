import { MasterMaterial } from "@/types/material-library";
import importedRaw from "@/lib/mock/material-library-imported.json";

type ImportedMaterialRow = {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  brand: string;
  manufacturer: string;
  supplier: string;
  unit: string;
  size?: string | null;
  specification?: string | null;
  imageGradient: string;
  currentPrice: number;
  previousPrice: number;
  gst: number;
  moq: number;
  leadTimeDays: number;
  availability: MasterMaterial["availability"];
  stockQuantity: number;
  legacyCategory: MasterMaterial["legacyCategory"];
  countryOfOrigin?: string;
};

function normalizeImportedMaterial(row: ImportedMaterialRow): MasterMaterial {
  const supplier = row.supplier || row.brand || "Generic";
  const vendorId = `v-${row.id}`;
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    categoryId: row.categoryId,
    subcategoryId: row.subcategoryId,
    brand: row.brand || "Generic",
    manufacturer: row.manufacturer || row.brand || "Generic",
    supplier,
    unit: row.unit,
    size: row.size ?? undefined,
    specification: row.specification ?? undefined,
    imageGradient: row.imageGradient,
    currentPrice: row.currentPrice,
    previousPrice: row.previousPrice,
    gst: row.gst,
    moq: row.moq,
    leadTimeDays: row.leadTimeDays,
    availability: row.availability,
    stockQuantity: row.stockQuantity,
    vendors: [
      {
        id: vendorId,
        name: supplier,
        price: row.currentPrice,
        leadTimeDays: row.leadTimeDays,
        isPreferred: true,
      },
    ],
    preferredVendorId: vendorId,
    alternateMaterialIds: [],
    compatibleMaterialIds: [],
    countryOfOrigin: row.countryOfOrigin,
    isFavorite: false,
    usageCount: 0,
    archived: false,
    legacyCategory: row.legacyCategory,
  };
}

export const materialLibrarySeed: MasterMaterial[] = (importedRaw as ImportedMaterialRow[]).map(
  normalizeImportedMaterial,
);
