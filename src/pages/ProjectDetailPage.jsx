import { Link, Navigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Calendar, MapPin, } from "lucide-react";
import { getProjectByIdFromStore, getMilestonesByProjectId, getRisksByProjectId, getBoqsByProjectId, } from "@/lib/store/project-store";
import { PageHeader } from "@/components/templates/page-header";
import { StatusChip } from "@/components/atoms/status-chip";
import { ProgressRing } from "@/components/atoms/progress-ring";
import { StatCard } from "@/components/molecules/stat-card";
import { ConstructionDetailsPanel } from "@/components/organisms/construction-details-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SERVICE_TYPE_LABELS } from "@/lib/constants/onboarding";
import { formatCurrency } from "@/lib/utils";
import { getDrawingsByProjectId } from "@/lib/store/drawing-store";
import { getQuotationsByProjectId } from "@/lib/store/quotation-store";
import { ProjectMaterialsTab, ProjectProcurementTab, ProjectPaymentsTab, ProjectApprovalsTab, ProjectDocumentsTab, ProjectActivityTab, ProjectSitePhotosTab, } from "@/components/organisms/project-tab-panels";
const TAB_ITEMS = [
    "Overview", "Design Files", "BOQ", "Materials", "Quotation",
    "Procurement", "Timeline", "Payments", "Approvals", "Site Photos", "Documents", "Activity",
];
export function ProjectDetailPage() {
    const { id } = useParams();
    const project = getProjectByIdFromStore(id);
    if (!project)
        return <Navigate to="/projects" replace/>;
    const projectMilestones = getMilestonesByProjectId(id);
    const projectRisks = getRisksByProjectId(id);
    const projectDrawings = getDrawingsByProjectId(id);
    const projectBOQs = getBoqsByProjectId(id);
    const projectBOQ = projectBOQs[0];
    const projectQuotes = getQuotationsByProjectId(id);
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/> Back to Projects
      </Link>

      <PageHeader title={project.name} description={project.description}>
        <StatusChip status={project.status}/>
      </PageHeader>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/>{project.location}, {project.city}</span>
        <span className="flex items-center gap-1"><Calendar className="h-4 w-4"/>Due {project.expectedCompletion}</span>
        <span>{project.clientName}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.serviceTypes.map((s) => (<Badge key={s} variant={s === "construction" ? "secondary" : "outline"}>
            {SERVICE_TYPE_LABELS[s]}
          </Badge>))}
      </div>

      {project.constructionDetails && (<ConstructionDetailsPanel details={project.constructionDetails}/>)}

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap h-auto gap-1">
          {TAB_ITEMS.map((tab) => (<TabsTrigger key={tab} value={tab.toLowerCase().replace(/\s+/g, "-")} className="text-xs sm:text-sm">
              {tab}
            </TabsTrigger>))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="flex items-center justify-center p-6 card-hover">
              <ProgressRing value={project.progress} label="Complete"/>
            </Card>
            <StatCard title="Budget" value={formatCurrency(project.budget)}/>
            <StatCard title="Spent" value={formatCurrency(project.spent)}/>
            <StatCard title="Profit" value={formatCurrency(project.profit)} trend={{ value: `${Math.round((project.profit / project.budget) * 100)}% margin`, positive: true }}/>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader><CardTitle className="text-lg">Budget vs Actual</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-medium">{formatCurrency(project.spent)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span>Remaining</span>
                  <span>{formatCurrency(project.budget - project.spent)}</span>
                </div>
                <ProgressRing value={Math.round((project.spent / project.budget) * 100)} size={100} label="Utilized"/>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 card-hover">
              <CardHeader><CardTitle className="text-lg">Project Timeline</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {projectMilestones.map((ms) => (<div key={ms.id} className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full shrink-0 ${ms.status === "completed" ? "bg-success" :
                ms.status === "in_progress" ? "bg-primary" :
                    ms.status === "delayed" ? "bg-destructive" : "bg-muted"}`}/>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{ms.title}</p>
                      <p className="text-xs text-muted-foreground">{ms.date}</p>
                    </div>
                    <Badge variant={ms.status === "completed" ? "success" : ms.status === "in_progress" ? "default" : "outline"}>
                      {ms.status.replace("_", " ")}
                    </Badge>
                  </div>))}
              </CardContent>
            </Card>
          </div>

          {projectRisks.length > 0 && (<Card className="border-accent/30 card-hover">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent"/> Risk Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {projectRisks.map((risk) => (<div key={risk.id} className="flex items-start gap-3 p-3 rounded-xl bg-accent/5">
                    <AlertTriangle className="h-4 w-4 text-accent mt-0.5"/>
                    <div>
                      <p className="text-sm font-medium">{risk.type}</p>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                  </div>))}
              </CardContent>
            </Card>)}
        </TabsContent>

        <TabsContent value="design-files" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectDrawings.map((d) => (<Card key={d.id} className="card-hover cursor-pointer">
                <CardContent className="p-4 space-y-3">
                  <div className="h-32 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">{d.type.replace("_", " ").toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.version} · {d.updatedAt}</p>
                  </div>
                  <Badge variant={d.status === "approved" ? "success" : "warning"}>{d.status.replace("_", " ")}</Badge>
                </CardContent>
              </Card>))}
          </div>
        </TabsContent>

        <TabsContent value="boq" className="mt-6">
          {projectBOQ ? (<Card>
              <CardHeader>
                <CardTitle>{projectBOQ.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 pr-4">Room</th>
                        <th className="pb-3 pr-4">Item</th>
                        <th className="pb-3 pr-4">Qty</th>
                        <th className="pb-3 pr-4">Rate</th>
                        <th className="pb-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectBOQ.items.map((item) => {
                const total = item.quantity * item.rate * (1 + item.gst / 100) + item.labour;
                return (<tr key={item.id} className="border-b">
                            <td className="py-3 pr-4">{item.room}</td>
                            <td className="py-3 pr-4">{item.item}</td>
                            <td className="py-3 pr-4">{item.quantity} {item.unit}</td>
                            <td className="py-3 pr-4">₹{item.rate}</td>
                            <td className="py-3">{formatCurrency(total)}</td>
                          </tr>);
            })}
                    </tbody>
                  </table>
                </div>
                <ButtonLink to={`/boq/${projectBOQ.id}`}/>
              </CardContent>
            </Card>) : (<p className="text-muted-foreground">No BOQ created yet.</p>)}
        </TabsContent>

        <TabsContent value="quotation" className="mt-6">
          <div className="space-y-4">
            {projectQuotes.map((q) => (<Card key={q.id} className="card-hover">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{q.title}</p>
                    <p className="text-sm text-muted-foreground">{q.versions.length} versions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(q.amount)}</p>
                    <StatusChip status={q.status} type="quotation"/>
                  </div>
                </CardContent>
              </Card>))}
          </div>
        </TabsContent>

        <TabsContent value="site-photos" className="mt-6">
          <ProjectSitePhotosTab projectId={id}/>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card className="card-hover">
            <CardHeader><CardTitle className="text-lg">Project Timeline</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {projectMilestones.length > 0 ? projectMilestones.map((ms) => (<div key={ms.id} className="flex items-center gap-4">
                  <div className={`h-3 w-3 rounded-full shrink-0 ${ms.status === "completed" ? "bg-success" :
                ms.status === "in_progress" ? "bg-primary" :
                    ms.status === "delayed" ? "bg-destructive" : "bg-muted"}`}/>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ms.title}</p>
                    <p className="text-xs text-muted-foreground">{ms.date}</p>
                  </div>
                  <Badge variant={ms.status === "completed" ? "success" : ms.status === "in_progress" ? "default" : "outline"}>
                    {ms.status.replace("_", " ")}
                  </Badge>
                </div>)) : (<p className="text-muted-foreground text-sm">No milestones yet.</p>)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-6">
          <ProjectMaterialsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="procurement" className="mt-6">
          <ProjectProcurementTab projectId={id}/>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <ProjectPaymentsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <ProjectApprovalsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <ProjectDocumentsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ProjectActivityTab projectId={id}/>
        </TabsContent>
      </Tabs>
    </div>);
}
function ButtonLink({ to }) {
    return (<Link to={to} className="inline-flex mt-4 text-sm text-primary font-medium hover:underline">
      Open full BOQ builder →
    </Link>);
}
