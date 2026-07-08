"use client";

import { useState } from "react";
import { getDrawingsForClient } from "@/lib/client-workspace";
import { DrawingUploadDialog } from "@/components/organisms/drawing-upload-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const types = ["all", "floor_plan", "3d_render", "mood_board", "cad"] as const;

export function DesignStudioClientView({ clientId }: { clientId: string }) {
  const [version, setVersion] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  void version;
  const drawings = getDrawingsForClient(clientId);

  return (
    <>
      <div className="flex justify-end -mt-2 mb-2">
        <Button className="rounded-xl" onClick={() => setUploadOpen(true)}>
          <Upload className="h-4 w-4" /> Upload Drawing
        </Button>
      </div>

      <DrawingUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        clientId={clientId}
        onUploaded={() => setVersion((v) => v + 1)}
      />
      {drawings.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex gap-3">
            <FileCheck className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm">
              <strong>Pending Review:</strong> {drawings.filter((d) => d.status === "pending_client" || d.status === "review").length} file(s) awaiting client sign-off for this workspace.
            </p>
          </CardContent>
        </Card>
      )}

      {drawings.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center text-muted-foreground">
            <p className="font-medium text-foreground">No design files for this client</p>
            <p className="text-sm mt-1">Upload drawings or link them to this client&apos;s projects.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            {types.map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t === "all" ? "All Files" : t.replace("_", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
          {types.map((t) => (
            <TabsContent key={t} value={t} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {drawings
                  .filter((d) => t === "all" || d.type === t)
                  .map((d) => (
                    <Card key={d.id} className="card-hover cursor-pointer group">
                      <CardContent className="p-0">
                        <div className="h-40 rounded-t-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors">
                          <span className="text-sm font-medium text-muted-foreground">
                            {d.type.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <p className="font-medium truncate">{d.name}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{d.version}</span>
                            <Badge
                              variant={
                                d.status === "approved"
                                  ? "success"
                                  : d.status === "pending_client"
                                    ? "warning"
                                    : "outline"
                              }
                            >
                              {d.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  );
}
