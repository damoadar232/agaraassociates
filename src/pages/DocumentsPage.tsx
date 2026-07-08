import { getAllDocuments } from "@/lib/store/document-store";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, FolderOpen } from "lucide-react";

export function DocumentsPage() {
  const documents = getAllDocuments();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Documents" description="Project files, contracts, drawings, and reports across your portfolio" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="card-hover">
            <CardContent className="p-4 flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                {doc.type === "drawing" ? <FolderOpen className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground truncate">{doc.projectName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px] capitalize">{doc.type}</Badge>
                  <span className="text-[10px] text-muted-foreground">{doc.updatedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
