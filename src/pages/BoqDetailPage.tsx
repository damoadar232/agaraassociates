import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Calculator, FileText } from "lucide-react";
import type { BOQ } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { calculateBoqEstimate } from "@/lib/boq/estimate-calculator";
import { useMaterialCatalog } from "@/lib/hooks/use-material-catalog";
import { updateBoqItems } from "@/lib/store/project-store";
import { generateQuotationFromBoq } from "@/lib/boq/generate-quotation-from-boq";
import { getBoqById } from "@/services/boqService";

export function BoqDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client") ?? "";
  const [boq, setBoq] = useState<BOQ | null | undefined>(undefined);
  const { catalog } = useMaterialCatalog();

  useEffect(() => {
    setBoq(getBoqById(id) ?? null);
  }, [id]);

  if (boq === undefined) {
    return <div className="p-8 text-muted-foreground">Loading...</div>;
  }
  if (!boq) {
    return <Navigate to="/boq" replace />;
  }

  const lineEstimates = boq.items.map((item) => ({
    item,
    ...calculateBoqEstimate([item]).lineEstimates[0],
  }));

  const summary = calculateBoqEstimate(boq.items);

  const handleRecalculate = () => {
    if (!catalog) return;
    const refreshed = boq.items.map((item) => catalog.refreshLineItemRates(item));
    updateBoqItems(boq.id, refreshed);
    setBoq({ ...boq, items: refreshed });
    const variances = refreshed.filter((line, index) => line.rate !== boq.items[index]?.rate).length;
    toast.success("Estimate recalculated from Material Library", {
      description: `${refreshed.length} lines updated · ${variances} rate changes applied`,
    });
  };

  const handleCreateQuotation = () => {
    const quote = generateQuotationFromBoq(boq, "by_trade");
    toast.success("Quotation created from BOQ");
    navigate(`/quotations/${quote.id}${clientId ? `?client=${clientId}` : ""}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Link
        to={clientId ? `/boq?client=${clientId}` : "/boq"}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to BOQ
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">{boq.title}</h1>
              <p className="text-muted-foreground">{boq.projectName}</p>
              {boq.projectType && (
                <Badge variant="outline" className="mt-2 capitalize">
                  {boq.projectType}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-xl" onClick={handleRecalculate}>
                <Calculator className="h-4 w-4" /> Recalculate from Library
              </Button>
              <Button className="rounded-xl" onClick={handleCreateQuotation}>
                <FileText className="h-4 w-4" /> Create Quotation
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                    <th className="p-3">Room</th>
                    <th className="p-3">Material / Item</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Rate</th>
                    <th className="p-3">GST</th>
                    <th className="p-3">Labour</th>
                    <th className="p-3">Margin</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineEstimates.map(({ item, total, gstAmount, labourAmount, marginAmount }) => (
                    <tr key={item.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">{item.room}</td>
                      <td className="p-3">
                        <p className="font-medium">{item.item}</p>
                        {item.sku && <p className="text-[10px] text-muted-foreground">{item.sku}</p>}
                      </td>
                      <td className="p-3">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3">₹{item.rate}</td>
                      <td className="p-3">{formatCurrency(gstAmount)}</td>
                      <td className="p-3">{formatCurrency(labourAmount)}</td>
                      <td className="p-3">{formatCurrency(marginAmount)}</td>
                      <td className="p-3 font-medium">{formatCurrency(total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:w-80 h-fit sticky top-24 card-hover">
          <CardHeader>
            <CardTitle>Estimate Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST</span>
              <span>{formatCurrency(summary.gst)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Labour</span>
              <span>{formatCurrency(summary.labour)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Margin</span>
              <span>{formatCurrency(summary.margin)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base">
              <span>Grand Total</span>
              <span>{formatCurrency(summary.grandTotal)}</span>
            </div>
            {boq.takeoffSnapshot && (
              <p className="text-xs text-muted-foreground pt-2 border-t">
                Built from quantity takeoff · {boq.items.length} priced lines
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
