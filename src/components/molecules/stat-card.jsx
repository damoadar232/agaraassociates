import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
export function StatCard({ title, value, subtitle, icon: Icon, trend, className }) {
    return (<Card className={cn("card-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend && (<p className={cn("text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
                {trend.value}
              </p>)}
          </div>
          {Icon && (<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary"/>
            </div>)}
        </div>
      </CardContent>
    </Card>);
}
