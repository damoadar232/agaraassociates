import { Suspense } from "react";
import { ClientWorkspaceShell } from "@/components/organisms/client-workspace-shell";
import { QuotationsClientView } from "@/components/organisms/quotations-client-view";
import { QuotationsHeaderActions } from "@/components/organisms/quotations-header-actions";
export function QuotationsPage() {
    return (<Suspense fallback={<div className="p-8 text-muted-foreground">Loading...</div>}>
      <ClientWorkspaceShell moduleTitle="Quotations" moduleDescription="Premium quotation builder scoped to each client" basePath="/quotations" statLabels={{ items: "quotations", itemLabel: "quotes" }}>
        {({ clientId }) => (<>
            <div className="flex justify-end -mt-2 mb-2">
              <QuotationsHeaderActions clientId={clientId}/>
            </div>
            <QuotationsClientView clientId={clientId}/>
          </>)}
      </ClientWorkspaceShell>
    </Suspense>);
}
