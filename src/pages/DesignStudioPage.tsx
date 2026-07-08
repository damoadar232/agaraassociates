import { Suspense } from "react";
import { ClientWorkspaceShell } from "@/components/organisms/client-workspace-shell";
import { DesignStudioClientView } from "@/components/organisms/design-studio-client-view";

export function DesignStudioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">Loading...</div>}>
      <ClientWorkspaceShell
        moduleTitle="Design Studio"
        moduleDescription="Drawings, renders, mood boards, and CAD files by client"
        basePath="/design-studio"
        statLabels={{ items: "drawings", itemLabel: "files" }}
      >
        {({ clientId }) => <DesignStudioClientView clientId={clientId} />}
      </ClientWorkspaceShell>
    </Suspense>
  );
}
