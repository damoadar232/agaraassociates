"use client";
import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, ChevronRight, ArrowLeft } from "lucide-react";
import { getAllClients } from "@/lib/store/client-store";
import { getClientWorkspaceStats, resolveClientLabel } from "@/lib/client-workspace";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
export function ClientWorkspaceShell({ moduleTitle, moduleDescription, basePath, statLabels, headerActions, children, }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const clientId = searchParams.get("client") ?? "";
    const clients = getAllClients();
    const selectedClient = useMemo(() => clients.find((c) => c.id === clientId), [clients, clientId]);
    const selectClient = useCallback((id) => {
        navigate(`${basePath}?client=${encodeURIComponent(id)}`);
    }, [navigate, basePath]);
    const clearClient = useCallback(() => {
        navigate(basePath);
    }, [navigate, basePath]);
    if (!selectedClient) {
        return (<div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader title={moduleTitle} description={moduleDescription}/>

        <Card className="border-accent/25 bg-accent/5">
          <CardContent className="p-4 flex gap-3 items-start">
            <Users className="h-5 w-5 text-accent shrink-0 mt-0.5"/>
            <div>
              <p className="text-sm font-semibold">Select a client to continue</p>
              <p className="text-sm text-muted-foreground mt-1">
                {moduleTitle} is organized by client. Choose a client to view their projects, files, and records.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => {
                const stats = getClientWorkspaceStats(client.id);
                const itemCount = statLabels?.items === "quotations"
                    ? stats.quotationCount
                    : statLabels?.items === "boq"
                        ? stats.boqCount
                        : statLabels?.items === "drawings"
                            ? stats.drawingCount
                            : stats.projectCount;
                return (<button key={client.id} type="button" onClick={() => selectClient(client.id)} className="text-left rounded-2xl border border-border/50 bg-surface/50 p-5 hover:bg-surface-hover hover:border-accent/30 transition-all card-hover group">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary text-foreground text-sm">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{client.name}</p>
                    {client.company && (<p className="text-xs text-muted-foreground truncate">{client.company}</p>)}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="outline" className="text-[10px]">
                        {stats.projectCount} project{stats.projectCount !== 1 ? "s" : ""}
                      </Badge>
                      {itemCount > 0 && (<Badge variant="secondary" className="text-[10px]">
                          {itemCount} {statLabels?.itemLabel ?? "items"}
                        </Badge>)}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"/>
                </div>
              </button>);
            })}
        </div>
      </div>);
    }
    const clientName = resolveClientLabel(clientId);
    const stats = getClientWorkspaceStats(clientId);
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3 min-w-0 flex-1">
          <Button variant="ghost" size="sm" className="rounded-xl -ml-2 h-8 px-2 text-muted-foreground" onClick={clearClient}>
            <ArrowLeft className="h-4 w-4 mr-1"/> Change client
          </Button>
          <PageHeader title={moduleTitle} description={<span>
                <span className="font-medium text-foreground">{clientName}</span>
                <span className="text-muted-foreground"> · {stats.projectCount} active project{stats.projectCount !== 1 ? "s" : ""}</span>
              </span>}/>
        </div>
        {headerActions && <div className="flex items-center gap-2 shrink-0">{headerActions}</div>}
      </div>

      <div className={cn("flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border/50 bg-surface/60")}>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-foreground text-xs">
            {getInitials(selectedClient.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{selectedClient.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">
            {selectedClient.city}{selectedClient.type ? ` · ${selectedClient.type}` : ""}
          </p>
        </div>
        <Badge variant="outline" className="shrink-0 text-[10px]">Client workspace</Badge>
      </div>

      {children({ clientId, clientName: selectedClient.name })}
    </div>);
}
