import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_LABELS, QUOTATION_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statusVariants: Record<string, "default" | "secondary" | "warning" | "success" | "destructive" | "outline"> = {
  concept: "outline",
  design_dev: "default",
  execution: "secondary",
  handover: "warning",
  completed: "success",
  draft: "outline",
  sent: "default",
  approved: "success",
  rejected: "destructive",
};

interface StatusChipProps {
  status: string;
  type?: "project" | "quotation";
  className?: string;
}

export function StatusChip({ status, type = "project", className }: StatusChipProps) {
  const labels = type === "quotation" ? QUOTATION_STATUS_LABELS : PROJECT_STATUS_LABELS;
  return (
    <Badge variant={statusVariants[status] || "outline"} className={cn("font-medium", className)}>
      {labels[status] || status}
    </Badge>
  );
}
