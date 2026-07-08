import { ensureMaterialStoreLoaded } from "@/lib/materials/material-loader.server";
import { getAllMasterMaterials } from "@/lib/store/material-store";
import { createMaterialCatalog } from "@/lib/boq/material-mapping";

export async function getServerMaterialCatalog() {
  await ensureMaterialStoreLoaded();
  return createMaterialCatalog(getAllMasterMaterials());
}

export async function getProjectMaterials(projectId: string) {
  await ensureMaterialStoreLoaded();
  return getAllMasterMaterials().filter((m) => m.projectIds?.includes(projectId));
}
