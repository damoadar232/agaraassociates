import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllClients } from "@/lib/store/client-store";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils";
export function ClientsPage() {
    const clients = getAllClients();
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Clients" description="Client relationship management and contact directory">
        <Button className="rounded-xl" asChild>
          <Link to="/projects/new"><Plus className="h-4 w-4"/> Add via Project</Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (<Link key={client.id} to={`/clients/${client.id}`}>
          <Card className="card-hover h-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary text-foreground text-sm">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg truncate">{client.name}</h3>
                  {client.company && (<p className="text-sm text-muted-foreground truncate">{client.company}</p>)}
                </div>
                <Badge variant="outline">{client.type}</Badge>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                {client.email && <p className="truncate">{client.email}</p>}
                {client.phone && <p>{client.phone}</p>}
                {client.city && <p>{client.city}</p>}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t text-center">
                <div>
                  <p className="text-lg font-semibold tabular-nums">{client.projectCount}</p>
                  <p className="text-[10px] text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="text-lg font-semibold tabular-nums">{client.activeProjects}</p>
                  <p className="text-[10px] text-muted-foreground">Active</p>
                </div>
                <div>
                  <p className="text-sm font-semibold tabular-nums">{formatCurrency(client.totalRevenue)}</p>
                  <p className="text-[10px] text-muted-foreground">Revenue</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Last contact: {client.lastContact}</p>
            </CardContent>
          </Card>
          </Link>))}
      </div>
    </div>);
}
