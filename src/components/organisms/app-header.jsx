"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, CheckSquare, Calendar, ChevronDown, Menu, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { CommandPalette } from "@/components/organisms/command-palette";
import { CURRENT_USER, DEFAULT_PROJECT_ID } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getProjectsSummary } from "@/services/projectsService";
import { getNotificationsSummary } from "@/services/notificationsService";
import { clearSessionCookie } from "@/lib/auth/session";
export function AppHeader({ onMenuClick, glass = false }) {
    const navigate = useNavigate();
    const [commandOpen, setCommandOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        try {
            setProjects(getProjectsSummary());
            const summary = getNotificationsSummary();
            setNotifications(summary.data);
            setUnreadCount(summary.meta.unread);
        }
        catch {
            setProjects([]);
            setNotifications([]);
            setUnreadCount(0);
        }
    }, []);
    const currentProject = projects.find((p) => p.id === DEFAULT_PROJECT_ID) ?? projects[0];
    return (<>
      <header className={cn("sticky top-0 z-40 flex h-14 items-center gap-3 px-4 lg:px-5", glass
            ? "glass-subtle border-b border-border/40"
            : "border-b bg-surface/80 backdrop-blur-xl")}>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5"/>
        </Button>

        <button onClick={() => setCommandOpen(true)} className="flex items-center gap-2 h-10 flex-1 max-w-md rounded-xl border bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Search className="h-4 w-4 shrink-0"/>
          <span className="truncate">Search projects, clients, pages...</span>
          <kbd className="ml-auto pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium shrink-0">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1 ml-auto shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:flex gap-2 rounded-xl">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {currentProject?.name || "Select Project"}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {projects.slice(0, 6).map((p) => (<DropdownMenuItem key={p.id} asChild>
                  <Link to={`/app/projects/${p.id}`}>{p.name}</Link>
                </DropdownMenuItem>))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="h-5 w-5"/>
                {unreadCount > 0 && (<span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-foreground flex items-center justify-center">
                    {unreadCount}
                  </span>)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.slice(0, 5).map((n) => (<DropdownMenuItem key={n.id} asChild>
                  <Link to={n.href || "#"} className="flex flex-col items-start gap-0.5 py-2">
                    <span className={cn("text-sm font-medium", !n.read && "text-primary")}>{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.message}</span>
                  </Link>
                </DropdownMenuItem>))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link to="/site-progress">
              <CheckSquare className="h-5 w-5"/>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-xl hidden sm:flex" asChild>
            <Link to="/calendar">
              <Calendar className="h-5 w-5"/>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="object-cover object-top"/>
                  <AvatarFallback className="bg-secondary text-foreground text-sm">
                    {getInitials(CURRENT_USER.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div>{CURRENT_USER.name}</div>
                <div className="text-xs font-normal text-muted-foreground">{CURRENT_USER.role}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
            clearSessionCookie();
            navigate("/login");
        }}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {commandOpen && <CommandPalette open={commandOpen} onOpenChange={setCommandOpen}/>}
    </>);
}
