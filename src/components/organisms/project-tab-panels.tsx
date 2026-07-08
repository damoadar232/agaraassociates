import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  getProjectMaterials,
  getProjectPurchaseOrders,
  getProjectInvoices,
  getProjectApprovals,
  getProjectDocuments,
  getProjectActivities,
  getProjectSitePhotos,
} from "@/lib/project-modules";

export async function ProjectMaterialsTab({ projectId }: { projectId: string }) {
  const materials = await getProjectMaterials(projectId);
  if (materials.length === 0) {
    return <EmptyTab message="No materials linked to this project." href="/materials" linkLabel="Open Material Library" />;
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {materials.map((m) => (
        <Card key={m.id} className="card-hover">
          <CardContent className="p-4 flex justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium truncate">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.brand} · {m.sku}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold tabular-nums">₹{m.currentPrice.toLocaleString("en-IN")}/{m.unit}</p>
              <Badge variant="outline" className="text-[10px] capitalize mt-1">{m.availability.replace(/_/g, " ")}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectProcurementTab({ projectId }: { projectId: string }) {
  const orders = getProjectPurchaseOrders(projectId);
  if (orders.length === 0) {
    return <EmptyTab message="No purchase orders yet." href="/procurement" linkLabel="Open Procurement" />;
  }
  return (
    <div className="space-y-3">
      {orders.map((po) => (
        <Card key={po.id} className="card-hover">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium">{po.vendor}</p>
              <p className="text-xs text-muted-foreground">{po.items} items · Delivery {po.deliveryDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">{formatCurrency(po.amount)}</span>
              <Badge variant={po.status === "delivered" ? "success" : po.status === "cancelled" ? "destructive" : "outline"}>{po.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectPaymentsTab({ projectId }: { projectId: string }) {
  const invoices = getProjectInvoices(projectId);
  if (invoices.length === 0) {
    return <EmptyTab message="No invoices for this project." href="/finance" linkLabel="Open Finance" />;
  }
  return (
    <div className="space-y-3">
      {invoices.map((inv) => (
        <Card key={inv.id} className="card-hover">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium">{inv.clientName}</p>
              <p className="text-xs text-muted-foreground">Issued {inv.issuedDate} · Due {inv.dueDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">{formatCurrency(inv.amount)}</span>
              <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "destructive" : "warning"}>{inv.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectApprovalsTab({ projectId }: { projectId: string }) {
  const approvals = getProjectApprovals(projectId);
  if (approvals.length === 0) {
    return <EmptyTab message="No approvals tracked." href="/approvals" linkLabel="Open Approvals" />;
  }
  return (
    <div className="space-y-3">
      {approvals.map((a) => (
        <Card key={a.id} className="card-hover">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={a.priority === "high" ? "destructive" : a.priority === "medium" ? "warning" : "outline"}>{a.priority}</Badge>
              <Badge variant={a.status === "approved" ? "success" : a.status === "rejected" ? "destructive" : "secondary"}>{a.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectDocumentsTab({ projectId }: { projectId: string }) {
  const docs = getProjectDocuments(projectId);
  if (docs.length === 0) {
    return <EmptyTab message="No documents uploaded." href="/documents" linkLabel="Open Documents" />;
  }
  return (
    <div className="space-y-3">
      {docs.map((d) => (
        <Card key={d.id} className="card-hover">
          <CardContent className="p-4 flex justify-between gap-3">
            <div>
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{d.type} · {d.updatedAt}</p>
            </div>
            {d.size && <span className="text-xs text-muted-foreground">{d.size}</span>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectActivityTab({ projectId }: { projectId: string }) {
  const acts = getProjectActivities(projectId);
  if (acts.length === 0) {
    return <p className="text-muted-foreground text-sm p-4">No activity recorded yet.</p>;
  }
  return (
    <div className="space-y-3">
      {acts.map((a) => (
        <Card key={a.id}>
          <CardContent className="p-4">
            <div className="flex justify-between gap-2">
              <p className="font-medium text-sm">{a.title}</p>
              <span className="text-[10px] text-muted-foreground shrink-0">{a.timestamp.split("T")[0]}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
            <p className="text-[10px] text-muted-foreground mt-2">{a.userName}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProjectSitePhotosTab({ projectId }: { projectId: string }) {
  const photos = getProjectSitePhotos(projectId);
  if (photos.length === 0) {
    return <EmptyTab message="No site photos yet." href="/site-progress" linkLabel="Open Site Execution" />;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <Card key={photo.id} className="card-hover overflow-hidden">
          <div className="h-36 bg-gradient-to-br from-slate-200 to-slate-300" />
          <CardContent className="p-3">
            <p className="text-sm font-medium">{photo.caption}</p>
            <p className="text-xs text-muted-foreground">{photo.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyTab({ message, href, linkLabel }: { message: string; href: string; linkLabel: string }) {
  return (
    <Card>
      <CardContent className="p-8 text-center text-muted-foreground">
        <p>{message}</p>
        <Link to={href} className="inline-flex mt-3 text-sm text-primary font-medium hover:underline">{linkLabel} →</Link>
      </CardContent>
    </Card>
  );
}
