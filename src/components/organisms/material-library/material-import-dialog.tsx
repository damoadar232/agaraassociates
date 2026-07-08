"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { MaterialFormInput } from "@/lib/store/material-store";
import { importMaterialRecords } from "@/services/materialsService";

interface MaterialImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: () => void;
}

const SAMPLE = `name,sku,categoryId,subcategoryId,brand,supplier,unit,currentPrice,gst
Sample Tile,AF-TIL-001,interior,flooring_tiles,Kajaria,Kajaria Ceramics,sqft,95,18`;

export function MaterialImportDialog({ open, onOpenChange, onImported }: MaterialImportDialogProps) {
  const [csv, setCsv] = useState("");

  const handleImport = async () => {
    const lines = csv.trim().split("\n").filter(Boolean);
    if (lines.length < 2) {
      toast.error("Paste CSV with header row and at least one material");
      return;
    }
    const headers = lines[0].split(",").map((h) => h.trim());
    const rows: MaterialFormInput[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => { row[h] = values[idx] ?? ""; });
      if (!row.name || !row.sku) continue;
      rows.push({
        name: row.name,
        sku: row.sku,
        categoryId: row.categoryId || "interior",
        subcategoryId: row.subcategoryId || "general",
        brand: row.brand || "Generic",
        supplier: row.supplier || row.brand || "TBD",
        unit: row.unit || "nos",
        currentPrice: Number(row.currentPrice) || 0,
        gst: Number(row.gst) || 18,
        availability: "in_stock",
      });
    }
    if (rows.length === 0) {
      toast.error("No valid rows found");
      return;
    }
    await importMaterialRecords(rows);
    toast.success(`Imported ${rows.length} materials`);
    onImported();
    onOpenChange(false);
    setCsv("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Materials (CSV)</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Columns: name, sku, categoryId, subcategoryId, brand, supplier, unit, currentPrice, gst
          </p>
          <Label>Paste CSV</Label>
          <Textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            className="rounded-xl font-mono text-xs"
            placeholder={SAMPLE}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => { setCsv(SAMPLE); }}>Load Sample</Button>
            <Button className="rounded-xl" onClick={handleImport}>Import</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
