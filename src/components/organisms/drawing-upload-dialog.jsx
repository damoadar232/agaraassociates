"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getProjectsForClient } from "@/lib/client-workspace";
import { addDrawing } from "@/lib/store/drawing-store";
const DRAWING_TYPES = ["floor_plan", "3d_render", "mood_board", "cad"];
export function DrawingUploadDialog({ open, onOpenChange, clientId, onUploaded }) {
    const projects = getProjectsForClient(clientId);
    const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
    const [name, setName] = useState("");
    const [type, setType] = useState("floor_plan");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectId || !name.trim()) {
            toast.error("Project and file name are required");
            return;
        }
        addDrawing({ projectId, name: name.trim(), type });
        toast.success("Drawing uploaded", { description: `${name} added as draft v1.0` });
        onUploaded();
        onOpenChange(false);
        setName("");
    };
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Drawing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Project</Label>
            <Select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="rounded-xl">
              {projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>File name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ground Floor Plan v2.5" className="rounded-xl"/>
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl">
              {DRAWING_TYPES.map((t) => (<option key={t} value={t}>{t.replace("_", " ")}</option>))}
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>);
}
