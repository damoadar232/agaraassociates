import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/templates/dashboard-layout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { NewProjectPage } from "@/pages/NewProjectPage";
import { ClientsPage } from "@/pages/ClientsPage";
import { ClientDetailPage } from "@/pages/ClientDetailPage";
import { DesignStudioPage } from "@/pages/DesignStudioPage";
import { BoqListPage } from "@/pages/BoqListPage";
import { BoqNewPage } from "@/pages/BoqNewPage";
import { BoqDetailPage } from "@/pages/BoqDetailPage";
import { QuotationsPage } from "@/pages/QuotationsPage";
import { QuotationDetailPage } from "@/pages/QuotationDetailPage";
import { MaterialsPage } from "@/pages/MaterialsPage";
import { VendorsPage } from "@/pages/VendorsPage";
import { ProcurementPage } from "@/pages/ProcurementPage";
import { SiteProgressPage } from "@/pages/SiteProgressPage";
import { DocumentsPage } from "@/pages/DocumentsPage";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { TeamPage } from "@/pages/TeamPage";
import { CalendarPage } from "@/pages/CalendarPage";
import { FinancePage } from "@/pages/FinancePage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { AiAssistantPage } from "@/pages/AiAssistantPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ],
    },
    {
        element: (<ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>),
        children: [
            { path: "/dashboard", element: <DashboardPage /> },
            { path: "/projects", element: <ProjectsPage /> },
            { path: "/projects/new", element: <NewProjectPage /> },
            { path: "/projects/:id", element: <ProjectDetailPage /> },
            { path: "/clients", element: <ClientsPage /> },
            { path: "/clients/:id", element: <ClientDetailPage /> },
            { path: "/design-studio", element: <DesignStudioPage /> },
            { path: "/boq", element: <BoqListPage /> },
            { path: "/boq/new", element: <BoqNewPage /> },
            { path: "/boq/:id", element: <BoqDetailPage /> },
            { path: "/quotations", element: <QuotationsPage /> },
            { path: "/quotations/:id", element: <QuotationDetailPage /> },
            { path: "/materials", element: <MaterialsPage /> },
            { path: "/vendors", element: <VendorsPage /> },
            { path: "/procurement", element: <ProcurementPage /> },
            { path: "/site-progress", element: <SiteProgressPage /> },
            { path: "/documents", element: <DocumentsPage /> },
            { path: "/approvals", element: <ApprovalsPage /> },
            { path: "/team", element: <TeamPage /> },
            { path: "/calendar", element: <CalendarPage /> },
            { path: "/finance", element: <FinancePage /> },
            { path: "/reports", element: <ReportsPage /> },
            { path: "/settings", element: <SettingsPage /> },
            { path: "/ai-assistant", element: <AiAssistantPage /> },
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);
