import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllProjects } from "@/lib/store/project-store";
import { PageHeader } from "@/components/templates/page-header";
import { StatusChip } from "@/components/atoms/status-chip";
import { ProgressRing } from "@/components/atoms/progress-ring";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SERVICE_TYPE_LABELS } from "@/lib/constants/onboarding";
import { formatCurrency, getInitials } from "@/lib/utils";
export function ProjectsPage() {
    const projects = getAllProjects();
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Projects" description="Manage your architecture and design projects">
        <Button className="rounded-xl" asChild>
          <Link to="/app/projects/new">
            <Plus className="h-4 w-4"/> New Project
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (<Link key={project.id} to={`/app/projects/${project.id}`}>
            <Card className="card-hover h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.location}, {project.city}
                    </p>
                  </div>
                  <ProgressRing value={project.progress} size={64} strokeWidth={5}/>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.serviceTypes.slice(0, 3).map((service) => (<Badge key={service} variant={service === "construction" ? "secondary" : "outline"} className="text-[10px]">
                      {SERVICE_TYPE_LABELS[service]}
                    </Badge>))}
                  {project.serviceTypes.length > 3 && (<Badge variant="outline" className="text-[10px]">
                      +{project.serviceTypes.length - 3}
                    </Badge>)}
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-secondary text-white">
                      {getInitials(project.clientName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{project.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status={project.status}/>
                  <span className="text-xs text-muted-foreground ml-auto">{project.progress}% complete</span>
                </div>
                <Progress value={project.progress} className="h-1.5"/>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{formatCurrency(project.budget)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>))}
      </div>
    </div>);
}
