import { Suspense } from "react";
import { ClientWorkspaceShell } from "@/components/organisms/client-workspace-shell";
import { BoqClientView } from "@/components/organisms/boq-client-view";
import { BoqHeaderActions } from "@/components/organisms/boq-header-actions";

export function BoqListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">Loading...</div>}>
      <ClientWorkspaceShell
        moduleTitle="BOQ Builder"
        moduleDescription="Bill of quantities and cost estimation by client"
        basePath="/boq"
        statLabels={{ items: "boq", itemLabel: "BOQs" }}
      >
        {({ clientId }) => (
          <>
            <div className="flex justify-end -mt-2 mb-2">
              <BoqHeaderActions clientId={clientId} />
            </div>
            <BoqClientView clientId={clientId} />
          </>
        )}
      </ClientWorkspaceShell>
    </Suspense>
  );
}
