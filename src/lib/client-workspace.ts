import { getAllProjects, boqs as storeBoqs } from "@/lib/store/project-store";
import { getQuotationsByClientId } from "@/lib/store/quotation-store";
import { getDrawingsByProjectIds } from "@/lib/store/drawing-store";
import { getClientById } from "@/lib/store/client-store";

export function getProjectsForClient(clientId: string) {
  return getAllProjects().filter((p) => p.clientId === clientId);
}

export function getProjectIdsForClient(clientId: string) {
  return getProjectsForClient(clientId).map((p) => p.id);
}

export function getClientWorkspaceStats(clientId: string) {
  const projects = getProjectsForClient(clientId);
  const projectIds = projects.map((p) => p.id);
  return {
    projectCount: projects.length,
    quotationCount: getQuotationsByClientId(clientId).length,
    boqCount: storeBoqs.filter((b) => projectIds.includes(b.projectId)).length,
    drawingCount: getDrawingsByProjectIds(projectIds).length,
  };
}

export function getQuotationsForClient(clientId: string) {
  return getQuotationsByClientId(clientId);
}

export function getBoqsForClient(clientId: string) {
  const projectIds = getProjectIdsForClient(clientId);
  return storeBoqs.filter((b) => projectIds.includes(b.projectId));
}

export function getDrawingsForClient(clientId: string) {
  const projectIds = getProjectIdsForClient(clientId);
  return getDrawingsByProjectIds(projectIds);
}

export function resolveClientLabel(clientId: string) {
  const client = getClientById(clientId);
  return client?.company ? `${client.name} · ${client.company}` : client?.name ?? "Client";
}
