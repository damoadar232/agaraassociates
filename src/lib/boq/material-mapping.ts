import type { MasterMaterial } from "@/types/material-library";
import type { TakeoffFieldDef } from "@/types/boq-takeoff";
import type { BOQLineItem } from "@/types";

export function createMaterialCatalog(catalog: MasterMaterial[]) {
  const byId = new Map(catalog.map((m) => [m.id, m]));

  function findMaterialForField(
    field: TakeoffFieldDef,
    overrideMaterialId?: string,
  ): MasterMaterial | undefined {
    if (overrideMaterialId) {
      return byId.get(overrideMaterialId);
    }
    const exact = catalog.find(
      (m) => m.categoryId === field.categoryId && m.subcategoryId === field.subcategoryId,
    );
    if (exact) return exact;
    return catalog.find((m) => m.subcategoryId === field.subcategoryId);
  }

  function getMaterialsForField(field: TakeoffFieldDef): MasterMaterial[] {
    return catalog.filter(
      (m) => m.categoryId === field.categoryId && m.subcategoryId === field.subcategoryId,
    );
  }

  function getMasterMaterialById(id: string) {
    return byId.get(id);
  }

  function refreshLineItemRates(line: BOQLineItem): BOQLineItem {
    if (!line.materialId) return line;
    const material = byId.get(line.materialId);
    if (!material) return line;
    return {
      ...line,
      item: material.name,
      rate: material.currentPrice,
      gst: material.gst,
      sku: material.sku,
    };
  }

  return {
    catalog,
    findMaterialForField,
    getMaterialsForField,
    getMasterMaterialById,
    refreshLineItemRates,
  };
}

export type MaterialCatalog = ReturnType<typeof createMaterialCatalog>;

export function buildLineItemFromMaterial(
  params: {
    id: string;
    room: string;
    field: TakeoffFieldDef;
    quantity: number;
    material: MasterMaterial;
    source: BOQLineItem["source"];
    takeoffFieldId?: string;
    itemLabel?: string;
  },
): BOQLineItem {
  const { field, quantity, material, source, takeoffFieldId, room, id, itemLabel } = params;
  const labour = field.labourFlat ?? (field.labourPerUnit ?? 0) * quantity;
  return {
    id,
    room,
    item: itemLabel ?? material.name,
    quantity,
    unit: material.unit === "bag" && field.unit === "sqft" ? field.unit : material.unit,
    rate: material.currentPrice,
    gst: material.gst,
    labour: Math.round(labour),
    margin: field.defaultMargin ?? 12,
    materialId: material.id,
    sku: material.sku,
    tradeId: field.categoryId,
    sectionId: field.id.split("_")[0],
    takeoffFieldId: takeoffFieldId ?? field.id,
    source,
  };
}
