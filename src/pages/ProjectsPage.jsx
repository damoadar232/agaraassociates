import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllProjects } from "@/lib/store/project-store";
import { PageHeader } from "@/components/templates/page-header";
import { StatusChip } from "@/components/atoms/status-chip";
import { ProgressRing } from "@/components/atoms/progress-ring";
import { Card, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/common/Avatar";
import { Badge } from "@/components/common/Badge";
import { SERVICE_TYPE_LABELS } from "@/lib/constants/onboarding";
import { formatCurrency, getInitials } from "@/lib/utils";
import "@/assets/styles/pages/ProjectsPage.scss";

export function ProjectsPage() {
    const projects = getAllProjects();
    return (<div className="projects-page">
      <PageHeader title="Projects" description="Manage your architecture and design projects">
        <Button className="projects-page__action-btn" asChild>
          <Link to="/app/projects/new">
            <Plus className="projects-page__action-icon"/> New Project
          </Link>
        </Button>
      </PageHeader>

      <div className="projects-page__grid">
        {projects.map((project) => (<Link key={project.id} to={`/app/projects/${project.id}`} className="projects-page__card-link">
            <Card className="projects-page__card">
              <CardContent className="projects-page__card-content">
                <div className="projects-page__card-top">
                  <div className="projects-page__card-heading">
                    <h3 className="projects-page__project-name">{project.name}</h3>
                    <p className="projects-page__project-location">
                      {project.location}, {project.city}
                    </p>
                  </div>
                  <ProgressRing value={project.progress} size={64} strokeWidth={5}/>
                </div>
                <div className="projects-page__badges">
                  {project.serviceTypes.slice(0, 3).map((service) => (<Badge key={service} variant={service === "construction" ? "secondary" : "outline"} className="projects-page__badge">
                      {SERVICE_TYPE_LABELS[service]}
                    </Badge>))}
                  {project.serviceTypes.length > 3 && (<Badge variant="outline" className="projects-page__badge">
                      +{project.serviceTypes.length - 3}
                    </Badge>)}
                </div>
                <div className="projects-page__client-row">
                  <Avatar className="projects-page__client-avatar">
                    <AvatarFallback className="projects-page__client-avatar-fallback">
                      {getInitials(project.clientName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="projects-page__client-name">{project.clientName}</span>
                </div>
                <div className="projects-page__status-row">
                  <StatusChip status={project.status}/>
                  <span className="projects-page__progress-label">{project.progress}% complete</span>
                </div>
                <Progress value={project.progress} className="projects-page__progress"/>
                <div className="projects-page__budget-row">
                  <span className="projects-page__budget-label">Budget</span>
                  <span className="projects-page__budget-value">{formatCurrency(project.budget)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>))}
      </div>
    </div>);
}
