"use client";
import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Calculator, ClipboardList, Plus, Trash2 } from "lucide-react";
import { getProjectsForClient } from "@/lib/client-workspace";
import { getProjectByIdFromStore, createBoq } from "@/lib/store/project-store";
import { PROJECT_TYPE_OPTIONS, DEFAULT_ROOM_ROW, computeRoomAreas, getTakeoffTemplate, } from "@/lib/boq/takeoff-templates";
import { buildTakeoffSnapshot, generateBoqLinesFromTakeoff, } from "@/lib/boq/generate-boq-from-takeoff";
import { calculateBoqEstimate } from "@/lib/boq/estimate-calculator";
import { useMaterialCatalog } from "@/lib/hooks/use-material-catalog";
import { generateQuotationFromBoq } from "@/lib/boq/generate-quotation-from-boq";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
const STEPS = ["Setup", "Quantities", "Room Schedule", "Review & Estimate"];
export function BoqQuantityTakeoffWizard({ clientId }) {
    const navigate = useNavigate();
    const { catalog } = useMaterialCatalog();
    const projects = getProjectsForClient(clientId);
    const [step, setStep] = useState(0);
    const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
    const [title, setTitle] = useState("");
    const [projectType, setProjectType] = useState(projects[0]?.type ?? "residential");
    const [quantities, setQuantities] = useState({});
    const [rooms, setRooms] = useState([DEFAULT_ROOM_ROW()]);
    const [materialOverrides, setMaterialOverrides] = useState({});
    const template = useMemo(() => getTakeoffTemplate(projectType), [projectType]);
    const snapshot = useMemo(() => buildTakeoffSnapshot({ projectType, quantities, rooms, materialOverrides }), [projectType, quantities, rooms, materialOverrides]);
    const previewLines = useMemo(() => (catalog ? generateBoqLinesFromTakeoff(snapshot, catalog) : []), [snapshot, catalog]);
    const estimate = useMemo(() => calculateBoqEstimate(previewLines), [previewLines]);
    const setQty = (fieldId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [fieldId]: value === "" ? 0 : Number(value),
        }));
    };
    const updateRoom = (id, patch) => {
        setRooms((prev) => prev.map((r) => {
            if (r.id !== id)
                return r;
            const next = { ...r, ...patch };
            if ("length" in patch || "width" in patch || "height" in patch) {
                const areas = computeRoomAreas(next.length, next.width, next.height);
                next.floorArea = areas.floorArea;
                next.wallArea = areas.wallArea;
                next.ceilingArea = areas.ceilingArea;
                next.flooringQty = areas.floorArea;
                next.paintQty = areas.wallArea;
                next.falseCeilingQty = areas.ceilingArea;
            }
            return next;
        }));
    };
    const handleGenerate = (alsoQuotation) => {
        if (!projectId || !title.trim()) {
            toast.error("Select project and enter BOQ title");
            return;
        }
        if (previewLines.length === 0) {
            toast.error("Enter at least one quantity to generate estimate");
            return;
        }
        const boq = createBoq({
            projectId,
            title: title.trim(),
            items: previewLines,
            projectType,
            takeoffSnapshot: snapshot,
        });
        if (alsoQuotation) {
            const quote = generateQuotationFromBoq(boq, "by_trade");
            toast.success("BOQ and quotation created", {
                description: `${previewLines.length} line items · ${formatCurrency(estimate.grandTotal)}`,
            });
            navigate(`/quotations/${quote.id}?client=${clientId}`);
            return;
        }
        toast.success("BOQ estimate generated", {
            description: `${previewLines.length} items from material library pricing`,
        });
        navigate(`/boq/${boq.id}?client=${clientId}`);
    };
    const onProjectChange = (id) => {
        setProjectId(id);
        const project = getProjectByIdFromStore(id);
        if (project?.type)
            setProjectType(project.type);
    };
    return (<div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <Link to={`/boq?client=${clientId}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/> Back to BOQ
      </Link>

      <PageHeader title="Bill of Quantities — Quantity Takeoff" description="Fill building quantities by trade. Rates are pulled from the Master Material Library to generate your estimate."/>

      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (<Badge key={label} variant={step === i ? "default" : step > i ? "secondary" : "outline"} className="rounded-xl px-3 py-1">
            {i + 1}. {label}
          </Badge>))}
      </div>

      {step === 0 && (<Card>
          <CardHeader><CardTitle>Project Setup</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 max-w-2xl">
            <div className="space-y-2 sm:col-span-2">
              <Label>Project</Label>
              <Select value={projectId} onChange={(e) => onProjectChange(e.target.value)} className="rounded-xl">
                {projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>BOQ Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ground Floor — Full Interior BOQ" className="rounded-xl"/>
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="rounded-xl">
                {PROJECT_TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </Select>
              <p className="text-xs text-muted-foreground">
                Form fields adapt to {template.label.toLowerCase()} projects
              </p>
            </div>
          </CardContent>
        </Card>)}

      {step === 1 && (<Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5"/> Trade Quantities
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter measured quantities for civil, flooring, walls, paint, MEP, and fit-out items
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={template.sections[0]?.id}>
              <TabsList className="flex-wrap h-auto gap-1 mb-4">
                {template.sections.map((s) => (<TabsTrigger key={s.id} value={s.id} className="text-xs">
                    {s.label}
                  </TabsTrigger>))}
              </TabsList>
              {template.sections.map((section) => (<TabsContent key={section.id} value={section.id} className="space-y-4">
                  {section.description && (<p className="text-sm text-muted-foreground">{section.description}</p>)}
                  <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                          <th className="p-3 min-w-[200px]">Item</th>
                          <th className="p-3 w-28">Quantity</th>
                          <th className="p-3 w-20">Unit</th>
                          <th className="p-3 min-w-[180px]">Material (Library)</th>
                          <th className="p-3 w-24 text-right">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.fields.map((field) => {
                    const qty = quantities[field.id] ?? 0;
                    const materials = catalog?.getMaterialsForField(field) ?? [];
                    const selectedMaterialId = materialOverrides[field.id] ?? materials[0]?.id;
                    const material = catalog?.findMaterialForField(field, selectedMaterialId);
                    return (<tr key={field.id} className="border-b hover:bg-muted/20">
                              <td className="p-3">
                                <p className="font-medium">{field.label}</p>
                                {field.helpText && (<p className="text-[10px] text-muted-foreground">{field.helpText}</p>)}
                              </td>
                              <td className="p-3">
                                <Input type="number" min={0} value={qty || ""} onChange={(e) => setQty(field.id, e.target.value)} className="h-8 rounded-lg" placeholder={field.placeholder ?? "0"}/>
                              </td>
                              <td className="p-3 text-muted-foreground">{field.unit}</td>
                              <td className="p-3">
                                {materials.length > 0 ? (<Select value={selectedMaterialId ?? ""} onChange={(e) => setMaterialOverrides((prev) => ({
                                ...prev,
                                [field.id]: e.target.value,
                            }))} className="h-8 rounded-lg text-xs">
                                    {materials.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                                  </Select>) : (<span className="text-xs text-muted-foreground">No catalog match</span>)}
                              </td>
                              <td className="p-3 text-right tabular-nums">
                                {material ? `₹${material.currentPrice}` : "—"}
                              </td>
                            </tr>);
                })}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>))}
            </Tabs>
          </CardContent>
        </Card>)}

      {step === 2 && (<Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle>Room-wise Schedule</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Optional per-room breakdown — floor, wall, and ceiling areas auto-calculate from dimensions
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl gap-1" onClick={() => setRooms((prev) => [...prev, DEFAULT_ROOM_ROW()])}>
              <Plus className="h-4 w-4"/> Add Room
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm min-w-[960px]">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-muted-foreground text-xs">
                  <th className="p-2">Room</th>
                  <th className="p-2">Floor</th>
                  <th className="p-2">L (ft)</th>
                  <th className="p-2">W (ft)</th>
                  <th className="p-2">H (ft)</th>
                  <th className="p-2">Floor Area</th>
                  <th className="p-2">Wall Area</th>
                  <th className="p-2">Ceiling</th>
                  <th className="p-2">Flooring Qty</th>
                  <th className="p-2">Paint Qty</th>
                  <th className="p-2">False Ceiling</th>
                  <th className="p-2">Wall Tiles</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (<tr key={room.id} className="border-b">
                    <td className="p-1">
                      <Input value={room.name} onChange={(e) => updateRoom(room.id, { name: e.target.value })} placeholder="Living Room" className="h-8 rounded-lg min-w-[120px]"/>
                    </td>
                    <td className="p-1">
                      <Input value={room.floor} onChange={(e) => updateRoom(room.id, { floor: e.target.value })} className="h-8 rounded-lg w-20"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.length || ""} onChange={(e) => updateRoom(room.id, { length: Number(e.target.value) })} className="h-8 rounded-lg w-16"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.width || ""} onChange={(e) => updateRoom(room.id, { width: Number(e.target.value) })} className="h-8 rounded-lg w-16"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.height || ""} onChange={(e) => updateRoom(room.id, { height: Number(e.target.value) })} className="h-8 rounded-lg w-16"/>
                    </td>
                    <td className="p-2 tabular-nums text-muted-foreground">{room.floorArea}</td>
                    <td className="p-2 tabular-nums text-muted-foreground">{room.wallArea}</td>
                    <td className="p-2 tabular-nums text-muted-foreground">{room.ceilingArea}</td>
                    <td className="p-1">
                      <Input type="number" value={room.flooringQty || ""} onChange={(e) => updateRoom(room.id, { flooringQty: Number(e.target.value) })} className="h-8 rounded-lg w-20"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.paintQty || ""} onChange={(e) => updateRoom(room.id, { paintQty: Number(e.target.value) })} className="h-8 rounded-lg w-20"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.falseCeilingQty || ""} onChange={(e) => updateRoom(room.id, { falseCeilingQty: Number(e.target.value) })} className="h-8 rounded-lg w-20"/>
                    </td>
                    <td className="p-1">
                      <Input type="number" value={room.wallTilesQty || ""} onChange={(e) => updateRoom(room.id, { wallTilesQty: Number(e.target.value) })} className="h-8 rounded-lg w-20"/>
                    </td>
                    <td className="p-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setRooms((prev) => prev.filter((r) => r.id !== room.id))} disabled={rooms.length <= 1}>
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </CardContent>
        </Card>)}

      {step === 3 && (<div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5"/> Generated Estimate ({previewLines.length} lines)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto max-h-[420px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="p-3">Room / Area</th>
                      <th className="p-3">Material</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Rate</th>
                      <th className="p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewLines.map((line) => {
                const lineEst = calculateBoqEstimate([line]).grandTotal;
                return (<tr key={line.id} className="border-b">
                          <td className="p-3">{line.room}</td>
                          <td className="p-3">
                            <p className="font-medium line-clamp-1">{line.item}</p>
                            {line.sku && <p className="text-[10px] text-muted-foreground">{line.sku}</p>}
                          </td>
                          <td className="p-3 tabular-nums">{line.quantity} {line.unit}</td>
                          <td className="p-3 tabular-nums">₹{line.rate}</td>
                          <td className="p-3 tabular-nums font-medium">{formatCurrency(lineEst)}</td>
                        </tr>);
            })}
                  </tbody>
                </table>
                {previewLines.length === 0 && (<p className="p-8 text-center text-muted-foreground">No quantities entered yet.</p>)}
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit sticky top-24">
            <CardHeader><CardTitle>Estimate Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(estimate.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST</span><span>{formatCurrency(estimate.gst)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Labour</span><span>{formatCurrency(estimate.labour)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Margin</span><span>{formatCurrency(estimate.margin)}</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>{formatCurrency(estimate.grandTotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Pricing from Master Material Library · GST + labour + margin applied per line
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button className="rounded-xl w-full" onClick={() => handleGenerate(false)}>
                  Save BOQ Estimate
                </Button>
                <Button variant="outline" className="rounded-xl w-full" onClick={() => handleGenerate(true)}>
                  Save BOQ + Create Quotation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>)}

      <div className="flex justify-between pt-2">
        <Button variant="outline" className="rounded-xl" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="h-4 w-4"/> Previous
        </Button>
        {step < STEPS.length - 1 && (<Button className="rounded-xl" onClick={() => setStep((s) => s + 1)}>
            Next <ArrowRight className="h-4 w-4"/>
          </Button>)}
      </div>
    </div>);
}
