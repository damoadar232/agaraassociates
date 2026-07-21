"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuotationCreateDialog } from "@/components/organisms/quotation-create-dialog";
export function QuotationsHeaderActions({ clientId }) {
    const [open, setOpen] = useState(false);
    return (<>
      <Button className="rounded-xl" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4"/> New Quotation
      </Button>
      <QuotationCreateDialog open={open} onOpenChange={setOpen} clientId={clientId}/>
    </>);
}
