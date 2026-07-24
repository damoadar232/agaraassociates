import { Link, Navigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Calendar, MapPin, } from "lucide-react";
import { getProjectByIdFromStore, getMilestonesByProjectId, getRisksByProjectId, getBoqsByProjectId, } from "@/lib/store/project-store";
import { PageHeader } from "@/components/templates/page-header";
import { StatusChip } from "@/components/atoms/status-chip";
import { ProgressRing } from "@/components/atoms/progress-ring";
import { StatCard } from "@/components/cards/StatCard";
import { ConstructionDetailsPanel } from "@/components/organisms/construction-details-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/common/Badge";
import { SERVICE_TYPE_LABELS } from "@/lib/constants/onboarding";
import { formatCurrency } from "@/lib/utils";
import { getDrawingsByProjectId } from "@/lib/store/drawing-store";
import { getQuotationsByProjectId } from "@/lib/store/quotation-store";
import { ProjectMaterialsTab, ProjectProcurementTab, ProjectPaymentsTab, ProjectApprovalsTab, ProjectDocumentsTab, ProjectActivityTab, ProjectSitePhotosTab, } from "@/components/organisms/project-tab-panels";
import "@/assets/styles/pages/ProjectDetailPage.scss";

const TAB_ITEMS = [
    "Overview", "Design Files", "BOQ", "Materials", "Quotation",
    "Procurement", "Timeline", "Payments", "Approvals", "Site Photos", "Documents", "Activity",
];

const MILESTONE_DOT_CLASS = {
    completed: "project-detail-page__milestone-dot--completed",
    in_progress: "project-detail-page__milestone-dot--in-progress",
    delayed: "project-detail-page__milestone-dot--delayed",
};

function getMilestoneDotClass(status) {
    return `project-detail-page__milestone-dot ${MILESTONE_DOT_CLASS[status] ?? "project-detail-page__milestone-dot--pending"}`;
}

export function ProjectDetailPage() {
    const { id } = useParams();
    const project = getProjectByIdFromStore(id);
    if (!project)
        return <Navigate to="/app/projects" replace/>;
    const projectMilestones = getMilestonesByProjectId(id);
    const projectRisks = getRisksByProjectId(id);
    const projectDrawings = getDrawingsByProjectId(id);
    const projectBOQs = getBoqsByProjectId(id);
    const projectBOQ = projectBOQs[0];
    const projectQuotes = getQuotationsByProjectId(id);
    return (<div className="project-detail-page">
      <Link to="/app/projects" className="project-detail-page__back-link">
        <ArrowLeft /> Back to Projects
      </Link>

      <PageHeader title={project.name} description={project.description}>
        <StatusChip status={project.status}/>
      </PageHeader>

      <div className="project-detail-page__meta-row">
        <span><MapPin />{project.location}, {project.city}</span>
        <span><Calendar />Due {project.expectedCompletion}</span>
        <span>{project.clientName}</span>
      </div>

      <div className="project-detail-page__badges">
        {project.serviceTypes.map((s) => (<Badge key={s} variant={s === "construction" ? "secondary" : "outline"}>
            {SERVICE_TYPE_LABELS[s]}
          </Badge>))}
      </div>

      {project.constructionDetails && (<ConstructionDetailsPanel details={project.constructionDetails}/>)}

      <Tabs defaultValue="overview">
        <TabsList className="project-detail-page__tabs-list">
          {TAB_ITEMS.map((tab) => (<TabsTrigger key={tab} value={tab.toLowerCase().replace(/\s+/g, "-")} className="project-detail-page__tab-trigger">
              {tab}
            </TabsTrigger>))}
        </TabsList>

        <TabsContent value="overview" className="project-detail-page__tab-panel project-detail-page__tab-panel--stack">
          <div className="project-detail-page__overview-grid">
            <Card className="project-detail-page__progress-card">
              <ProgressRing value={project.progress} label="Complete"/>
            </Card>
            <StatCard title="Budget" value={formatCurrency(project.budget)}/>
            <StatCard title="Spent" value={formatCurrency(project.spent)}/>
            <StatCard title="Profit" value={formatCurrency(project.profit)} trend={{ value: `${Math.round((project.profit / project.budget) * 100)}% margin`, positive: true }}/>
          </div>

          <div className="project-detail-page__detail-grid">
            <Card className="project-detail-page__budget-card">
              <CardHeader><CardTitle className="project-detail-page__card-title">Budget vs Actual</CardTitle></CardHeader>
              <CardContent className="project-detail-page__budget-content">
                <div className="project-detail-page__budget-row">
                  <span className="project-detail-page__budget-label">Budget</span>
                  <span className="project-detail-page__budget-value">{formatCurrency(project.budget)}</span>
                </div>
                <div className="project-detail-page__budget-row">
                  <span className="project-detail-page__budget-label">Spent</span>
                  <span className="project-detail-page__budget-value">{formatCurrency(project.spent)}</span>
                </div>
                <div className="project-detail-page__budget-total">
                  <span>Remaining</span>
                  <span>{formatCurrency(project.budget - project.spent)}</span>
                </div>
                <ProgressRing value={Math.round((project.spent / project.budget) * 100)} size={100} label="Utilized"/>
              </CardContent>
            </Card>

            <Card className="project-detail-page__timeline-card">
              <CardHeader><CardTitle className="project-detail-page__card-title">Project Timeline</CardTitle></CardHeader>
              <CardContent className="project-detail-page__timeline-content">
                {projectMilestones.map((ms) => (<div key={ms.id} className="project-detail-page__milestone">
                    <div className={getMilestoneDotClass(ms.status)}/>
                    <div className="project-detail-page__milestone-info">
                      <p className="project-detail-page__milestone-title">{ms.title}</p>
                      <p className="project-detail-page__milestone-date">{ms.date}</p>
                    </div>
                    <Badge variant={ms.status === "completed" ? "success" : ms.status === "in_progress" ? "default" : "outline"}>
                      {ms.status.replace("_", " ")}
                    </Badge>
                  </div>))}
              </CardContent>
            </Card>
          </div>

          {projectRisks.length > 0 && (<Card className="project-detail-page__risk-card">
              <CardHeader>
                <CardTitle className="project-detail-page__risk-title">
                  <AlertTriangle /> Risk Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="project-detail-page__risk-content">
                {projectRisks.map((risk) => (<div key={risk.id} className="project-detail-page__risk-item">
                    <AlertTriangle />
                    <div>
                      <p className="project-detail-page__risk-type">{risk.type}</p>
                      <p className="project-detail-page__risk-description">{risk.description}</p>
                    </div>
                  </div>))}
              </CardContent>
            </Card>)}
        </TabsContent>

        <TabsContent value="design-files" className="project-detail-page__tab-panel">
          <div className="project-detail-page__drawings-grid">
            {projectDrawings.map((d) => (<Card key={d.id} className="project-detail-page__drawing-card">
                <CardContent className="project-detail-page__drawing-content">
                  <div className="project-detail-page__drawing-preview">
                    <span className="project-detail-page__drawing-type">{d.type.replace("_", " ")}</span>
                  </div>
                  <div>
                    <p className="project-detail-page__drawing-name">{d.name}</p>
                    <p className="project-detail-page__drawing-meta">{d.version} · {d.updatedAt}</p>
                  </div>
                  <Badge variant={d.status === "approved" ? "success" : "warning"}>{d.status.replace("_", " ")}</Badge>
                </CardContent>
              </Card>))}
          </div>
        </TabsContent>

        <TabsContent value="boq" className="project-detail-page__tab-panel">
          {projectBOQ ? (<Card>
              <CardHeader>
                <CardTitle>{projectBOQ.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="project-detail-page__boq-table-wrap">
                  <table className="project-detail-page__boq-table">
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectBOQ.items.map((item) => {
                const total = item.quantity * item.rate * (1 + item.gst / 100) + item.labour;
                return (<tr key={item.id}>
                            <td>{item.room}</td>
                            <td>{item.item}</td>
                            <td>{item.quantity} {item.unit}</td>
                            <td>₹{item.rate}</td>
                            <td>{formatCurrency(total)}</td>
                          </tr>);
            })}
                    </tbody>
                  </table>
                </div>
                <ButtonLink to={`/boq/${projectBOQ.id}`}/>
              </CardContent>
            </Card>) : (<p className="project-detail-page__empty-text">No BOQ created yet.</p>)}
        </TabsContent>

        <TabsContent value="quotation" className="project-detail-page__tab-panel">
          <div className="project-detail-page__quotes-list">
            {projectQuotes.map((q) => (<Card key={q.id}>
                <CardContent className="project-detail-page__quote-content">
                  <div>
                    <p className="project-detail-page__quote-title">{q.title}</p>
                    <p className="project-detail-page__quote-meta">{q.versions.length} versions</p>
                  </div>
                  <div className="project-detail-page__quote-right">
                    <p className="project-detail-page__quote-amount">{formatCurrency(q.amount)}</p>
                    <StatusChip status={q.status} type="quotation"/>
                  </div>
                </CardContent>
              </Card>))}
          </div>
        </TabsContent>

        <TabsContent value="site-photos" className="project-detail-page__tab-panel">
          <ProjectSitePhotosTab projectId={id}/>
        </TabsContent>

        <TabsContent value="timeline" className="project-detail-page__tab-panel">
          <Card>
            <CardHeader><CardTitle className="project-detail-page__card-title">Project Timeline</CardTitle></CardHeader>
            <CardContent className="project-detail-page__timeline-content">
              {projectMilestones.length > 0 ? projectMilestones.map((ms) => (<div key={ms.id} className="project-detail-page__milestone">
                  <div className={getMilestoneDotClass(ms.status)}/>
                  <div className="project-detail-page__milestone-info">
                    <p className="project-detail-page__milestone-title">{ms.title}</p>
                    <p className="project-detail-page__milestone-date">{ms.date}</p>
                  </div>
                  <Badge variant={ms.status === "completed" ? "success" : ms.status === "in_progress" ? "default" : "outline"}>
                    {ms.status.replace("_", " ")}
                  </Badge>
                </div>)) : (<p className="project-detail-page__empty-text">No milestones yet.</p>)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="project-detail-page__tab-panel">
          <ProjectMaterialsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="procurement" className="project-detail-page__tab-panel">
          <ProjectProcurementTab projectId={id}/>
        </TabsContent>

        <TabsContent value="payments" className="project-detail-page__tab-panel">
          <ProjectPaymentsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="approvals" className="project-detail-page__tab-panel">
          <ProjectApprovalsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="documents" className="project-detail-page__tab-panel">
          <ProjectDocumentsTab projectId={id}/>
        </TabsContent>

        <TabsContent value="activity" className="project-detail-page__tab-panel">
          <ProjectActivityTab projectId={id}/>
        </TabsContent>
      </Tabs>
    </div>);
}
function ButtonLink({ to }) {
    return (<Link to={to} className="project-detail-page__boq-link">
      Open full BOQ builder →
    </Link>);
}
