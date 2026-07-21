import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { getClientById } from "@/lib/store/client-store";
import { getProjectsForClient, getQuotationsForClient } from "@/lib/client-workspace";
import { getCommunicationsForClient } from "@/lib/project-modules";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusChip } from "@/components/atoms/status-chip";
import { formatCurrency, getInitials } from "@/lib/utils";
export function ClientDetailPage() {
    const { id } = useParams();
    const client = getClientById(id);
    if (!client)
        return <Navigate to="/clients" replace/>;
    const projects = getProjectsForClient(id);
    const quotations = getQuotationsForClient(id);
    const communications = getCommunicationsForClient(id);
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <Link to="/clients" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/> Back to Clients
      </Link>

      <PageHeader title={client.name} description={client.company ?? client.type}>
        <Badge variant="outline">{client.type}</Badge>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary">{getInitials(client.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{client.name}</p>
                {client.company && <p className="text-sm text-muted-foreground">{client.company}</p>}
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              {client.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4"/>{client.email}</p>}
              {client.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{client.phone}</p>}
              {client.city && <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{client.city}</p>}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t text-center">
              <div><p className="font-bold">{client.projectCount}</p><p className="text-[10px] text-muted-foreground">Projects</p></div>
              <div><p className="font-bold">{client.activeProjects}</p><p className="text-[10px] text-muted-foreground">Active</p></div>
              <div><p className="font-bold text-sm">{formatCurrency(client.totalRevenue)}</p><p className="text-[10px] text-muted-foreground">Revenue</p></div>
            </div>
            {client.notes && <p className="text-sm text-muted-foreground italic border-t pt-3">{client.notes}</p>}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Projects</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {projects.length === 0 ? (<p className="text-sm text-muted-foreground">No projects linked.</p>) : projects.map((p) => (<Link key={p.id} to={`/app/projects/${p.id}`} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/30">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.city} · {p.progress}% complete</p>
                  </div>
                  <StatusChip status={p.status}/>
                </Link>))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Quotations</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {quotations.length === 0 ? (<p className="text-sm text-muted-foreground">No quotations yet.</p>) : quotations.map((q) => (<Link key={q.id} to={`/quotations/${q.id}?client=${id}`} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/30">
                  <div>
                    <p className="font-medium">{q.title}</p>
                    <p className="text-xs text-muted-foreground">{q.projectName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(q.amount)}</p>
                    <StatusChip status={q.status} type="quotation"/>
                  </div>
                </Link>))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Communications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {communications.length === 0 ? (<p className="text-sm text-muted-foreground">No communication log.</p>) : communications.map((c) => (<div key={c.id} className="p-3 rounded-xl border">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm">{c.subject}</p>
                    <Badge variant="outline" className="capitalize text-[10px]">{c.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.summary}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{c.date}</p>
                </div>))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
}
