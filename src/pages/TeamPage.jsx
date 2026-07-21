"use client";
import { useState } from "react";
import { toast } from "sonner";
import { getTeamMembers, getAllTasks, toggleTaskCompleted } from "@/lib/store/team-store";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
export function TeamPage() {
    const [version, setVersion] = useState(0);
    void version;
    const team = getTeamMembers();
    const tasks = getAllTasks();
    const openTasks = tasks.filter((t) => !t.completed);
    return (<div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Team & Tasks" description="Studio roster and cross-project task queue"/>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Team ({team.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {team.map((member) => (<div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border">
                <Avatar>
                  {member.avatar ? <AvatarImage src={member.avatar} alt={member.name}/> : null}
                  <AvatarFallback className="bg-primary text-white text-sm">{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                </div>
                <Badge variant={member.active ? "success" : "outline"}>{member.active ? "Active" : "Away"}</Badge>
              </div>))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Open Tasks ({openTasks.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((task) => (<div key={task.id} className="flex items-start gap-3 p-3 rounded-xl border">
                <input type="checkbox" checked={task.completed} className="mt-1 h-4 w-4 rounded border-border accent-primary" onChange={() => {
                toggleTaskCompleted(task.id);
                setVersion((v) => v + 1);
                toast.success(task.completed ? "Task reopened" : "Task completed");
            }}/>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.projectName} · Due {task.dueDate}</p>
                </div>
                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "warning" : "outline"}>{task.priority}</Badge>
              </div>))}
          </CardContent>
        </Card>
      </div>
    </div>);
}
