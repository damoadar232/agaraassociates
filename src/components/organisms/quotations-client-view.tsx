"use client";

import { Link } from "react-router-dom";
import { getQuotationsForClient } from "@/lib/client-workspace";
import { StatusChip } from "@/components/atoms/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function QuotationsClientView({ clientId }: { clientId: string }) {
  const quotations = getQuotationsForClient(clientId);

  if (quotations.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center text-muted-foreground">
          <p className="font-medium text-foreground">No quotations for this client</p>
          <p className="text-sm mt-1">Create a new quotation to send pricing for their projects.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quotations.map((q) => (
        <Link key={q.id} to={`/quotations/${q.id}?client=${clientId}`}>
          <Card className="card-hover">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{q.title}</h3>
                <p className="text-sm text-muted-foreground">{q.projectName}</p>
                <p className="text-xs text-muted-foreground">
                  Valid until {q.validUntil} · {q.versions.length} versions
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{formatCurrency(q.amount)}</span>
                <StatusChip status={q.status} type="quotation" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
