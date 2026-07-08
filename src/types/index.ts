export type ProjectStatus =
  | "concept"
  | "design_dev"
  | "execution"
  | "handover"
  | "completed";

export type ProjectType =
  | "residential"
  | "commercial"
  | "retail"
  | "hospitality"
  | "office";

export type ServiceType =
  | "architecture"
  | "interior_design"
  | "turnkey"
  | "renovation"
  | "project_management"
  | "design_build"
  | "architectural_consultancy"
  | "interior_consultancy"
  | "construction_supervision"
  | "construction";

export type ConstructionType =
  | "residential"
  | "commercial"
  | "industrial"
  | "villa"
  | "apartment"
  | "office"
  | "retail"
  | "institutional";

export type FoundationType =
  | "isolated_footing"
  | "combined_footing"
  | "raft"
  | "pile"
  | "strip";

export type StructuralSystem =
  | "rcc_frame"
  | "steel_frame"
  | "load_bearing"
  | "precast"
  | "hybrid";

export type ConstructionMethod =
  | "conventional"
  | "precast"
  | "modular"
  | "hybrid";

export interface ContractorDetails {
  name: string;
  contact: string;
  company: string;
  license?: string;
}

export interface ConstructionMilestoneInput {
  title: string;
  targetDate: string;
}

export interface ConstructionDetails {
  constructionType: ConstructionType;
  foundationType: FoundationType;
  structuralSystem: StructuralSystem;
  numberOfFloors: number;
  plotArea: number;
  builtUpArea: number;
  contractor: ContractorDetails;
  estimatedConstructionBudget: number;
  materialBudget: number;
  labourBudget: number;
  constructionMethod: ConstructionMethod;
  siteMobilizationDate: string;
  requiredMachinery: string[];
  requiredApprovals: string[];
  safetyCompliance: string[];
  milestones: ConstructionMilestoneInput[];
}

export interface ProjectOnboardingPayload {
  name: string;
  clientId?: string;
  clientName?: string;
  location: string;
  city: string;
  description: string;
  startDate: string;
  expectedCompletion: string;
  serviceTypes: ServiceType[];
  constructionDetails?: ConstructionDetails;
  team: string[];
  type: ProjectType;
}

export type QuotationStatus = "draft" | "sent" | "approved" | "rejected";

export type Severity = "critical" | "warning" | "info" | "positive";

export type MaterialCategory =
  | "tiles"
  | "wood"
  | "paint"
  | "electrical"
  | "lighting"
  | "furniture";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  gstin?: string;
  city: string;
  type: string;
  projectCount: number;
  activeProjects: number;
  totalRevenue: number;
  lastContact: string;
  avatar?: string;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: ProjectStatus;
  type: ProjectType;
  serviceTypes: ServiceType[];
  constructionDetails?: ConstructionDetails;
  location: string;
  city: string;
  healthScore: number;
  progress: number;
  budget: number;
  spent: number;
  profit: number;
  expectedCompletion: string;
  startDate: string;
  description: string;
  team: string[];
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  date: string;
  status: "completed" | "in_progress" | "upcoming" | "delayed";
}

export interface ProjectRisk {
  id: string;
  projectId: string;
  type: string;
  severity: Severity;
  description: string;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  supplier: string;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  availability: "in_stock" | "low_stock" | "out_of_stock";
  stock: number;
  projectIds?: string[];
}

export interface BOQLineItem {
  id: string;
  room: string;
  item: string;
  quantity: number;
  unit: string;
  rate: number;
  gst: number;
  labour: number;
  margin: number;
  materialId?: string;
  sku?: string;
  tradeId?: string;
  sectionId?: string;
  takeoffFieldId?: string;
  source?: "takeoff" | "room_schedule" | "manual" | "construction_seed";
}

export interface BOQ {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  items: BOQLineItem[];
  createdAt: string;
  updatedAt: string;
  projectType?: ProjectType;
  takeoffSnapshot?: import("@/types/boq-takeoff").BoqTakeoffSnapshot;
}

export interface QuotationVersion {
  version: number;
  amount: number;
  createdAt: string;
  changes: string;
}

export interface Quotation {
  id: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  title: string;
  status: QuotationStatus;
  amount: number;
  validUntil: string;
  versions: QuotationVersion[];
  items: { description: string; amount: number }[];
}

export interface Drawing {
  id: string;
  projectId: string;
  name: string;
  type: "floor_plan" | "3d_render" | "mood_board" | "cad";
  version: string;
  status: "draft" | "review" | "approved" | "pending_client";
  updatedAt: string;
  thumbnail: string;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  projectId?: string;
  projectName?: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface AIInsight {
  id: string;
  type: "savings" | "risk" | "trend" | "recommendation" | "prediction";
  severity: Severity;
  title: string;
  body: string;
  projectId?: string;
  projectName?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: string;
  href?: string;
}

export interface Task {
  id: string;
  title: string;
  projectId?: string;
  projectName?: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export interface SiteVisit {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  time: string;
  location: string;
  purpose: string;
}

export interface KanbanTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  column: "todo" | "in_progress" | "inspection" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
}

export interface PurchaseOrder {
  id: string;
  projectId: string;
  projectName: string;
  vendor: string;
  amount: number;
  status: "pending" | "ordered" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate: string;
  items: number;
}

export interface VendorQuote {
  vendor: string;
  material: string;
  price: number;
  deliveryDays: number;
  rating: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issuedDate: string;
}

export interface Communication {
  id: string;
  clientId: string;
  type: "email" | "call" | "meeting" | "whatsapp";
  subject: string;
  summary: string;
  date: string;
}

export type DocumentType =
  | "drawing"
  | "contract"
  | "invoice"
  | "report"
  | "photo"
  | "specification"
  | "other";

export interface ProjectDocument {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  type: DocumentType;
  size?: string;
  updatedAt: string;
  url?: string;
  uploadedBy?: string;
}

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ApprovalRecord {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  clientName?: string;
  type: "drawing" | "quotation" | "boq" | "payment" | "material" | "other";
  status: ApprovalStatus;
  priority: "high" | "medium" | "low";
  dueDate: string;
  href?: string;
}

export interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  active: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "site_visit" | "milestone" | "meeting" | "deadline" | "approval";
  projectId?: string;
  projectName?: string;
  location?: string;
}

export interface SitePhoto {
  id: string;
  projectId: string;
  caption: string;
  date: string;
}

export interface CreateQuotationInput {
  projectId: string;
  title: string;
  validUntil: string;
  items: { description: string; amount: number }[];
}

export interface CreateDrawingInput {
  projectId: string;
  name: string;
  type: Drawing["type"];
}

export interface CreateBoqInput {
  projectId: string;
  title: string;
  items: BOQLineItem[];
  projectType?: ProjectType;
  takeoffSnapshot?: import("@/types/boq-takeoff").BoqTakeoffSnapshot;
}

export interface DashboardData {
  user: User;
  studio: string;
  weather: WeatherInfo;
  projectAlerts: ProjectAlert[];
  immediateActions: ImmediateAction[];
  kpis: {
    healthScore: number;
    revenue: number;
    pendingQuotations: number;
    pendingApprovals: number;
    runningProjects: number;
    upcomingSiteVisits: number;
  };
  revenueChart: { month: string; revenue: number; expenses: number }[];
  projectStatusChart: { name: string; value: number; color: string }[];
  insights: AIInsight[];
  activities: Activity[];
  tasks: Task[];
  siteVisits: SiteVisit[];
  approvals: { id: string; title: string; projectName: string; clientName: string; type: string }[];
  recentFiles: { id: string; name: string; type: string; projectName: string; updatedAt: string }[];
}

export type ProjectAlertType =
  | "active_project"
  | "deadline"
  | "approval"
  | "site_visit"
  | "activity"
  | "project_status"
  | "budget"
  | "material"
  | "workload"
  | "payment"
  | "calendar";

export interface ProjectAlert {
  id: string;
  type: ProjectAlertType;
  title: string;
  description: string;
  projectName: string;
  dueAt: string;
  severity: "critical" | "warning" | "info";
  href?: string;
}

export interface ImmediateAction {
  id: string;
  title: string;
  description: string;
  projectName: string;
  priority: "high" | "medium" | "low";
  actionLabel: string;
  href: string;
  aiSuggested?: boolean;
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  icon: "sunny" | "cloudy" | "rainy" | "partly_cloudy";
}

export interface ApiResponse<T> {
  data: T;
  meta?: { total?: number };
}
