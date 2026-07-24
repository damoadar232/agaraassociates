import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { formatCurrency } from "@/lib/utils";
import { getProjectMaterials, getProjectPurchaseOrders, getProjectInvoices, getProjectApprovals, getProjectDocuments, getProjectActivities, getProjectSitePhotos, } from "@/lib/project-modules";
import "@/assets/styles/components/ProjectTabPanels.scss";

export async function ProjectMaterialsTab({ projectId }) {
    const materials = await getProjectMaterials(projectId);
    if (materials.length === 0) {
        return <EmptyTab message="No materials linked to this project." href="/materials" linkLabel="Open Material Library"/>;
    }
    return (<div className="project-tab-panels__grid">
      {materials.map((m) => (<Card key={m.id}>
          <CardContent className="project-tab-panels__card-content">
            <div className="project-tab-panels__card-main">
              <p className="project-tab-panels__card-title">{m.name}</p>
              <p className="project-tab-panels__card-meta">{m.brand} · {m.sku}</p>
            </div>
            <div className="project-tab-panels__card-side">
              <p className="project-tab-panels__price">₹{m.currentPrice.toLocaleString("en-IN")}/{m.unit}</p>
              <Badge variant="outline" className="project-tab-panels__badge">{m.availability.replace(/_/g, " ")}</Badge>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectProcurementTab({ projectId }) {
    const orders = getProjectPurchaseOrders(projectId);
    if (orders.length === 0) {
        return <EmptyTab message="No purchase orders yet." href="/procurement" linkLabel="Open Procurement"/>;
    }
    return (<div className="project-tab-panels__list">
      {orders.map((po) => (<Card key={po.id}>
          <CardContent className="project-tab-panels__card-content project-tab-panels__card-content--row">
            <div>
              <p className="project-tab-panels__card-title">{po.vendor}</p>
              <p className="project-tab-panels__card-meta">{po.items} items · Delivery {po.deliveryDate}</p>
            </div>
            <div className="project-tab-panels__actions">
              <span className="project-tab-panels__amount">{formatCurrency(po.amount)}</span>
              <Badge variant={po.status === "delivered" ? "success" : po.status === "cancelled" ? "destructive" : "outline"}>{po.status}</Badge>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectPaymentsTab({ projectId }) {
    const invoices = getProjectInvoices(projectId);
    if (invoices.length === 0) {
        return <EmptyTab message="No invoices for this project." href="/finance" linkLabel="Open Finance"/>;
    }
    return (<div className="project-tab-panels__list">
      {invoices.map((inv) => (<Card key={inv.id}>
          <CardContent className="project-tab-panels__card-content project-tab-panels__card-content--row">
            <div>
              <p className="project-tab-panels__card-title">{inv.clientName}</p>
              <p className="project-tab-panels__card-meta">Issued {inv.issuedDate} · Due {inv.dueDate}</p>
            </div>
            <div className="project-tab-panels__actions">
              <span className="project-tab-panels__amount">{formatCurrency(inv.amount)}</span>
              <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "destructive" : "warning"}>{inv.status}</Badge>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectApprovalsTab({ projectId }) {
    const approvals = getProjectApprovals(projectId);
    if (approvals.length === 0) {
        return <EmptyTab message="No approvals tracked." href="/approvals" linkLabel="Open Approvals"/>;
    }
    return (<div className="project-tab-panels__list">
      {approvals.map((a) => (<Card key={a.id}>
          <CardContent className="project-tab-panels__card-content project-tab-panels__card-content--row">
            <div>
              <p className="project-tab-panels__card-title">{a.title}</p>
              <p className="project-tab-panels__card-meta">{a.description}</p>
            </div>
            <div className="project-tab-panels__actions project-tab-panels__actions--badges">
              <Badge variant={a.priority === "high" ? "destructive" : a.priority === "medium" ? "warning" : "outline"}>{a.priority}</Badge>
              <Badge variant={a.status === "approved" ? "success" : a.status === "rejected" ? "destructive" : "secondary"}>{a.status}</Badge>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectDocumentsTab({ projectId }) {
    const docs = getProjectDocuments(projectId);
    if (docs.length === 0) {
        return <EmptyTab message="No documents uploaded." href="/documents" linkLabel="Open Documents"/>;
    }
    return (<div className="project-tab-panels__list">
      {docs.map((d) => (<Card key={d.id}>
          <CardContent className="project-tab-panels__card-content">
            <div>
              <p className="project-tab-panels__card-title">{d.name}</p>
              <p className="project-tab-panels__card-meta">{d.type} · {d.updatedAt}</p>
            </div>
            {d.size && <span className="project-tab-panels__card-meta">{d.size}</span>}
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectActivityTab({ projectId }) {
    const acts = getProjectActivities(projectId);
    if (acts.length === 0) {
        return <p className="project-tab-panels__empty-message">No activity recorded yet.</p>;
    }
    return (<div className="project-tab-panels__list">
      {acts.map((a) => (<Card key={a.id}>
          <CardContent className="project-tab-panels__activity-content">
            <div className="project-tab-panels__activity-header">
              <p className="project-tab-panels__activity-title">{a.title}</p>
              <span className="project-tab-panels__activity-date">{a.timestamp.split("T")[0]}</span>
            </div>
            <p className="project-tab-panels__activity-desc">{a.description}</p>
            <p className="project-tab-panels__activity-user">{a.userName}</p>
          </CardContent>
        </Card>))}
    </div>);
}

export function ProjectSitePhotosTab({ projectId }) {
    const photos = getProjectSitePhotos(projectId);
    if (photos.length === 0) {
        return <EmptyTab message="No site photos yet." href="/site-progress" linkLabel="Open Site Execution"/>;
    }
    return (<div className="project-tab-panels__grid-photos">
      {photos.map((photo) => (<Card key={photo.id} className="project-tab-panels__photo-card">
          <div className="project-tab-panels__photo-preview"/>
          <CardContent className="project-tab-panels__photo-body">
            <p className="project-tab-panels__photo-caption">{photo.caption}</p>
            <p className="project-tab-panels__photo-date">{photo.date}</p>
          </CardContent>
        </Card>))}
    </div>);
}

function EmptyTab({ message, href, linkLabel }) {
    return (<Card>
      <CardContent className="project-tab-panels__empty-content">
        <p>{message}</p>
        <Link to={href} className="project-tab-panels__empty-link">{linkLabel} →</Link>
      </CardContent>
    </Card>);
}
