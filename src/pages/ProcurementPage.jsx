import { purchaseOrders, vendorQuotes } from "@/lib/mock/data";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
export function ProcurementPage() {
    return (<div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Procurement" description="Purchase orders, vendor quotes, and delivery tracking"/>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex gap-3">
          <ShoppingCart className="h-5 w-5 text-primary shrink-0"/>
          <p className="text-sm"><strong>Procurement Note:</strong> For vitrified tiles, Somany offers best value at ₹72/sqft with 4-day delivery. Hafele hinges — stick with original for warranty compliance.</p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Purchase Orders</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {purchaseOrders.map((po) => (<Card key={po.id} className="card-hover">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{po.vendor}</p>
                    <p className="text-sm text-muted-foreground">{po.projectName}</p>
                  </div>
                  <Badge variant={po.status === "delivered" ? "success" : po.status === "ordered" ? "default" : "warning"}>
                    {po.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{po.items} items</span>
                  <span className="font-bold">{formatCurrency(po.amount)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Delivery: {po.deliveryDate}</p>
              </CardContent>
            </Card>))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Vendor Comparison</h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-3">Material</th>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Delivery</th>
                  <th className="p-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {vendorQuotes.map((vq, i) => (<tr key={i} className="border-b hover:bg-muted/30">
                    <td className="p-3">{vq.material}</td>
                    <td className="p-3 font-medium">{vq.vendor}</td>
                    <td className="p-3">₹{vq.price}</td>
                    <td className="p-3">{vq.deliveryDays} days</td>
                    <td className="p-3">★ {vq.rating}</td>
                  </tr>))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="card-hover">
          <CardHeader><CardTitle className="text-base">Pending Orders</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{purchaseOrders.filter((p) => p.status === "pending").length}</p>
            <p className="text-sm text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader><CardTitle className="text-base">Warehouse Status</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">78%</p>
            <p className="text-sm text-muted-foreground">Storage capacity utilized</p>
          </CardContent>
        </Card>
      </div>
    </div>);
}
