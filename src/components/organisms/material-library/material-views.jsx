"use client";
import { memo } from "react";
import { MATERIAL_CATEGORIES, getSubcategoryLabel } from "@/lib/materials/categories";
import { PriceChangeBadge } from "@/components/atoms/price-change-badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Star, GitCompare, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
function availabilityVariant(a) {
    if (a === "in_stock")
        return "success";
    if (a === "low_stock")
        return "warning";
    if (a === "made_to_order")
        return "outline";
    return "destructive";
}
function MaterialThumb({ material, size = "md" }) {
    const sizes = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-32 w-full" };
    return (<div className={cn("rounded-xl bg-gradient-to-br shrink-0 flex items-center justify-center", material.imageGradient, sizes[size], size === "lg" && "rounded-t-2xl rounded-b-none")}>
      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider px-2 text-center">
        {material.brand.slice(0, 3)}
      </span>
    </div>);
}
export const MaterialCard = memo(function MaterialCard({ material, selected, compareSelected, onSelect, onToggleFavorite, onToggleCompare, }) {
    return (<div className={cn("group rounded-2xl border bg-surface/60 backdrop-blur-sm transition-all hover:shadow-glass-sm cursor-pointer overflow-hidden", selected ? "border-accent ring-1 ring-accent/30" : "border-border/50 hover:border-border", compareSelected && "ring-2 ring-info/40")} onClick={() => onSelect(material)}>
      <div className="p-4 space-y-3">
        <div className="flex gap-3">
          <MaterialThumb material={material}/>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <p className="text-[13px] font-semibold leading-snug line-clamp-2">{material.name}</p>
              <button type="button" onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(material.id);
        }} className="shrink-0 p-1 rounded-lg hover:bg-surface-hover">
                <Star className={cn("h-3.5 w-3.5", material.isFavorite ? "fill-accent text-accent" : "text-muted-foreground")} strokeWidth={1.5}/>
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{material.sku}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{material.brand}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold tabular-nums">₹{material.currentPrice.toLocaleString("en-IN")}</span>
            <span className="text-[10px] text-muted-foreground">/{material.unit}</span>
          </div>
          <PriceChangeBadge current={material.currentPrice} previous={material.previousPrice}/>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge variant={availabilityVariant(material.availability)} className="text-[10px] capitalize">
            {material.availability.replace(/_/g, " ")}
          </Badge>
          <button type="button" onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(material.id);
        }} className={cn("p-1.5 rounded-lg transition-colors", compareSelected ? "bg-info/20 text-info" : "opacity-0 group-hover:opacity-100 hover:bg-surface-hover")}>
            <GitCompare className="h-3.5 w-3.5" strokeWidth={1.5}/>
          </button>
        </div>
      </div>
    </div>);
});
export function MaterialViews({ materials, viewMode, selectedId, compareIds, categoryId, subcategoryId, subcategoryCounts, onSelect, onToggleFavorite, onToggleCompare, onSelectSubcategory, }) {
    if (viewMode === "category_grid" && categoryId && !subcategoryId) {
        const cat = MATERIAL_CATEGORIES.find((c) => c.id === categoryId);
        const subCounts = categoryId ? subcategoryCounts[categoryId] ?? {} : {};
        if (cat) {
            return (<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cat.subcategories.map((sub) => (<button key={sub.id} type="button" onClick={() => onSelectSubcategory(categoryId, sub.id)} className="text-left p-4 rounded-2xl border border-border/50 bg-surface/50 hover:bg-surface-hover hover:border-accent/30 transition-all">
              <p className="font-semibold text-sm">{sub.label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {subCounts[sub.id] ?? 0} material{(subCounts[sub.id] ?? 0) !== 1 ? "s" : ""}
              </p>
            </button>))}
        </div>);
        }
    }
    if (materials.length === 0) {
        return (<div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="h-12 w-12 text-muted-foreground/40 mb-3"/>
        <p className="font-medium">No materials found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting filters or search terms</p>
      </div>);
    }
    if (viewMode === "table" || viewMode === "price_list") {
        return (<div className="rounded-2xl border border-border/50 overflow-hidden bg-surface/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface/80 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                {viewMode === "table" && <th className="p-3 w-8"/>}
                <th className="p-3">SKU</th>
                <th className="p-3 min-w-[200px]">Material</th>
                <th className="p-3">Brand</th>
                {viewMode === "table" && (<>
                    <th className="p-3">Category</th>
                    <th className="p-3">Unit</th>
                  </>)}
                <th className="p-3">Price</th>
                <th className="p-3">GST</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Lead</th>
                <th className="p-3 w-20"/>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (<tr key={m.id} className={cn("border-b hover:bg-surface-hover/80 cursor-pointer transition-colors", selectedId === m.id && "bg-accent/5")} onClick={() => onSelect(m)}>
                  {viewMode === "table" && (<td className="p-3">
                      <Star className={cn("h-3.5 w-3.5", m.isFavorite ? "fill-accent text-accent" : "text-muted-foreground/40")} onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(m.id);
                    }}/>
                    </td>)}
                  <td className="p-3 font-mono text-[11px] text-muted-foreground">{m.sku}</td>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 text-muted-foreground">{m.brand}</td>
                  {viewMode === "table" && (<>
                      <td className="p-3 text-[11px] text-muted-foreground max-w-[120px] truncate">
                        {getSubcategoryLabel(m.categoryId, m.subcategoryId)}
                      </td>
                      <td className="p-3">{m.unit}</td>
                    </>)}
                  <td className="p-3 font-semibold tabular-nums">₹{m.currentPrice.toLocaleString("en-IN")}</td>
                  <td className="p-3 tabular-nums">{m.gst}%</td>
                  <td className="p-3">
                    <Badge variant={availabilityVariant(m.availability)} className="text-[10px] capitalize">
                      {m.availability.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="p-3 tabular-nums text-muted-foreground">{m.leadTimeDays}d</td>
                  <td className="p-3">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onSelect(m); }}>
                      <Eye className="h-3.5 w-3.5"/>
                    </Button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>);
    }
    if (viewMode === "vendor") {
        const byVendor = materials.reduce((acc, m) => {
            const key = m.supplier;
            acc[key] = acc[key] ?? [];
            acc[key].push(m);
            return acc;
        }, {});
        return (<div className="space-y-6">
        {Object.entries(byVendor)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([vendor, items]) => (<div key={vendor}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                {vendor}
                <Badge variant="outline" className="text-[10px]">{items.length}</Badge>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((m) => (<MaterialCard key={m.id} material={m} selected={selectedId === m.id} compareSelected={compareIds.includes(m.id)} onSelect={onSelect} onToggleFavorite={onToggleFavorite} onToggleCompare={onToggleCompare}/>))}
              </div>
            </div>))}
      </div>);
    }
    if (viewMode === "brand") {
        const byBrand = materials.reduce((acc, m) => {
            acc[m.brand] = acc[m.brand] ?? [];
            acc[m.brand].push(m);
            return acc;
        }, {});
        return (<div className="space-y-6">
        {Object.entries(byBrand)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([brand, items]) => (<div key={brand}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                {brand}
                <Badge variant="outline" className="text-[10px]">{items.length}</Badge>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((m) => (<MaterialCard key={m.id} material={m} selected={selectedId === m.id} compareSelected={compareIds.includes(m.id)} onSelect={onSelect} onToggleFavorite={onToggleFavorite} onToggleCompare={onToggleCompare}/>))}
              </div>
            </div>))}
      </div>);
    }
    if (viewMode === "gallery") {
        return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {materials.map((m) => (<div key={m.id} className={cn("rounded-2xl border overflow-hidden cursor-pointer transition-all hover:shadow-glass-sm", selectedId === m.id ? "border-accent ring-1 ring-accent/30" : "border-border/50")} onClick={() => onSelect(m)}>
            <MaterialThumb material={m} size="lg"/>
            <div className="p-3 space-y-1">
              <p className="text-sm font-semibold line-clamp-2">{m.name}</p>
              <p className="text-[10px] text-muted-foreground">{m.brand} · {m.finish ?? m.color ?? m.unit}</p>
              <p className="text-sm font-bold tabular-nums">₹{m.currentPrice.toLocaleString("en-IN")}<span className="text-[10px] font-normal text-muted-foreground">/{m.unit}</span></p>
            </div>
          </div>))}
      </div>);
    }
    return (<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {materials.map((m) => (<MaterialCard key={m.id} material={m} selected={selectedId === m.id} compareSelected={compareIds.includes(m.id)} onSelect={onSelect} onToggleFavorite={onToggleFavorite} onToggleCompare={onToggleCompare}/>))}
    </div>);
}
