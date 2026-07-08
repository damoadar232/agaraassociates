"use client";

import { FolderKanban, IndianRupee, Building2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface ProgressPill {
  label: string;
  value: number;
  fillClass: string;
}

interface DashboardWelcomeBarProps {
  userName: string;
  studio: string;
  progressPills: ProgressPill[];
  stats: {
    runningProjects: number;
    pendingApprovals: number;
    revenue: number;
  };
}

function formatRevenue(amount: number) {
  return `₹${(amount / 100000).toFixed(1)}L`;
}

export function DashboardWelcomeBar({
  userName,
  studio,
  progressPills,
  stats,
}: DashboardWelcomeBarProps) {
  const displayName = userName.includes(" ")
    ? userName.split(" ")[0]
    : userName;

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-4 shrink-0">
      <div className="space-y-2.5 min-w-0 flex-1">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{studio}</p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mt-0.5">
            Welcome in, {displayName}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {progressPills.map((pill) => (
            <div
              key={pill.label}
              className="glass-pill flex items-center gap-2 px-2.5 sm:px-3 py-1.5 min-w-0 sm:min-w-[120px]"
            >
              <span className="text-[10px] sm:text-[11px] text-muted-foreground shrink-0">{pill.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-surface-hover overflow-hidden min-w-[28px]">
                <div
                  className={cn("h-full rounded-full transition-all", pill.fillClass)}
                  style={{ width: `${Math.min(pill.value, 100)}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums">{pill.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full lg:flex lg:w-auto lg:ml-10 lg:mr-2 shrink-0">
        {[
          { icon: Building2, value: stats.runningProjects, label: "Active" },
          { icon: FolderKanban, value: stats.pendingApprovals, label: "Pending" },
          { icon: IndianRupee, value: formatRevenue(stats.revenue), label: "Revenue" },
        ].map((stat) => (
          <GlassCard
            key={stat.label}
            variant="subtle"
            className="px-2.5 py-2 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 min-w-0"
          >
            <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <div className="text-center sm:text-left min-w-0">
              <p className="text-sm sm:text-lg font-semibold leading-none tabular-nums truncate">{stat.value}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
