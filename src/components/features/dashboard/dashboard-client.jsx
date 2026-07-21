"use client";
import { memo } from "react";
import { DashboardWelcomeBar } from "@/components/organisms/dashboard-welcome-bar";
import { DashboardHero } from "@/components/organisms/dashboard-hero";
import { ProjectAlertsPanel } from "@/components/organisms/project-alerts-panel";
import { ImmediateActionsPanel } from "@/components/organisms/immediate-actions-panel";
import { QuickActionsCard } from "@/components/organisms/quick-actions-panel";
export const DashboardClient = memo(function DashboardClient({ data }) {
    const progressPills = [
        { label: "Execution", value: 60, fillClass: "bg-primary" },
        { label: "Design", value: 35, fillClass: "bg-accent" },
        { label: "Approvals", value: data.kpis.pendingApprovals * 10, fillClass: "bg-secondary" },
        { label: "On Budget", value: 92, fillClass: "bg-accent" },
    ];
    return (<div className="flex flex-col gap-3 pb-20 lg:pb-0 lg:h-[calc(100vh-4.5rem)] lg:max-h-[calc(100vh-4.5rem)] animate-in fade-in duration-500">
      <DashboardWelcomeBar userName={data.user.name} studio={data.studio} progressPills={progressPills} stats={{
            runningProjects: data.kpis.runningProjects,
            pendingApprovals: data.kpis.pendingApprovals,
            revenue: data.kpis.revenue,
        }}/>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:flex-1 lg:min-h-0">
        <div className="order-1 lg:col-span-3 lg:min-h-0 lg:flex lg:flex-col">
          <DashboardHero userName={data.user.name} studio={data.studio} userRole={data.user.role} weather={data.weather} onTrackPercent={data.kpis.healthScore}/>
        </div>

        <QuickActionsCard className="order-2"/>

        <ProjectAlertsPanel alerts={data.projectAlerts} className="order-3 lg:order-none lg:col-span-5 lg:min-h-0 lg:flex-1"/>
        <ImmediateActionsPanel actions={data.immediateActions} className="order-4 lg:order-none lg:col-span-4 lg:min-h-0 lg:flex-1"/>
      </div>
    </div>);
});
