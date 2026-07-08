import { MaterialCategory } from "@/types";

export type MaterialAvailability =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "made_to_order";

export type SustainabilityRating = "A" | "B" | "C" | "D" | "N/A";

export interface MaterialVendor {
  id: string;
  name: string;
  price: number;
  leadTimeDays: number;
  isPreferred?: boolean;
}

export interface MasterMaterial {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  brand: string;
  manufacturer: string;
  supplier: string;
  unit: string;
  size?: string;
  thickness?: string;
  color?: string;
  finish?: string;
  grade?: string;
  specification?: string;
  datasheetUrl?: string;
  imageGradient: string;
  currentPrice: number;
  previousPrice: number;
  gst: number;
  moq: number;
  leadTimeDays: number;
  availability: MaterialAvailability;
  stockQuantity: number;
  vendors: MaterialVendor[];
  preferredVendorId?: string;
  alternateMaterialIds: string[];
  compatibleMaterialIds: string[];
  warranty?: string;
  countryOfOrigin?: string;
  sustainabilityRating?: SustainabilityRating;
  fireRating?: string;
  standards?: string[];
  remarks?: string;
  isFavorite: boolean;
  lastUsedAt?: string;
  usageCount: number;
  archived: boolean;
  projectIds?: string[];
  /** Maps to legacy MaterialCategory for backward compatibility */
  legacyCategory: MaterialCategory;
}

export type MaterialViewMode =
  | "category_grid"
  | "table"
  | "vendor"
  | "brand"
  | "price_list"
  | "gallery";

export type MaterialQuickFilter = "all" | "favorites" | "recent" | "frequent";

export interface MaterialLibraryFilters {
  search: string;
  categoryId: string | null;
  subcategoryId: string | null;
  brands: string[];
  vendors: string[];
  availability: MaterialAvailability[];
  priceMin: number | null;
  priceMax: number | null;
  quickFilter: MaterialQuickFilter;
}

export const DEFAULT_MATERIAL_FILTERS: MaterialLibraryFilters = {
  search: "",
  categoryId: null,
  subcategoryId: null,
  brands: [],
  vendors: [],
  availability: [],
  priceMin: null,
  priceMax: null,
  quickFilter: "all",
};
