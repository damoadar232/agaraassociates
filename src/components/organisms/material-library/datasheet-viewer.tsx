"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DatasheetViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materialName: string;
  datasheetUrl?: string;
  sku: string;
  brand: string;
}

export function DatasheetViewer({ open, onOpenChange, materialName, datasheetUrl, sku, brand }: DatasheetViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Datasheet — {materialName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-xl border border-border/50 p-4 bg-muted/30 text-sm space-y-2">
            <p><span className="text-muted-foreground">SKU:</span> {sku}</p>
            <p><span className="text-muted-foreground">Brand:</span> {brand}</p>
            <p className="text-muted-foreground pt-2">
              Technical datasheet with specifications, installation guidelines, and warranty terms.
              {datasheetUrl ? " Linked document available below." : " Preview generated from library metadata."}
            </p>
          </div>
          <div className="h-64 rounded-xl border border-dashed border-border/60 bg-surface/50 flex items-center justify-center text-muted-foreground text-sm">
            PDF preview — {materialName}
          </div>
          {datasheetUrl && (
            <Button variant="outline" className="rounded-xl gap-1.5" asChild>
              <a href={datasheetUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Open full datasheet
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
