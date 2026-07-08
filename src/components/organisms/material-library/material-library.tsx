"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Upload,
  Download,
  LayoutGrid,
  Table2,
  Truck,
  Tag,
  List,
  ImageIcon,
  SlidersHorizontal,
  GitCompare,
  X,
} from "lucide-react";
import { MaterialCategorySidebar } from "@/components/organisms/material-library/material-category-sidebar";
import { MaterialViews } from "@/components/organisms/material-library/material-views";
import { MaterialDetailSheet } from "@/components/organisms/material-library/material-detail-sheet";
import { PageHeader } from "@/components/templates/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { DEFAULT_MATERIAL_FILTERS, MaterialLibraryFilters, MaterialViewMode, MasterMaterial, MaterialAvailability } from "@/types/material-library";
import { getCategoryLabel, getSubcategoryLabel } from "@/lib/materials/categories";
import { cn } from "@/lib/utils";
import { MaterialFormDialog } from "@/components/organisms/material-library/material-form-dialog";
import { MaterialImportDialog } from "@/components/organisms/material-library/material-import-dialog";
import { archiveMaterialRecord } from "@/services/materialsService";
import { useMaterialMeta, useMaterialsPage } from "@/lib/hooks/use-materials";

const VIEW_MODES: { id: MaterialViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { id: "category_grid", label: "Categories", icon: LayoutGrid },
  { id: "table", label: "Table", icon: Table2 },
  { id: "vendor", label: "Vendor", icon: Truck },
  { id: "brand", label: "Brand", icon: Tag },
  { id: "price_list", label: "Price List", icon: List },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
];

export function MaterialLibrary() {
  const [filters, setFilters] = useState<MaterialLibraryFilters>(DEFAULT_MATERIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<MaterialViewMode>("table");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["interior", "civil_construction"]));
  const [selectedMaterial, setSelectedMaterial] = useState<MasterMaterial | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareCache, setCompareCache] = useState<Record<string, MasterMaterial>>({});
  const [showCompare, setShowCompare] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((v) => v + 1);

  const { meta } = useMaterialMeta();
  const { result, loading, toggleFavorite } = useMaterialsPage(filters, page, 50);

  useEffect(() => {
    setPage(1);
  }, [filters, refreshKey]);

  const stats = meta?.stats ?? { total: 0, inStock: 0, lowStock: 0, favorites: 0, brands: 0, vendors: 0 };
  const brands = meta?.brands ?? [];
  const vendors = meta?.vendors ?? [];
  const filteredMaterials = result?.materials ?? [];
  const totalCount = result?.meta.total ?? 0;
  const totalPages = result?.meta.totalPages ?? 1;

  const updateFilters = useCallback((patch: Partial<MaterialLibraryFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleSelectCategory = (categoryId: string | null, subcategoryId: string | null) => {
    updateFilters({ categoryId, subcategoryId });
    if (subcategoryId) setViewMode("table");
  };

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    if (selectedMaterial?.id === id) {
      setSelectedMaterial((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
    refresh();
  };

  const handleToggleCompare = (id: string) => {
    const material = filteredMaterials.find((m) => m.id === id);
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) {
        toast.error("Compare up to 4 materials at a time");
        return prev;
      }
      if (material) {
        setCompareCache((cache) => ({ ...cache, [id]: material }));
      }
      return [...prev, id];
    });
  };

  const compareMaterials = compareIds
    .map((id) => compareCache[id] ?? filteredMaterials.find((m) => m.id === id))
    .filter(Boolean) as MasterMaterial[];

  const breadcrumb =
    filters.categoryId && filters.subcategoryId
      ? `${getCategoryLabel(filters.categoryId)} › ${getSubcategoryLabel(filters.categoryId, filters.subcategoryId)}`
      : filters.categoryId
        ? getCategoryLabel(filters.categoryId)
        : filters.quickFilter === "favorites"
          ? "Favorites"
          : filters.quickFilter === "recent"
            ? "Recently Used"
            : filters.quickFilter === "frequent"
              ? "Frequently Used"
              : "All Materials";

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-6">
      <PageHeader
        title="Master Material Library"
        description="Single source of truth for materials across BOQ, quotations, procurement, and site execution — 1,700+ Agara library items"
      >
        <Button variant="outline" className="rounded-xl gap-1.5" onClick={() => setImportOpen(true)}>
          <Upload className="h-4 w-4" /> Import
        </Button>
        <Button variant="outline" className="rounded-xl gap-1.5" onClick={() => toast.success("Export started", { description: `${totalCount} materials exported to CSV` })}>
          <Download className="h-4 w-4" /> Export
        </Button>
        <Button className="rounded-xl gap-1.5" onClick={() => { setSelectedMaterial(null); setAddOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Material
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {[
          { label: "Total Materials", value: stats.total },
          { label: "In Stock", value: stats.inStock },
          { label: "Low Stock", value: stats.lowStock },
          { label: "Favorites", value: stats.favorites },
          { label: "Brands", value: stats.brands },
          { label: "Vendors", value: stats.vendors },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/40 bg-surface/45 backdrop-blur-sm px-3 py-2.5"
          >
            <p className="text-lg font-bold tabular-nums">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-16rem)] lg:min-h-[520px]">
        <div className="lg:w-[260px] shrink-0 lg:h-full">
          <MaterialCategorySidebar
            selectedCategoryId={filters.categoryId}
            selectedSubcategoryId={filters.subcategoryId}
            expandedCategories={expandedCategories}
            quickFilter={filters.quickFilter}
            categoryCounts={meta?.categoryCounts ?? {}}
            subcategoryCounts={meta?.subcategoryCounts ?? {}}
            onSelectCategory={handleSelectCategory}
            onToggleExpand={handleToggleExpand}
            onQuickFilter={(qf) => updateFilters({ quickFilter: qf, categoryId: null, subcategoryId: null })}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 min-h-0 rounded-3xl border border-border/40 bg-surface/35 backdrop-blur-sm overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-divider space-y-3 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, SKU, brand, supplier, specification..."
                  className="pl-9 rounded-xl"
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                      <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                      {(filters.brands.length + filters.vendors.length + filters.availability.length + (filters.priceMin != null ? 1 : 0) + (filters.priceMax != null ? 1 : 0)) > 0 && (
                        <Badge className="h-4 px-1 text-[9px]">{filters.brands.length + filters.vendors.length + filters.availability.length + (filters.priceMin != null ? 1 : 0) + (filters.priceMax != null ? 1 : 0)}</Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Availability</DropdownMenuLabel>
                    {(["in_stock", "low_stock", "out_of_stock", "made_to_order"] as MaterialAvailability[]).map((a) => (
                      <DropdownMenuItem
                        key={a}
                        onSelect={(e) => {
                          e.preventDefault();
                          const checked = !filters.availability.includes(a);
                          updateFilters({
                            availability: checked
                              ? [...filters.availability, a]
                              : filters.availability.filter((x) => x !== a),
                          });
                        }}
                        className="capitalize"
                      >
                        <Check className={cn("h-3.5 w-3.5", filters.availability.includes(a) ? "opacity-100" : "opacity-0")} />
                        {a.replace(/_/g, " ")}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Price range (₹)</DropdownMenuLabel>
                    <div className="px-2 py-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <Input
                        type="number"
                        placeholder="Min"
                        className="h-8 rounded-lg text-xs"
                        value={filters.priceMin ?? ""}
                        onChange={(e) => updateFilters({ priceMin: e.target.value ? Number(e.target.value) : null })}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        className="h-8 rounded-lg text-xs"
                        value={filters.priceMax ?? ""}
                        onChange={(e) => updateFilters({ priceMax: e.target.value ? Number(e.target.value) : null })}
                      />
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Brand</DropdownMenuLabel>
                    {brands.slice(0, 12).map((b) => (
                      <DropdownMenuItem
                        key={b}
                        onSelect={(e) => {
                          e.preventDefault();
                          const checked = !filters.brands.includes(b);
                          updateFilters({
                            brands: checked
                              ? [...filters.brands, b]
                              : filters.brands.filter((x) => x !== b),
                          });
                        }}
                      >
                        <Check className={cn("h-3.5 w-3.5", filters.brands.includes(b) ? "opacity-100" : "opacity-0")} />
                        {b}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Vendor</DropdownMenuLabel>
                    {vendors.slice(0, 10).map((v) => (
                      <DropdownMenuItem
                        key={v}
                        onSelect={(e) => {
                          e.preventDefault();
                          const checked = !filters.vendors.includes(v);
                          updateFilters({
                            vendors: checked
                              ? [...filters.vendors, v]
                              : filters.vendors.filter((x) => x !== v),
                          });
                        }}
                      >
                        <Check className={cn("h-3.5 w-3.5", filters.vendors.includes(v) ? "opacity-100" : "opacity-0")} />
                        {v}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {compareIds.length > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-xl gap-1.5"
                    onClick={() => setShowCompare(true)}
                  >
                    <GitCompare className="h-3.5 w-3.5" /> Compare ({compareIds.length})
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">{breadcrumb}</h2>
                <p className="text-[11px] text-muted-foreground">{totalCount} materials</p>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin pb-0.5">
                {VIEW_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setViewMode(mode.id)}
                    className={cn(
                      "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium border transition-colors",
                      viewMode === mode.id
                        ? "glass-pill-active"
                        : "border-border/50 hover:bg-surface-hover",
                    )}
                  >
                    <mode.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin p-3 sm:p-4">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-xl bg-muted/40 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <MaterialViews
                  materials={filteredMaterials}
                  viewMode={viewMode}
                  selectedId={selectedMaterial?.id ?? null}
                  compareIds={compareIds}
                  categoryId={filters.categoryId}
                  subcategoryId={filters.subcategoryId}
                  subcategoryCounts={meta?.subcategoryCounts ?? {}}
                  onSelect={setSelectedMaterial}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleCompare={handleToggleCompare}
                  onSelectSubcategory={(catId, subId) => {
                    handleSelectCategory(catId, subId);
                    setViewMode("table");
                  }}
                />
                {totalPages > 1 && (viewMode === "table" || viewMode === "price_list" || viewMode === "gallery") && (
                  <div className="mt-4 flex items-center justify-between border-t border-divider pt-4">
                    <p className="text-xs text-muted-foreground">
                      Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedMaterial && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedMaterial(null)} />
          <MaterialDetailSheet
            material={selectedMaterial}
            onClose={() => setSelectedMaterial(null)}
            onToggleFavorite={handleToggleFavorite}
            onArchive={async (id) => {
              await archiveMaterialRecord(id);
              setSelectedMaterial(null);
              refresh();
              toast.success("Material archived");
            }}
            onEdit={(m) => {
              setSelectedMaterial(m);
              setAddOpen(true);
            }}
            onRefresh={refresh}
          />
        </>
      )}

      {showCompare && compareMaterials.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 lg:pl-[280px]">
          <div className="rounded-2xl border border-border/50 bg-surface/95 backdrop-blur-xl shadow-glass p-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <GitCompare className="h-4 w-4" /> Material Comparison
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowCompare(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {compareMaterials.map((m) => (
                <div key={m.id} className="p-3 rounded-xl border border-border/50 text-sm space-y-1">
                  <p className="font-semibold line-clamp-2 text-[12px]">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.brand}</p>
                  <p className="font-bold tabular-nums">₹{m.currentPrice.toLocaleString("en-IN")}/{m.unit}</p>
                  <p className="text-[10px] capitalize">{m.availability.replace(/_/g, " ")} · {m.leadTimeDays}d</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <MaterialFormDialog open={addOpen} onOpenChange={setAddOpen} material={selectedMaterial} onSaved={refresh} />
      <MaterialImportDialog open={importOpen} onOpenChange={setImportOpen} onImported={refresh} />
    </div>
  );
}
