"use client";

import { KanbanTask } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const columns = [
  { id: "todo", title: "To Do", color: "bg-slate-100" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-50" },
  { id: "inspection", title: "Inspection", color: "bg-amber-50" },
  { id: "done", title: "Done", color: "bg-green-50" },
] as const;

const priorityColors = {
  high: "destructive" as const,
  medium: "warning" as const,
  low: "outline" as const,
};

interface KanbanBoardProps {
  tasks: KanbanTask[];
  className?: string;
}

export function KanbanBoard({ tasks, className }: KanbanBoardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", className)}>
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.column === col.id);
        return (
          <div key={col.id} className={cn("rounded-2xl p-4", col.color)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <span className="text-xs text-muted-foreground bg-white rounded-full px-2 py-0.5">
                {colTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {colTasks.map((task) => (
                <Card key={task.id} className="card-hover cursor-pointer shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{task.title}</p>
                      <Badge variant={priorityColors[task.priority]} className="shrink-0 text-[10px]">
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <p className="text-xs text-muted-foreground">{task.assignee}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
