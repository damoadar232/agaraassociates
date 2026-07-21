"use client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { createProject } from "@/services/projectsService";
import { ONBOARDING_STEPS, SERVICE_TYPE_LABELS } from "@/lib/constants/onboarding";
import { CURRENT_USER } from "@/lib/constants";
import { ServiceTypeSelector } from "@/components/molecules/service-type-selector";
import { ClientPicker, resolveClientDisplayName } from "@/components/molecules/client-picker";
import { ConstructionDetailsForm, EMPTY_CONSTRUCTION_DETAILS, } from "@/components/molecules/construction-details-form";
import { FormField } from "@/components/molecules/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
const TEAM_OPTIONS = ["Adarsh P", "Priya Nair", "Amit Joshi", "Sneha Iyer"];
export function ProjectOnboardingWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [clientMode, setClientMode] = useState("existing");
    const [clientId, setClientId] = useState("");
    const [newClientName, setNewClientName] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("residential");
    const [serviceTypes, setServiceTypes] = useState([]);
    const [constructionDetails, setConstructionDetails] = useState(EMPTY_CONSTRUCTION_DETAILS);
    const [startDate, setStartDate] = useState("");
    const [expectedCompletion, setExpectedCompletion] = useState("");
    const [team, setTeam] = useState([CURRENT_USER.name]);
    const hasConstruction = serviceTypes.includes("construction");
    const visibleSteps = ONBOARDING_STEPS.filter((s) => s.id !== "construction" || hasConstruction);
    const currentStep = visibleSteps[step];
    const isLastStep = step === visibleSteps.length - 1;
    const toggleTeam = (member) => {
        setTeam((prev) => prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]);
    };
    const validateStep = () => {
        if (currentStep.id === "basics") {
            if (!name.trim() || !location.trim() || !city.trim()) {
                toast.error("Please fill in all required project basics");
                return false;
            }
            if (clientMode === "existing" && !clientId) {
                toast.error("Please select a client or add a new one");
                return false;
            }
            if (clientMode === "new" && !newClientName.trim()) {
                toast.error("Please enter the client name");
                return false;
            }
        }
        if (currentStep.id === "services") {
            if (serviceTypes.length === 0) {
                toast.error("Select at least one service type");
                return false;
            }
        }
        if (currentStep.id === "construction") {
            const cd = constructionDetails;
            if (!cd.siteMobilizationDate || !cd.contractor.name || !cd.contractor.company || cd.plotArea <= 0 || cd.builtUpArea <= 0 || cd.estimatedConstructionBudget <= 0) {
                toast.error("Please complete all required construction fields");
                return false;
            }
        }
        if (currentStep.id === "team") {
            if (!startDate || !expectedCompletion) {
                toast.error("Please set project timeline dates");
                return false;
            }
        }
        return true;
    };
    const next = () => {
        if (!validateStep())
            return;
        setStep((s) => Math.min(s + 1, visibleSteps.length - 1));
    };
    const back = () => setStep((s) => Math.max(s - 1, 0));
    const submit = async () => {
        if (!validateStep())
            return;
        setSubmitting(true);
        const payload = {
            name: name.trim(),
            ...(clientMode === "existing" ? { clientId } : { clientName: newClientName.trim() }),
            location: location.trim(),
            city: city.trim(),
            description: description.trim(),
            startDate,
            expectedCompletion,
            serviceTypes,
            constructionDetails: hasConstruction ? constructionDetails : undefined,
            team,
            type,
        };
        try {
            const project = createProject(payload);
            toast.success("Project created successfully", {
                description: hasConstruction
                    ? "Construction details synced to BOQ, timeline, and site modules."
                    : "Your project workspace is ready.",
            });
            navigate(`/projects/${project.id}`);
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong");
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4"/> Back to Projects
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-1">Set up your project workspace in a few steps</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {visibleSteps.map((s, i) => (<div key={s.id} className="flex items-center gap-2 shrink-0">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors", i < step ? "bg-primary text-white" :
                i === step ? "bg-primary text-white ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground")}>
              {i < step ? <Check className="h-4 w-4"/> : i + 1}
            </div>
            <span className={cn("text-sm font-medium hidden sm:inline", i === step ? "text-foreground" : "text-muted-foreground")}>
              {s.label}
            </span>
            {i < visibleSteps.length - 1 && <div className="w-8 h-px bg-border mx-1"/>}
          </div>))}
      </div>

      {/* Step content */}
      {currentStep.id === "basics" && (<Card>
          <CardHeader><CardTitle>Project Basics</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField label="Project Name" required className="sm:col-span-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lakeside Residence" className="rounded-xl"/>
            </FormField>
            <ClientPicker mode={clientMode} clientId={clientId} newClientName={newClientName} onModeChange={setClientMode} onClientIdChange={setClientId} onNewClientNameChange={setNewClientName} className="sm:col-span-2"/>
            <FormField label="Project Category">
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
              </Select>
            </FormField>
            <FormField label="Location" required>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bandra West"/>
            </FormField>
            <FormField label="City" required>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai"/>
            </FormField>
            <FormField label="Description" className="sm:col-span-2">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project description..." rows={3}/>
            </FormField>
          </CardContent>
        </Card>)}

      {currentStep.id === "services" && (<div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">What services will this project include?</h2>
            <p className="text-sm text-muted-foreground mt-1">Select all that apply. Choosing Construction unlocks additional project-specific fields.</p>
          </div>
          <ServiceTypeSelector selected={serviceTypes} onChange={setServiceTypes}/>
        </div>)}

      {currentStep.id === "construction" && hasConstruction && (<ConstructionDetailsForm value={constructionDetails} onChange={setConstructionDetails}/>)}

      {currentStep.id === "team" && (<Card>
          <CardHeader><CardTitle>Team & Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Start Date" required>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              </FormField>
              <FormField label="Expected Completion" required>
                <Input type="date" value={expectedCompletion} onChange={(e) => setExpectedCompletion(e.target.value)}/>
              </FormField>
            </div>
            <FormField label="Assign Team Members">
              <div className="flex flex-wrap gap-2">
                {TEAM_OPTIONS.map((member) => (<button key={member} type="button" onClick={() => toggleTeam(member)} className={cn("rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors", team.includes(member) ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted")}>
                    {member}
                  </button>))}
              </div>
            </FormField>
          </CardContent>
        </Card>)}

      {currentStep.id === "review" && (<Card>
          <CardHeader><CardTitle>Review & Create</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div><span className="text-muted-foreground">Project</span><p className="font-semibold">{name}</p></div>
              <div><span className="text-muted-foreground">Client</span><p className="font-semibold">{resolveClientDisplayName(clientMode, clientId, newClientName)}</p></div>
              <div><span className="text-muted-foreground">Location</span><p className="font-semibold">{location}, {city}</p></div>
              <div><span className="text-muted-foreground">Timeline</span><p className="font-semibold">{startDate} → {expectedCompletion}</p></div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Services</p>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map((s) => (<Badge key={s} variant={s === "construction" ? "secondary" : "default"}>
                    {SERVICE_TYPE_LABELS[s]}
                  </Badge>))}
              </div>
            </div>
            {hasConstruction && (<div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 space-y-2 text-sm">
                <p className="font-semibold text-secondary">Construction Summary</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><span className="text-muted-foreground">Type:</span> {constructionDetails.constructionType}</p>
                  <p><span className="text-muted-foreground">Floors:</span> {constructionDetails.numberOfFloors}</p>
                  <p><span className="text-muted-foreground">Built-up:</span> {constructionDetails.builtUpArea.toLocaleString()} sqft</p>
                  <p><span className="text-muted-foreground">Budget:</span> {formatCurrency(constructionDetails.estimatedConstructionBudget)}</p>
                  <p><span className="text-muted-foreground">Contractor:</span> {constructionDetails.contractor.company}</p>
                  <p><span className="text-muted-foreground">Method:</span> {constructionDetails.constructionMethod}</p>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Will auto-create: {constructionDetails.milestones.length} timeline milestones, civil BOQ, and site kanban tasks.
                </p>
              </div>)}
          </CardContent>
        </Card>)}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" className="rounded-xl" onClick={back} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4"/> Back
        </Button>
        {isLastStep ? (<Button className="rounded-xl" onClick={submit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Check className="h-4 w-4"/>}
            Create Project
          </Button>) : (<Button className="rounded-xl" onClick={next}>
            Continue <ArrowRight className="h-4 w-4"/>
          </Button>)}
      </div>
    </div>);
}
