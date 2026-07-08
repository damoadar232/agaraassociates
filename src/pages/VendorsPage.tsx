import { vendorQuotes } from "@/lib/mock/data";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const vendors = [...new Map(vendorQuotes.map((v) => [v.vendor, v])).values()];

export function VendorsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Vendors" description="Your trusted supplier network" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <Card key={v.vendor} className="card-hover">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{v.vendor}</h3>
                <Badge variant="secondary">★ {v.rating}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Avg. delivery: {v.deliveryDays} days</p>
              <div className="text-sm">
                <p className="text-muted-foreground">Recent quote</p>
                <p className="font-medium">{v.material} — ₹{v.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {["Kajaria Ceramics", "Asian Paints", "Greenply Industries", "Jaquar", "Godrej Interio"].map((name) => {
          if (vendors.some((v) => v.vendor === name)) return null;
          return (
            <Card key={name} className="card-hover">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">Preferred vendor</p>
                <Badge variant="outline">Active</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
