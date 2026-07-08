"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getProjectsForClient } from "@/lib/client-workspace";
import { getClientById } from "@/lib/store/client-store";
import { createQuotation } from "@/lib/store/quotation-store";

interface QuotationCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
}

export function QuotationCreateDialog({ open, onOpenChange, clientId }: QuotationCreateDialogProps) {
  const navigate = useNavigate();
  const projects = getProjectsForClient(clientId);
  const client = getClientById(clientId);
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [validUntil, setValidUntil] = useState("2026-08-31");
  const [line1, setLine1] = useState("");
  const [amount1, setAmount1] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find((p) => p.id === projectId);
    if (!project || !title.trim() || !line1.trim()) {
      toast.error("Project, title, and at least one line item required");
      return;
    }
    const quote = createQuotation(
      {
        projectId,
        title: title.trim(),
        validUntil,
        items: [{ description: line1.trim(), amount: Number(amount1) || 0 }],
      },
      {
        projectName: project.name,
        clientId,
        clientName: client?.company || client?.name || "Client",
      },
    );
    toast.success("Quotation created as draft");
    onOpenChange(false);
    navigate(`/quotations/${quote.id}?client=${clientId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Quotation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Project</Label>
            <Select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="rounded-xl">
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Interior Finishes Package" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Valid until</Label>
            <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-2">
              <Label>Line item</Label>
              <Input value={line1} onChange={(e) => setLine1(e.target.value)} placeholder="Living room finishes" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Amount (₹)</Label>
              <Input type="number" value={amount1} onChange={(e) => setAmount1(e.target.value)} className="rounded-xl" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">Create Draft</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
