import { CreateQuotationInput, Quotation } from "@/types";
import { quotations as seedQuotations } from "@/lib/mock/data-seed";

let quotations: Quotation[] = [...seedQuotations];

export function getAllQuotations() {
  return quotations;
}

export function getQuotationById(id: string) {
  return quotations.find((q) => q.id === id);
}

export function getQuotationsByProjectId(projectId: string) {
  return quotations.filter((q) => q.projectId === projectId);
}

export function getQuotationsByClientId(clientId: string) {
  return quotations.filter((q) => q.clientId === clientId);
}

export function createQuotation(input: CreateQuotationInput, meta: {
  projectName: string;
  clientId: string;
  clientName: string;
}): Quotation {
  const amount = input.items.reduce((s, i) => s + i.amount, 0);
  const id = `quote-${Date.now()}`;
  const quotation: Quotation = {
    id,
    projectId: input.projectId,
    projectName: meta.projectName,
    clientId: meta.clientId,
    clientName: meta.clientName,
    title: input.title,
    status: "draft",
    amount,
    validUntil: input.validUntil,
    versions: [{ version: 1, amount, createdAt: new Date().toISOString().split("T")[0], changes: "Initial draft" }],
    items: input.items,
  };
  quotations = [quotation, ...quotations];
  return quotation;
}

export function updateQuotationStatus(id: string, status: Quotation["status"]) {
  quotations = quotations.map((q) => (q.id === id ? { ...q, status } : q));
  return getQuotationById(id);
}
