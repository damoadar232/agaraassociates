"use client";

import { getAllClients } from "@/lib/store/client-store";
import { FormField } from "@/components/molecules/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type ClientPickerMode = "existing" | "new";

interface ClientPickerProps {
  mode: ClientPickerMode;
  clientId: string;
  newClientName: string;
  onModeChange: (mode: ClientPickerMode) => void;
  onClientIdChange: (id: string) => void;
  onNewClientNameChange: (name: string) => void;
  className?: string;
}

export function ClientPicker({
  mode,
  clientId,
  newClientName,
  onModeChange,
  onClientIdChange,
  onNewClientNameChange,
  className,
}: ClientPickerProps) {
  const clients = getAllClients();

  return (
    <FormField label="Client" required className={className}>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onModeChange("existing")}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors",
              mode === "existing"
                ? "border-primary bg-primary/10 text-foreground"
                : "hover:bg-muted"
            )}
          >
            Select existing
          </button>
          <button
            type="button"
            onClick={() => onModeChange("new")}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors",
              mode === "new"
                ? "border-primary bg-primary/10 text-foreground"
                : "hover:bg-muted"
            )}
          >
            Add new client
          </button>
        </div>

        {mode === "existing" ? (
          clients.length > 0 ? (
            <Select value={clientId} onChange={(e) => onClientIdChange(e.target.value)}>
              <option value="">Choose a client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}{c.company ? ` · ${c.company}` : ""}
                </option>
              ))}
            </Select>
          ) : (
            <p className="text-sm text-muted-foreground rounded-xl border border-dashed px-3 py-2">
              No clients yet. Switch to &quot;Add new client&quot; to enter a name.
            </p>
          )
        ) : (
          <Input
            value={newClientName}
            onChange={(e) => onNewClientNameChange(e.target.value)}
            placeholder="Client or company name"
            className="rounded-xl"
          />
        )}
      </div>
    </FormField>
  );
}

export function resolveClientDisplayName(
  mode: ClientPickerMode,
  clientId: string,
  newClientName: string
): string {
  if (mode === "new") return newClientName.trim();
  const client = getAllClients().find((c) => c.id === clientId);
  return client?.name ?? "";
}
