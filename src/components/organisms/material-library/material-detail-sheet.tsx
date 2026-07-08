"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { MasterMaterial } from "@/types/material-library";
import { getCategoryLabel, getSubcategoryLabel } from "@/lib/materials/categories";
import { PriceChangeBadge } from "@/components/atoms/price-change-badge";
import { DatasheetViewer } from "@/components/organisms/material-library/datasheet-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Star,
  Archive,
  Pencil,
  FileText,
  ExternalLink,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MaterialDetailSheetProps {
  material: MasterMaterial | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit?: (material: MasterMaterial) => void;
  onRefresh?: () => void;
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === "") return null;
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

export function MaterialDetailSheet({
  material,
  onClose,
  onToggleFavorite,
  onArchive,
  onEdit,
}: MaterialDetailSheetProps) {
  const [datasheetOpen, setDatasheetOpen] = useState(false);
  if (!material) return null;

  const alternates: MasterMaterial[] = [];

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border/50 bg-surface/95 backdrop-blur-xl shadow-glass flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-4 py-3 border-b border-divider shrink-0">
          <h2 className="text-sm font-semibold">Material Details</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onToggleFavorite(material.id)}
            >
              <Star
                className={cn("h-4 w-4", material.isFavorite ? "fill-accent text-accent" : "")}
                strokeWidth={1.5}
              />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "h-36 rounded-2xl bg-gradient-to-br flex items-end p-4",
                material.imageGradient,
              )}
            >
              <div>
                <p className="text-white font-bold text-lg leading-tight">{material.name}</p>
                <p className="text-white/80 text-xs mt-1">{material.sku}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold tabular-nums">
                  ₹{material.currentPrice.toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-muted-foreground">/{material.unit}</span>
                </p>
                <p className="text-xs text-muted-foreground">Incl. GST {material.gst}% · MOQ {material.moq} {material.unit}</p>
              </div>
              <PriceChangeBadge current={material.currentPrice} previous={material.previousPrice} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{getCategoryLabel(material.categoryId)}</Badge>
              <Badge variant="secondary">{getSubcategoryLabel(material.categoryId, material.subcategoryId)}</Badge>
              <Badge
                variant={
                  material.availability === "in_stock"
                    ? "success"
                    : material.availability === "low_stock"
                      ? "warning"
                      : "outline"
                }
                className="capitalize"
              >
                {material.availability.replace(/_/g, " ")}
              </Badge>
            </div>

            {material.specification && (
              <p className="text-sm text-muted-foreground leading-relaxed">{material.specification}</p>
            )}

            <Separator />

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Specifications</h3>
              <DetailRow label="Brand" value={material.brand} />
              <DetailRow label="Manufacturer" value={material.manufacturer} />
              <DetailRow label="Supplier" value={material.supplier} />
              <DetailRow label="Size" value={material.size} />
              <DetailRow label="Thickness" value={material.thickness} />
              <DetailRow label="Color" value={material.color} />
              <DetailRow label="Finish" value={material.finish} />
              <DetailRow label="Grade" value={material.grade} />
              <DetailRow label="Lead Time" value={`${material.leadTimeDays} days`} />
              <DetailRow label="Stock Qty" value={material.stockQuantity} />
              <DetailRow label="Warranty" value={material.warranty} />
              <DetailRow label="Origin" value={material.countryOfOrigin} />
              <DetailRow label="Sustainability" value={material.sustainabilityRating} />
              <DetailRow label="Fire Rating" value={material.fireRating} />
              <DetailRow label="Standards" value={material.standards?.join(", ")} />
              <DetailRow label="Usage Count" value={material.usageCount} />
            </div>

            {material.vendors.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Vendors</h3>
                  <div className="space-y-2">
                    {material.vendors.map((v) => (
                      <div
                        key={v.id}
                        className={cn(
                          "flex justify-between items-center p-2.5 rounded-xl border text-sm",
                          v.isPreferred ? "border-accent/40 bg-accent/5" : "border-border/50",
                        )}
                      >
                        <div>
                          <p className="font-medium">{v.name}</p>
                          <p className="text-[10px] text-muted-foreground">{v.leadTimeDays}d lead</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold tabular-nums">₹{v.price.toLocaleString("en-IN")}</p>
                          {v.isPreferred && <Badge className="text-[9px] h-4 mt-0.5">Preferred</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {alternates.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Alternates</h3>
                  <div className="space-y-2">
                    {alternates.map((alt) => (
                      <div key={alt.id} className="flex justify-between items-center p-2.5 rounded-xl border border-border/50 text-sm">
                        <p className="font-medium line-clamp-1">{alt.name}</p>
                        <p className="text-success font-semibold tabular-nums shrink-0 ml-2">
                          ₹{alt.currentPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {material.remarks && (
              <>
                <Separator />
                <p className="text-sm text-muted-foreground italic">{material.remarks}</p>
              </>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5" asChild>
                <Link to="/boq"><Package className="h-3.5 w-3.5" /> Add to BOQ</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5" asChild>
                <Link to="/procurement"><ExternalLink className="h-3.5 w-3.5" /> Procure</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5" onClick={() => setDatasheetOpen(true)}>
                <FileText className="h-3.5 w-3.5" /> Datasheet
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-divider flex gap-2 shrink-0">
          <Button variant="outline" className="flex-1 rounded-xl gap-1.5" size="sm" onClick={() => onEdit?.(material)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
          <Button
            variant="outline"
            className="rounded-xl gap-1.5"
            size="sm"
            onClick={() => onArchive(material.id)}
          >
            <Archive className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <DatasheetViewer
        open={datasheetOpen}
        onOpenChange={setDatasheetOpen}
        materialName={material.name}
        datasheetUrl={material.datasheetUrl}
        sku={material.sku}
        brand={material.brand}
      />
    </>
  );
}
