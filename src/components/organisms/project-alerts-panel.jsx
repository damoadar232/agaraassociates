"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, Clock, Package, AlertTriangle, ChevronRight, FolderKanban, FileCheck, HardHat, Activity, TrendingUp, IndianRupee, Users, CircleDot, } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
const alertTypeStyles = {
    active_project: {
        label: "Active Project",
        short: "Active",
        icon: FolderKanban,
        row: "bg-info/[0.07] border-info/25 hover:bg-info/[0.12]",
        iconBox: "bg-info/25 border-info/40 text-foreground",
        badge: "bg-info/15 border-info/40 text-foreground",
        filterActive: "bg-info/20 border-info/45 text-foreground",
        accentBar: "bg-info",
    },
    deadline: {
        label: "Deadline",
        short: "Due",
        icon: Clock,
        row: "bg-warning/[0.08] border-warning/25 hover:bg-warning/[0.14]",
        iconBox: "bg-warning/25 border-warning/40 text-foreground",
        badge: "bg-warning/15 border-warning/40 text-foreground",
        filterActive: "bg-warning/20 border-warning/45 text-foreground",
        accentBar: "bg-warning",
    },
    approval: {
        label: "Approval",
        short: "Approve",
        icon: FileCheck,
        row: "bg-accent/[0.08] border-accent/25 hover:bg-accent/[0.14]",
        iconBox: "bg-accent/25 border-accent/40 text-foreground",
        badge: "bg-accent/15 border-accent/40 text-foreground",
        filterActive: "bg-accent/20 border-accent/45 text-foreground",
        accentBar: "bg-accent",
    },
    site_visit: {
        label: "Site Visit",
        short: "Site",
        icon: HardHat,
        row: "bg-primary/10 border-primary/25 hover:bg-primary/15",
        iconBox: "bg-primary/25 border-primary/40 text-foreground",
        badge: "bg-primary/15 border-primary/40 text-foreground",
        filterActive: "bg-primary/20 border-primary/45 text-foreground",
        accentBar: "bg-primary",
    },
    activity: {
        label: "Activity",
        short: "Activity",
        icon: Activity,
        row: "bg-surface border-border/50 hover:bg-surface-hover",
        iconBox: "bg-surface-hover border-border/60 text-foreground",
        badge: "bg-surface border-border/50 text-foreground",
        filterActive: "bg-surface-hover border-border/60 text-foreground",
        accentBar: "bg-muted-foreground/40",
    },
    project_status: {
        label: "Status",
        short: "Status",
        icon: CircleDot,
        row: "bg-info/[0.06] border-info/20 hover:bg-info/[0.1]",
        iconBox: "bg-info/20 border-info/35 text-foreground",
        badge: "bg-info/12 border-info/35 text-foreground",
        filterActive: "bg-info/18 border-info/40 text-foreground",
        accentBar: "bg-info",
    },
    budget: {
        label: "Budget",
        short: "Budget",
        icon: TrendingUp,
        row: "bg-warning/[0.06] border-warning/20 hover:bg-warning/[0.1]",
        iconBox: "bg-warning/20 border-warning/35 text-foreground",
        badge: "bg-warning/12 border-warning/35 text-foreground",
        filterActive: "bg-warning/18 border-warning/40 text-foreground",
        accentBar: "bg-warning",
    },
    material: {
        label: "Material",
        short: "Stock",
        icon: Package,
        row: "bg-destructive/[0.07] border-destructive/25 hover:bg-destructive/[0.12]",
        iconBox: "bg-destructive/20 border-destructive/35 text-foreground",
        badge: "bg-destructive/12 border-destructive/35 text-foreground",
        filterActive: "bg-destructive/18 border-destructive/40 text-foreground",
        accentBar: "bg-destructive",
    },
    workload: {
        label: "Workload",
        short: "Team",
        icon: Users,
        row: "bg-accent/[0.06] border-accent/20 hover:bg-accent/[0.1]",
        iconBox: "bg-accent/20 border-accent/35 text-foreground",
        badge: "bg-accent/12 border-accent/35 text-foreground",
        filterActive: "bg-accent/18 border-accent/40 text-foreground",
        accentBar: "bg-accent",
    },
    payment: {
        label: "Payment",
        short: "Payment",
        icon: IndianRupee,
        row: "bg-destructive/[0.06] border-destructive/20 hover:bg-destructive/[0.1]",
        iconBox: "bg-destructive/18 border-destructive/30 text-foreground",
        badge: "bg-destructive/10 border-destructive/30 text-foreground",
        filterActive: "bg-destructive/15 border-destructive/35 text-foreground",
        accentBar: "bg-destructive",
    },
    calendar: {
        label: "Calendar",
        short: "Calendar",
        icon: Calendar,
        row: "bg-info/[0.05] border-info/20 hover:bg-info/[0.09]",
        iconBox: "bg-info/18 border-info/30 text-foreground",
        badge: "bg-info/10 border-info/30 text-foreground",
        filterActive: "bg-info/15 border-info/35 text-foreground",
        accentBar: "bg-info",
    },
};
const filterTypes = [
    "deadline",
    "approval",
    "site_visit",
    "budget",
    "material",
    "payment",
    "calendar",
];
function formatDueLabel(dueAt) {
    const date = parseISO(dueAt);
    if (isToday(date))
        return `Today · ${format(date, "h:mm a")}`;
    if (isTomorrow(date))
        return `Tomorrow · ${format(date, "h:mm a")}`;
    return format(date, "MMM d · h:mm a");
}
function AlertItem({ alert }) {
    const style = alertTypeStyles[alert.type];
    const Icon = style.icon;
    const row = (<div className={cn("group relative flex gap-3 px-3 py-3 rounded-2xl border transition-colors overflow-hidden", style.row, alert.href && "cursor-pointer", alert.severity === "critical" && "ring-1 ring-destructive/30")}>
      <span className={cn("absolute left-0 top-2 bottom-2 w-1 rounded-full", style.accentBar)}/>

      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ml-1.5", style.iconBox)}>
        <Icon className="h-4 w-4" strokeWidth={1.5}/>
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <p className="text-[13px] font-semibold leading-snug line-clamp-2 text-foreground flex-1 min-w-0">
            {alert.title}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            {alert.severity === "critical" && (<AlertTriangle className="h-3.5 w-3.5 text-foreground" strokeWidth={1.5}/>)}
            <span className="text-[10px] font-medium text-foreground sm:whitespace-nowrap">
              {formatDueLabel(alert.dueAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-foreground truncate max-w-[140px]">
            {alert.projectName}
          </span>
          <Badge variant="outline" className={cn("h-5 px-1.5 text-[10px] rounded-md", style.badge)}>
            {style.label}
          </Badge>
        </div>

        {alert.description && (<p className="text-[11px] leading-relaxed line-clamp-2 text-foreground/80">
            {alert.description}
          </p>)}
      </div>

      {alert.href && (<ChevronRight className="h-4 w-4 shrink-0 self-center text-foreground lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" strokeWidth={1.5}/>)}
    </div>);
    if (alert.href) {
        return (<Link to={alert.href} className="block">
        {row}
      </Link>);
    }
    return row;
}
export function ProjectAlertsPanel({ alerts, className }) {
    const [filter, setFilter] = useState("all");
    const urgentCount = alerts.filter((a) => a.severity === "critical").length;
    const todayDeadlines = alerts.filter((a) => a.type === "deadline" && isToday(parseISO(a.dueAt)));
    const filtered = filter === "all" ? alerts : alerts.filter((a) => a.type === filter);
    const filters = [
        { id: "all", label: "All", count: alerts.length },
        ...filterTypes.map((type) => ({
            id: type,
            label: alertTypeStyles[type].short,
            count: alerts.filter((a) => a.type === type).length,
        })),
    ];
    return (<GlassCard className={cn("flex flex-col overflow-hidden lg:flex-1 lg:min-h-0", className)}>
      <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-divider shrink-0">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">Business Alerts</h2>
          <p className="text-[11px] text-foreground mt-0.5 truncate">
            {todayDeadlines.length > 0
            ? `${todayDeadlines.length} deadline${todayDeadlines.length > 1 ? "s" : ""} today · ${alerts.length} total`
            : `${alerts.length} active alerts across portfolio`}
          </p>
        </div>
        {urgentCount > 0 && (<Badge className="h-6 px-2.5 text-[10px] rounded-full bg-destructive/20 border border-destructive/35 text-foreground shrink-0">
            {urgentCount} urgent
          </Badge>)}
      </div>

      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-divider shrink-0 overflow-x-auto scrollbar-thin">
        {filters.map((f) => {
            const isActive = filter === f.id;
            const typeStyle = f.id !== "all" ? alertTypeStyles[f.id] : null;
            return (<button key={f.id} type="button" onClick={() => setFilter(f.id)} className={cn("shrink-0 inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-medium transition-colors border", isActive && f.id === "all" && "glass-pill-active", isActive && typeStyle && typeStyle.filterActive, !isActive && "bg-surface/60 border-border/50 hover:bg-surface-hover")}>
              {f.label}
              <span className="tabular-nums opacity-80">({f.count})</span>
            </button>);
        })}
      </div>

      <div className="max-h-[340px] sm:max-h-[380px] lg:max-h-none lg:flex-1 lg:min-h-0 overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-2 p-3">
          {filtered.length > 0 ? (filtered.map((alert) => <AlertItem key={alert.id} alert={alert}/>)) : (<p className="text-xs text-center py-10 text-foreground">No alerts in this category</p>)}
        </div>
      </div>
    </GlassCard>);
}
