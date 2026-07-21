import { CONSTRUCTION_TYPE_OPTIONS, FOUNDATION_TYPE_OPTIONS, STRUCTURAL_SYSTEM_OPTIONS, CONSTRUCTION_METHOD_OPTIONS, } from "@/lib/constants/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { HardHat, Building, Ruler, Wallet, Users, Calendar, Wrench, Shield, FileCheck } from "lucide-react";
function labelFor(options, value) {
    return options.find((o) => o.value === value)?.label || value;
}
export function ConstructionDetailsPanel({ details, compact }) {
    if (compact) {
        return (<div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{labelFor(CONSTRUCTION_TYPE_OPTIONS, details.constructionType)}</Badge>
        <Badge variant="outline">{details.numberOfFloors} floors</Badge>
        <Badge variant="outline">{details.builtUpArea.toLocaleString()} sqft</Badge>
        <Badge variant="outline">{labelFor(CONSTRUCTION_METHOD_OPTIONS, details.constructionMethod)}</Badge>
      </div>);
    }
    return (<Card className="border-secondary/20 card-hover">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <HardHat className="h-5 w-5 text-secondary"/> Construction Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem icon={Building} label="Construction Type" value={labelFor(CONSTRUCTION_TYPE_OPTIONS, details.constructionType)}/>
          <InfoItem icon={Ruler} label="Built-up Area" value={`${details.builtUpArea.toLocaleString()} sqft`}/>
          <InfoItem icon={Ruler} label="Plot Area" value={`${details.plotArea.toLocaleString()} sqft`}/>
          <InfoItem icon={Building} label="Floors" value={String(details.numberOfFloors)}/>
          <InfoItem icon={Building} label="Foundation" value={labelFor(FOUNDATION_TYPE_OPTIONS, details.foundationType)}/>
          <InfoItem icon={Building} label="Structure" value={labelFor(STRUCTURAL_SYSTEM_OPTIONS, details.structuralSystem)}/>
          <InfoItem icon={Wrench} label="Method" value={labelFor(CONSTRUCTION_METHOD_OPTIONS, details.constructionMethod)}/>
          <InfoItem icon={Calendar} label="Mobilization" value={details.siteMobilizationDate}/>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><Wallet className="h-4 w-4"/> Total Budget</div>
            <p className="text-xl font-bold">{formatCurrency(details.estimatedConstructionBudget)}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Material Budget</p>
            <p className="text-lg font-semibold">{formatCurrency(details.materialBudget)}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Labour Budget</p>
            <p className="text-lg font-semibold">{formatCurrency(details.labourBudget)}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border">
          <div className="flex items-center gap-2 mb-2"><Users className="h-4 w-4 text-primary"/><span className="font-medium text-sm">Contractor</span></div>
          <p className="font-semibold">{details.contractor.company}</p>
          <p className="text-sm text-muted-foreground">{details.contractor.name} · {details.contractor.contact}</p>
          {details.contractor.license && <p className="text-xs text-muted-foreground mt-1">License: {details.contractor.license}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <TagList icon={Wrench} title="Machinery" items={details.requiredMachinery}/>
          <TagList icon={FileCheck} title="Approvals" items={details.requiredApprovals}/>
          <TagList icon={Shield} title="Safety Compliance" items={details.safetyCompliance}/>
        </div>

        {details.milestones.length > 0 && (<div>
            <p className="text-sm font-medium mb-3">Construction Milestones</p>
            <div className="space-y-2">
              {details.milestones.map((m, i) => (<div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 text-sm">
                  <span className="font-medium">{m.title}</span>
                  <span className="text-muted-foreground">{m.targetDate}</span>
                </div>))}
            </div>
          </div>)}
      </CardContent>
    </Card>);
}
function InfoItem({ icon: Icon, label, value }) {
    return (<div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Icon className="h-3.5 w-3.5"/>{label}</div>
      <p className="text-sm font-medium capitalize">{value}</p>
    </div>);
}
function TagList({ icon: Icon, title, items }) {
    if (items.length === 0)
        return null;
    return (<div>
      <div className="flex items-center gap-1.5 text-sm font-medium mb-2"><Icon className="h-4 w-4"/>{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (<Badge key={item} variant="outline" className="text-[10px] font-normal">{item}</Badge>))}
      </div>
    </div>);
}
