"use client";

import { Link } from "react-router-dom";
import { getBoqsForClient } from "@/lib/client-workspace";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { calculateBoqEstimate } from "@/lib/boq/estimate-calculator";

export function BoqClientView({ clientId }: { clientId: string }) {
  const boqs = getBoqsForClient(clientId);

  if (boqs.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center text-muted-foreground">
          <p className="font-medium text-foreground">No BOQs for this client</p>
          <p className="text-sm mt-1">Create a project or add a BOQ linked to this client&apos;s work.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {boqs.map((boq) => (
        <Link key={boq.id} to={`/boq/${boq.id}?client=${clientId}`}>
          <Card className="card-hover h-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{boq.title}</h3>
                  <p className="text-sm text-muted-foreground">{boq.projectName}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{boq.items.length} line items</span>
                <span className="font-bold">{formatCurrency(calculateBoqEstimate(boq.items).grandTotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Updated {boq.updatedAt}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
