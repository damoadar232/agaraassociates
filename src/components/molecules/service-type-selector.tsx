"use client";

import { ServiceType } from "@/types";
import { SERVICE_TYPE_OPTIONS } from "@/lib/constants/onboarding";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ServiceTypeSelectorProps {
  selected: ServiceType[];
  onChange: (types: ServiceType[]) => void;
}

export function ServiceTypeSelector({ selected, onChange }: ServiceTypeSelectorProps) {
  const toggle = (id: ServiceType) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_TYPE_OPTIONS.map((option) => {
        const isSelected = selected.includes(option.id);
        const Icon = option.icon;
        const isConstruction = option.id === "construction";

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                : "border-border hover:border-primary/30 hover:bg-muted/50",
              isConstruction && isSelected && "border-secondary bg-secondary/5 ring-secondary/20"
            )}
          >
            {isSelected && (
              <span className={cn(
                "absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full",
                isConstruction ? "bg-secondary text-white" : "bg-primary text-white"
              )}>
                <Check className="h-3 w-3" />
              </span>
            )}
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isSelected ? (isConstruction ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary") : "bg-muted text-muted-foreground"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{option.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
