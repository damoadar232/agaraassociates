import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getQuotationById } from "@/lib/store/quotation-store";
import { QuotationDetailActions } from "@/components/organisms/quotation-detail-actions";
import { StatusChip } from "@/components/atoms/status-chip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
export function QuotationDetailPage() {
    const { id } = useParams();
    const quote = getQuotationById(id);
    if (!quote)
        return <Navigate to="/quotations" replace/>;
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <Link to="/quotations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/> Back to Quotations
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-4">
          <h3 className="font-semibold">Version History</h3>
          {quote.versions.map((v) => (<Card key={v.version} className={v.version === quote.versions.length ? "border-primary" : "card-hover"}>
              <CardContent className="p-4">
                <p className="font-medium">Version {v.version}</p>
                <p className="text-sm font-bold mt-1">{formatCurrency(v.amount)}</p>
                <p className="text-xs text-muted-foreground mt-1">{v.changes}</p>
                <p className="text-xs text-muted-foreground">{v.createdAt}</p>
              </CardContent>
            </Card>))}
        </div>

        <Card className="flex-1">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-xl sm:text-2xl">{quote.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{quote.clientName} · {quote.projectName}</p>
            </div>
            <div className="shrink-0">
              <StatusChip status={quote.status} type="quotation"/>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuotationDetailActions quoteId={quote.id} status={quote.status}/>
            <Separator />
            <div className="space-y-4">
              {quote.items.map((item, i) => (<div key={i} className="flex justify-between py-2 border-b">
                  <span>{item.description}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>))}
            </div>
            <div className="flex justify-between text-xl font-bold pt-4 border-t">
              <span>Total</span>
              <span>{formatCurrency(quote.amount)}</span>
            </div>
            <Card className="border-dashed bg-muted/30">
              <CardContent className="p-4 text-center text-sm text-muted-foreground">
                Client approval workflow — electronic signature placeholder
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>);
}
