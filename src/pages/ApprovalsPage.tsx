import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getAllApprovals, updateApprovalStatus } from "@/lib/store/approval-store";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { ApprovalRecord } from "@/types";

export function ApprovalsPage() {
  const [version, setVersion] = useState(0);
  void version;
  const approvals = getAllApprovals();

  const handleAction = (id: string, status: "approved" | "rejected") => {
    updateApprovalStatus(id, status);
    setVersion((value) => value + 1);
    toast.success(status === "approved" ? "Approved" : "Rejected");
  };

  const pending = approvals.filter((approval) => approval.status === "pending");
  const completed = approvals.filter((approval) => approval.status !== "pending");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Approvals" description="Drawings, quotations, payments, and sign-offs awaiting action" />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Pending ({pending.length})
        </h2>
        {pending.map((approval) => (
          <ApprovalCard key={approval.id} approval={approval} onAction={handleAction} />
        ))}
        {pending.length === 0 && <p className="text-sm text-muted-foreground">All caught up.</p>}
      </section>

      {completed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Completed</h2>
          {completed.map((approval) => (
            <ApprovalCard key={approval.id} approval={approval} />
          ))}
        </section>
      )}
    </div>
  );
}

function ApprovalCard({
  approval,
  onAction,
}: {
  approval: ApprovalRecord;
  onAction?: (id: string, status: "approved" | "rejected") => void;
}) {
  return (
    <Card className="card-hover">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{approval.title}</p>
            <Badge variant="outline" className="capitalize text-[10px]">
              {approval.type}
            </Badge>
            <Badge
              variant={
                approval.priority === "high" ? "destructive" : approval.priority === "medium" ? "warning" : "outline"
              }
            >
              {approval.priority}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{approval.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {approval.projectName} · Due {approval.dueDate}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {approval.status === "pending" && onAction ? (
            <>
              <Button size="sm" className="rounded-xl gap-1" onClick={() => onAction(approval.id, "approved")}>
                <Check className="h-3.5 w-3.5" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl gap-1"
                onClick={() => onAction(approval.id, "rejected")}
              >
                <X className="h-3.5 w-3.5" /> Reject
              </Button>
            </>
          ) : (
            <Badge variant={approval.status === "approved" ? "success" : "destructive"}>{approval.status}</Badge>
          )}
          {approval.href && (
            <Button size="sm" variant="ghost" className="rounded-xl" asChild>
              <Link to={approval.href}>View</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
