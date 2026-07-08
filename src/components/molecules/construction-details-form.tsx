"use client";

import { ConstructionDetails, ConstructionMilestoneInput } from "@/types";
import {
  CONSTRUCTION_TYPE_OPTIONS,
  FOUNDATION_TYPE_OPTIONS,
  STRUCTURAL_SYSTEM_OPTIONS,
  CONSTRUCTION_METHOD_OPTIONS,
  MACHINERY_OPTIONS,
  APPROVAL_OPTIONS,
  SAFETY_COMPLIANCE_OPTIONS,
} from "@/lib/constants/onboarding";
import { FormField } from "@/components/molecules/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HardHat, Plus, Trash2 } from "lucide-react";

export const EMPTY_CONSTRUCTION_DETAILS: ConstructionDetails = {
  constructionType: "villa",
  foundationType: "raft",
  structuralSystem: "rcc_frame",
  numberOfFloors: 2,
  plotArea: 0,
  builtUpArea: 0,
  contractor: { name: "", contact: "", company: "", license: "" },
  estimatedConstructionBudget: 0,
  materialBudget: 0,
  labourBudget: 0,
  constructionMethod: "conventional",
  siteMobilizationDate: "",
  requiredMachinery: [],
  requiredApprovals: [],
  safetyCompliance: [],
  milestones: [{ title: "Site Mobilization", targetDate: "" }],
};

interface ConstructionDetailsFormProps {
  value: ConstructionDetails;
  onChange: (details: ConstructionDetails) => void;
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
}) {
  const toggle = (item: string) => {
    onChange(selected.includes(item) ? selected.filter((s) => s !== item) : [...selected, item]);
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm cursor-pointer transition-colors",
            selected.includes(option) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
          )}
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded border-input"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export function ConstructionDetailsForm({ value, onChange }: ConstructionDetailsFormProps) {
  const update = <K extends keyof ConstructionDetails>(key: K, val: ConstructionDetails[K]) => {
    onChange({ ...value, [key]: val });
  };

  const updateContractor = (key: keyof ConstructionDetails["contractor"], val: string) => {
    onChange({ ...value, contractor: { ...value.contractor, [key]: val } });
  };

  const updateMilestone = (index: number, field: keyof ConstructionMilestoneInput, val: string) => {
    const milestones = [...value.milestones];
    milestones[index] = { ...milestones[index], [field]: val };
    onChange({ ...value, milestones });
  };

  const addMilestone = () => {
    onChange({ ...value, milestones: [...value.milestones, { title: "", targetDate: "" }] });
  };

  const removeMilestone = (index: number) => {
    onChange({ ...value, milestones: value.milestones.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
        <HardHat className="h-6 w-6 text-secondary shrink-0" />
        <div>
          <p className="font-semibold text-sm">Construction Details</p>
          <p className="text-xs text-muted-foreground">This information will populate BOQ, procurement, and site execution modules.</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Project Specifications</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Construction Type" required>
            <Select value={value.constructionType} onChange={(e) => update("constructionType", e.target.value as ConstructionDetails["constructionType"])}>
              {CONSTRUCTION_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Foundation Type" required>
            <Select value={value.foundationType} onChange={(e) => update("foundationType", e.target.value as ConstructionDetails["foundationType"])}>
              {FOUNDATION_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Structural System" required>
            <Select value={value.structuralSystem} onChange={(e) => update("structuralSystem", e.target.value as ConstructionDetails["structuralSystem"])}>
              {STRUCTURAL_SYSTEM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Construction Method" required>
            <Select value={value.constructionMethod} onChange={(e) => update("constructionMethod", e.target.value as ConstructionDetails["constructionMethod"])}>
              {CONSTRUCTION_METHOD_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Number of Floors" required>
            <Input type="number" min={1} value={value.numberOfFloors || ""} onChange={(e) => update("numberOfFloors", parseInt(e.target.value) || 0)} />
          </FormField>
          <FormField label="Site Mobilization Date" required>
            <Input type="date" value={value.siteMobilizationDate} onChange={(e) => update("siteMobilizationDate", e.target.value)} />
          </FormField>
          <FormField label="Plot Area (sqft)" required>
            <Input type="number" min={0} value={value.plotArea || ""} onChange={(e) => update("plotArea", parseInt(e.target.value) || 0)} />
          </FormField>
          <FormField label="Built-up Area (sqft)" required>
            <Input type="number" min={0} value={value.builtUpArea || ""} onChange={(e) => update("builtUpArea", parseInt(e.target.value) || 0)} />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Budget Breakdown</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <FormField label="Estimated Construction Budget (₹)" required>
            <Input type="number" min={0} value={value.estimatedConstructionBudget || ""} onChange={(e) => update("estimatedConstructionBudget", parseInt(e.target.value) || 0)} />
          </FormField>
          <FormField label="Material Budget (₹)" required>
            <Input type="number" min={0} value={value.materialBudget || ""} onChange={(e) => update("materialBudget", parseInt(e.target.value) || 0)} />
          </FormField>
          <FormField label="Labour Budget (₹)" required>
            <Input type="number" min={0} value={value.labourBudget || ""} onChange={(e) => update("labourBudget", parseInt(e.target.value) || 0)} />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Contractor Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="Contractor Name" required>
            <Input value={value.contractor.name} onChange={(e) => updateContractor("name", e.target.value)} placeholder="Vikram Patil" />
          </FormField>
          <FormField label="Company" required>
            <Input value={value.contractor.company} onChange={(e) => updateContractor("company", e.target.value)} placeholder="Patil Constructions Pvt Ltd" />
          </FormField>
          <FormField label="Contact Number" required>
            <Input value={value.contractor.contact} onChange={(e) => updateContractor("contact", e.target.value)} placeholder="+91 98765 43210" />
          </FormField>
          <FormField label="License Number">
            <Input value={value.contractor.license || ""} onChange={(e) => updateContractor("license", e.target.value)} placeholder="MH-CON-2019-4521" />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Required Machinery</CardTitle></CardHeader>
        <CardContent>
          <CheckboxGroup options={MACHINERY_OPTIONS} selected={value.requiredMachinery} onChange={(v) => update("requiredMachinery", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Required Approvals</CardTitle></CardHeader>
        <CardContent>
          <CheckboxGroup options={APPROVAL_OPTIONS} selected={value.requiredApprovals} onChange={(v) => update("requiredApprovals", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Safety Compliance Checklist</CardTitle></CardHeader>
        <CardContent>
          <CheckboxGroup options={SAFETY_COMPLIANCE_OPTIONS} selected={value.safetyCompliance} onChange={(v) => update("safetyCompliance", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Construction Milestones</CardTitle>
          <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={addMilestone}>
            <Plus className="h-4 w-4" /> Add Milestone
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {value.milestones.map((milestone, index) => (
            <div key={index} className="flex gap-3 items-end">
              <FormField label={index === 0 ? "Milestone" : undefined} className="flex-1">
                <Input value={milestone.title} onChange={(e) => updateMilestone(index, "title", e.target.value)} placeholder="Foundation Complete" />
              </FormField>
              <FormField label={index === 0 ? "Target Date" : undefined} className="w-40">
                <Input type="date" value={milestone.targetDate} onChange={(e) => updateMilestone(index, "targetDate", e.target.value)} />
              </FormField>
              {value.milestones.length > 1 && (
                <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-xl" onClick={() => removeMilestone(index)}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
