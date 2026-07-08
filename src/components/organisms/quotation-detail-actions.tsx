"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, PenLine } from "lucide-react";
import { updateQuotationStatus } from "@/lib/store/quotation-store";

export function QuotationDetailActions({ quoteId, status }: { quoteId: string; status: string }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => toast.success("PDF generated", { description: "Quotation PDF downloaded to your device" })}
      >
        <Download className="h-4 w-4" /> Generate PDF
      </Button>
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => toast.info("E-signature link sent", { description: "Client will receive a secure signing link via email" })}
      >
        <PenLine className="h-4 w-4" /> E-Signature
      </Button>
      <Button
        className="rounded-xl"
        onClick={() => {
          updateQuotationStatus(quoteId, "sent");
          toast.success("Sent for approval", { description: "Quotation status updated to Sent" });
        }}
        disabled={status === "sent" || status === "approved"}
      >
        Send for Approval
      </Button>
    </div>
  );
}
