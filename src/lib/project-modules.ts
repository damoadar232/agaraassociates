import { purchaseOrders, invoices, communications } from "@/lib/mock/data-seed";
import { getDocumentsByProjectId } from "@/lib/store/document-store";
import { getApprovalsByProjectId } from "@/lib/store/approval-store";
import { activities } from "@/lib/store/project-store";
import { sitePhotosSeed } from "@/lib/mock/site-photos";

export { getProjectMaterials } from "@/lib/project-modules.server";

export function getProjectPurchaseOrders(projectId: string) {
  return purchaseOrders.filter((po) => po.projectId === projectId);
}

export function getProjectInvoices(projectId: string) {
  return invoices.filter((inv) => inv.projectId === projectId);
}

export function getProjectDocuments(projectId: string) {
  return getDocumentsByProjectId(projectId);
}

export function getProjectApprovals(projectId: string) {
  return getApprovalsByProjectId(projectId);
}

export function getProjectActivities(projectId: string) {
  return activities.filter((a) => a.projectId === projectId);
}

export function getProjectSitePhotos(projectId: string) {
  return sitePhotosSeed.filter((p) => p.projectId === projectId);
}

export function getCommunicationsForClient(clientId: string) {
  return communications.filter((c) => c.clientId === clientId);
}
