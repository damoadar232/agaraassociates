import { kanbanTasks as storeKanbanTasks } from "@/lib/store/project-store";
import { PageHeader } from "@/components/templates/page-header";
import { KanbanBoard } from "@/components/organisms/kanban-board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardHat } from "lucide-react";
const sitePhotos = [
    { id: "1", caption: "Living room marble installation", date: "2026-06-29" },
    { id: "2", caption: "Kitchen modular fitting progress", date: "2026-06-28" },
    { id: "3", caption: "Master bath tile work", date: "2026-06-27" },
    { id: "4", caption: "Electrical conduit routing", date: "2026-06-25" },
];
const dailyLogs = [
    { date: "2026-06-30", workers: 12, summary: "Marble polishing in master bedroom. 60% complete." },
    { date: "2026-06-29", workers: 14, summary: "Kitchen cabinet installation started. Plumbing checked." },
    { date: "2026-06-28", workers: 10, summary: "False ceiling work in living room. Electrical rough-in." },
];
const issues = [
    { id: "1", title: "Marble delivery delay", priority: "high", status: "open" },
    { id: "2", title: "Electrical point relocation", priority: "medium", status: "in_progress" },
    { id: "3", title: "Paint shade mismatch", priority: "low", status: "resolved" },
];
export function SiteProgressPage() {
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Site Progress" description="Track execution, inspections, and daily site activity"/>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex gap-3">
          <HardHat className="h-5 w-5 text-primary shrink-0"/>
          <p className="text-sm"><strong>Site Summary:</strong> Progress on track overall. Recurring issue: material delivery delays (3 instances this month). Consider buffer stock for critical items.</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="photos">Site Photos</TabsTrigger>
          <TabsTrigger value="logs">Daily Logs</TabsTrigger>
          <TabsTrigger value="issues">Issue Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-6">
          <KanbanBoard tasks={storeKanbanTasks}/>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sitePhotos.map((photo) => (<Card key={photo.id} className="card-hover overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300"/>
                <CardContent className="p-3">
                  <p className="text-sm font-medium">{photo.caption}</p>
                  <p className="text-xs text-muted-foreground">{photo.date}</p>
                </CardContent>
              </Card>))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-6 space-y-3">
          {dailyLogs.map((log) => (<Card key={log.date}>
              <CardContent className="p-4 flex gap-4">
                <div className="text-center shrink-0">
                  <p className="text-sm font-bold">{log.date.split("-")[2]}</p>
                  <p className="text-xs text-muted-foreground">Jun</p>
                </div>
                <div>
                  <p className="text-sm">{log.summary}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.workers} workers on site</p>
                </div>
              </CardContent>
            </Card>))}
        </TabsContent>

        <TabsContent value="issues" className="mt-6 space-y-3">
          {issues.map((issue) => (<Card key={issue.id} className="card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <p className="font-medium">{issue.title}</p>
                <div className="flex gap-2">
                  <Badge variant={issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "warning" : "outline"}>
                    {issue.priority}
                  </Badge>
                  <Badge variant="outline">{issue.status}</Badge>
                </div>
              </CardContent>
            </Card>))}
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Labour Attendance</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">12/14</p><p className="text-sm text-muted-foreground">Present today</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Material Consumption</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">₹1.2L</p><p className="text-sm text-muted-foreground">This week</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Inspection Reports</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Pending review</p></CardContent>
        </Card>
      </div>
    </div>);
}
