import { Suspense } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BoqWizardClient } from "@/components/features/lazy-modules";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BoqNewContent() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client") ?? "";

  if (!clientId) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Card className="border-dashed">
          <CardContent className="py-16 text-center space-y-3">
            <p className="font-medium">Select a client first</p>
            <p className="text-sm text-muted-foreground">
              Open BOQ, pick a client workspace, then start a new takeoff.
            </p>
            <Button className="rounded-xl" asChild>
              <Link to="/boq">Go to BOQ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">Loading wizard...</div>}>
      <BoqWizardClient clientId={clientId} />
    </Suspense>
  );
}

export function BoqNewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">Loading...</div>}>
      <BoqNewContent />
    </Suspense>
  );
}
