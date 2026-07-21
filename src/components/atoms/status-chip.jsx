import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_LABELS, QUOTATION_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
const statusVariants = {
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
export function StatusChip({ status, type = "project", className }) {
    const labels = type === "quotation" ? QUOTATION_STATUS_LABELS : PROJECT_STATUS_LABELS;
    return (<Badge variant={statusVariants[status] || "outline"} className={cn("font-medium", className)}>
      {labels[status] || status}
    </Badge>);
}
