"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MaterialLibraryFilters, MasterMaterial } from "@/types/material-library";
import { DEFAULT_MATERIAL_FILTERS } from "@/types/material-library";
import {
  getMaterialMeta,
  getMaterialsPage,
  toggleMaterialFavoriteRecord,
} from "@/services/materialsService";

export interface MaterialMeta {
  stats: {
    total: number;
    inStock: number;
    lowStock: number;
    favorites: number;
    brands: number;
    vendors: number;
  };
  brands: string[];
  vendors: string[];
  categoryCounts?: Record<string, number>;
  subcategoryCounts?: Record<string, Record<string, number>>;
}

export interface MaterialsPageResult {
  materials: MasterMaterial[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useMaterialMeta() {
  const [meta, setMeta] = useState<MaterialMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getMaterialMeta();
        if (!cancelled) setMeta(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { meta, loading };
}

export function useMaterialsPage(
  filters: MaterialLibraryFilters,
  page: number,
  limit = 50,
) {
  const [result, setResult] = useState<MaterialsPageResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterKey = useMemo(() => JSON.stringify({ filters, page, limit }), [filters, page, limit]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await getMaterialsPage(filters, page, limit);
        if (!cancelled) {
          setResult({ materials: data.materials, meta: data.meta });
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load materials");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filterKey, filters, page, limit]);

  const toggleFavorite = useCallback(async (id: string) => {
    const updated = await toggleMaterialFavoriteRecord(id);
    if (!updated) return;
    setResult((prev) =>
      prev
        ? {
            ...prev,
            materials: prev.materials.map((material) => (material.id === id ? updated : material)),
          }
        : prev,
    );
  }, []);

  return { result, loading, error, toggleFavorite };
}

export { DEFAULT_MATERIAL_FILTERS };
