"use client";
import { HardHat, Building2, Sofa, DoorOpen, ChefHat, Armchair, Zap, Droplets, Wind, Trees, Home, Shield, Package, ChevronRight, ChevronDown, Star, Clock, TrendingUp, LayoutGrid, } from "lucide-react";
import { MATERIAL_CATEGORIES, TOTAL_SUBCATEGORIES } from "@/lib/materials/categories";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
const ICON_MAP = {
    "hard-hat": HardHat,
    "building-2": Building2,
    sofa: Sofa,
    "door-open": DoorOpen,
    "chef-hat": ChefHat,
    armchair: Armchair,
    zap: Zap,
    droplets: Droplets,
    wind: Wind,
    trees: Trees,
    home: Home,
    shield: Shield,
    package: Package,
};
export function MaterialCategorySidebar({ selectedCategoryId, selectedSubcategoryId, expandedCategories, quickFilter, categoryCounts, subcategoryCounts, onSelectCategory, onToggleExpand, onQuickFilter, }) {
    const quickLinks = [
        { id: "all", label: "All Materials", icon: LayoutGrid },
        { id: "favorites", label: "Favorites", icon: Star },
        { id: "recent", label: "Recently Used", icon: Clock },
        { id: "frequent", label: "Frequently Used", icon: TrendingUp },
    ];
    return (<aside className="flex flex-col h-full min-h-0 rounded-3xl border border-border/40 bg-surface/45 backdrop-blur-lg shadow-glass-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-divider shrink-0">
        <h2 className="text-sm font-semibold">Categories</h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">{MATERIAL_CATEGORIES.length} main · {TOTAL_SUBCATEGORIES}+ sub</p>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2 space-y-0.5">
          {quickLinks.map((link) => (<button key={link.id} type="button" onClick={() => {
                onQuickFilter(link.id);
                onSelectCategory(null, null);
            }} className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors", quickFilter === link.id && !selectedCategoryId
                ? "glass-pill-active"
                : "hover:bg-surface-hover text-foreground")}>
              <link.icon className="h-4 w-4 shrink-0" strokeWidth={1.5}/>
              {link.label}
            </button>))}

          <div className="h-px bg-divider my-2 mx-2"/>

          {MATERIAL_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] ?? Package;
            const isExpanded = expandedCategories.has(cat.id);
            const isSelected = selectedCategoryId === cat.id && !selectedSubcategoryId;
            const count = categoryCounts[cat.id] ?? 0;
            const subCounts = subcategoryCounts[cat.id] ?? {};
            return (<div key={cat.id}>
                <button type="button" onClick={() => {
                    onQuickFilter("all");
                    onToggleExpand(cat.id);
                    onSelectCategory(cat.id, null);
                }} className={cn("w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors group", isSelected ? "glass-pill-active" : "hover:bg-surface-hover")}>
                  <span className="p-0.5 rounded-md hover:bg-surface-hover" onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand(cat.id);
                }}>
                    {isExpanded ? (<ChevronDown className="h-3.5 w-3.5 text-muted-foreground"/>) : (<ChevronRight className="h-3.5 w-3.5 text-muted-foreground"/>)}
                  </span>
                  <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5}/>
                  <span className="flex-1 text-[12px] font-medium leading-snug line-clamp-2">{cat.label}</span>
                  {count > 0 && (<span className="text-[10px] tabular-nums text-muted-foreground shrink-0">{count}</span>)}
                </button>

                {isExpanded && (<div className="ml-6 pl-2 border-l border-divider/60 space-y-0.5 mb-1">
                    {cat.subcategories.map((sub) => {
                        const subCount = subCounts[sub.id] ?? 0;
                        const isSubSelected = selectedCategoryId === cat.id && selectedSubcategoryId === sub.id;
                        return (<button key={sub.id} type="button" onClick={() => {
                                onQuickFilter("all");
                                onSelectCategory(cat.id, sub.id);
                            }} className={cn("w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors", isSubSelected
                                ? "bg-accent/15 text-foreground font-medium"
                                : "text-muted-foreground hover:bg-surface-hover hover:text-foreground")}>
                          <span className="truncate">{sub.label}</span>
                          {subCount > 0 && (<span className="tabular-nums shrink-0 opacity-70">{subCount}</span>)}
                        </button>);
                    })}
                  </div>)}
              </div>);
        })}
        </div>
      </ScrollArea>
    </aside>);
}
