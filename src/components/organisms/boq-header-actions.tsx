"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function BoqHeaderActions({ clientId }: { clientId: string }) {
  return (
    <Button className="rounded-xl" asChild>
      <Link to={`/boq/new?client=${clientId}`}>
        <Plus className="h-4 w-4" /> New BOQ Takeoff
      </Link>
    </Button>
  );
}
