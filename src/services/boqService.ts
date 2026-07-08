import { getBoqByIdFromStore } from "@/lib/store/project-store";
import type { BOQ } from "@/types";

export function getBoqById(id: string): BOQ | undefined {
  return getBoqByIdFromStore(id);
}
