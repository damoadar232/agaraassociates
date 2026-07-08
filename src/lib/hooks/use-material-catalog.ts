"use client";

import { useEffect, useState } from "react";
import type { MasterMaterial } from "@/types/material-library";
import { createMaterialCatalog, type MaterialCatalog } from "@/lib/boq/material-mapping";
import { getCompactMaterials } from "@/services/materialsService";

export function useMaterialCatalog() {
  const [catalog, setCatalog] = useState<MaterialCatalog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const materials = await getCompactMaterials();
        if (!cancelled) {
          setCatalog(createMaterialCatalog(materials as MasterMaterial[]));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading };
}
