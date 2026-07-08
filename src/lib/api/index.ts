import { apiGet } from "./client";
import { DashboardData, Project, Client, ProjectOnboardingPayload } from "@/types";

export const getDashboard = () => apiGet<DashboardData>("/api/dashboard");
export const getProjects = () => apiGet<Project[]>("/api/projects");
export const getClients = () => apiGet<Client[]>("/api/clients");

export async function createProject(payload: ProjectOnboardingPayload): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create project");
  return json.data;
}
