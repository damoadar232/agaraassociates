import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceChangeBadgeProps {
  current: number;
  previous: number;
  className?: string;
}

export function PriceChangeBadge({ current, previous, className }: PriceChangeBadgeProps) {
  const change = ((current - previous) / previous) * 100;
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium",
        isUp && "bg-destructive/10 text-destructive",
        isDown && "bg-success/10 text-success",
        !isUp && !isDown && "bg-muted text-muted-foreground",
        className
      )}
    >
      {isUp && <TrendingUp className="h-3 w-3" />}
      {isDown && <TrendingDown className="h-3 w-3" />}
      {!isUp && !isDown && <Minus className="h-3 w-3" />}
      {formatPercent(change)}
    </span>
  );
}
