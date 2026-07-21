import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassCard } from "@/components/ui/glass-card";
import { QuickActionsStrip } from "@/components/organisms/quick-actions-panel";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
export function ImmediateActionsPanel({ actions, className }) {
    const completedCount = 0;
    return (<GlassCard className={cn("flex flex-col overflow-hidden border-accent/20", "lg:flex-1 lg:min-h-0", className)}>
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-divider shrink-0">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">Approval Queue</h2>
          <p className="text-[10px] text-foreground mt-0.5">Pending reviews and action items</p>
        </div>
        <span className="text-xs font-medium text-foreground tabular-nums shrink-0">
          {completedCount}/{actions.length}
        </span>
      </div>

      <ScrollArea className="lg:flex-1 lg:h-0 lg:min-h-0 max-h-[220px] sm:max-h-[260px] lg:max-h-none">
        <div className="space-y-0.5 p-2">
          {actions.map((action, index) => (<div key={action.id} className="flex items-start sm:items-center gap-2 px-2 py-2 sm:px-2.5 rounded-xl hover:bg-surface-hover transition-colors group">
              {index === 0 ? (<CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" strokeWidth={1.5}/>) : (<Circle className="h-3.5 w-3.5 text-foreground/40 shrink-0 mt-0.5 sm:mt-0" strokeWidth={1.5}/>)}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium line-clamp-2 sm:truncate text-foreground">{action.title}</p>
                <p className="text-[10px] text-foreground truncate">{action.projectName}</p>
              </div>
              <Button size="sm" variant="ghost" className="h-7 px-1.5 text-[10px] rounded-lg text-foreground hover:bg-surface-hover shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" asChild>
                <Link to={action.href} className="flex items-center gap-0.5">
                  <span className="hidden sm:inline">{action.actionLabel}</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5}/>
                </Link>
              </Button>
            </div>))}
        </div>
      </ScrollArea>

      <div className="hidden lg:block shrink-0 border-t border-divider px-3 py-2.5">
        <p className="text-[10px] font-semibold text-foreground mb-2">Quick Actions</p>
        <QuickActionsStrip compact/>
      </div>
    </GlassCard>);
}
