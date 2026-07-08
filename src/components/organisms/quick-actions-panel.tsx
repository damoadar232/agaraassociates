import { Link } from "react-router-dom";
import {
  Plus,
  FileText,
  Users,
  Calendar,
  ClipboardList,
  HardHat,
  Package,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const quickActions = [
  { label: "Project", icon: Plus, href: "/projects/new", color: "bg-primary border border-border/50 text-foreground" },
  { label: "Client", icon: Users, href: "/clients", color: "bg-surface text-heading" },
  { label: "Design", icon: Palette, href: "/design-studio", color: "bg-accent/20 text-foreground" },
  { label: "Quote", icon: FileText, href: "/quotations", color: "bg-surface text-heading" },
  { label: "BOQ", icon: ClipboardList, href: "/boq", color: "bg-surface text-heading" },
  { label: "Site", icon: HardHat, href: "/site-progress", color: "bg-surface text-heading" },
  { label: "Materials", icon: Package, href: "/materials", color: "bg-accent/20 text-foreground" },
  { label: "Calendar", icon: Calendar, href: "/calendar", color: "bg-primary border border-border/50 text-foreground" },
];

interface QuickActionsStripProps {
  compact?: boolean;
  className?: string;
}

export function QuickActionsStrip({ compact = false, className }: QuickActionsStripProps) {
  if (compact) {
    return (
      <div className={cn("grid grid-cols-3 gap-1.5", className)}>
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            title={action.label}
            className="flex flex-col items-center gap-1 px-1.5 py-2 rounded-xl bg-surface/50 border border-border/40 hover:bg-surface-hover transition-colors"
          >
            <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", action.color)}>
              <action.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-medium text-center leading-tight">{action.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5 overflow-x-auto scrollbar-thin", className)}>
      {quickActions.map((action) => (
        <Link
          key={action.label}
          to={action.href}
          title={action.label}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-surface/60 border border-border/50 hover:bg-surface-hover transition-colors shrink-0"
        >
          <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg", action.color)}>
            <action.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </div>
          <span className="text-[11px] font-medium">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}

export function QuickActionsCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/40 bg-surface/45 backdrop-blur-lg shadow-glass-sm px-3 py-2.5 lg:hidden",
        className,
      )}
    >
      <p className="text-xs font-semibold text-foreground mb-2">Quick Actions</p>
      <QuickActionsStrip compact />
    </div>
  );
}

export function QuickActionsPanel() {
  return (
    <div className="rounded-3xl border border-border/40 bg-surface/45 backdrop-blur-lg shadow-glass-sm shrink-0">
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="text-xs font-semibold shrink-0">Quick Actions</span>
        <div className="h-px flex-1 bg-divider" />
        <QuickActionsStrip />
      </div>
    </div>
  );
}
