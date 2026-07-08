import { ProjectType } from "@/types";

export type TakeoffFieldType = "area" | "length" | "volume" | "count" | "weight" | "lot";

export interface TakeoffFieldDef {
  id: string;
  label: string;
  unit: string;
  fieldType: TakeoffFieldType;
  categoryId: string;
  subcategoryId: string;
  defaultMargin?: number;
  labourPerUnit?: number;
  labourFlat?: number;
  placeholder?: string;
  helpText?: string;
}

export interface TakeoffSectionDef {
  id: string;
  label: string;
  description?: string;
  fields: TakeoffFieldDef[];
}

export interface TakeoffTemplate {
  projectType: ProjectType;
  label: string;
  sections: TakeoffSectionDef[];
}

export interface TakeoffRoomEntry {
  id: string;
  name: string;
  floor: string;
  length: number;
  width: number;
  height: number;
  floorArea: number;
  wallArea: number;
  ceilingArea: number;
  flooringQty: number;
  paintQty: number;
  falseCeilingQty: number;
  wallTilesQty: number;
  notes?: string;
}

export interface BoqTakeoffSnapshot {
  projectType: ProjectType;
  quantities: Record<string, number>;
  rooms: TakeoffRoomEntry[];
  materialOverrides: Record<string, string>;
  buildingSummary: {
    plotArea: number;
    builtUpArea: number;
    numberOfFloors: number;
    numberOfRooms: number;
    carpetArea: number;
  };
}

export interface BoqLineEstimate {
  lineId: string;
  base: number;
  gstAmount: number;
  labourAmount: number;
  marginAmount: number;
  total: number;
}

export interface BoqEstimateSummary {
  subtotal: number;
  gst: number;
  labour: number;
  margin: number;
  grandTotal: number;
  lineEstimates: BoqLineEstimate[];
}
