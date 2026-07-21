"use client";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Sidebar } from "@/components/organisms/sidebar";
import { AppHeader } from "@/components/organisms/app-header";
import { NAV_ITEMS } from "@/lib/constants";
import { AppLogo } from "@/components/atoms/app-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const isDashboard = pathname === "/dashboard";
    return (<div className={cn("flex min-h-screen", isDashboard ? "dashboard-bg" : "bg-background")}>
      <Sidebar />

      {mobileOpen && (<div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)}/>
          <aside className="absolute left-0 top-0 h-full w-[280px] glass shadow-glass">
            <div className="flex h-16 items-center justify-between px-4 border-b border-divider">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                <AppLogo size="md" showName/>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" strokeWidth={1.5}/>
              </Button>
            </div>
            <nav className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (<Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium", pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "glass-pill-active"
                    : "text-foreground hover:bg-surface-hover")}>
                  <item.icon className="h-4 w-4" strokeWidth={1.5}/>
                  {item.title}
                </Link>))}
            </nav>
          </aside>
        </div>)}

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuClick={() => setMobileOpen(true)} glass={isDashboard}/>
        <main className={cn("flex-1 overflow-auto", isDashboard ? "p-3 lg:p-5" : "p-3 lg:p-4")}>
          <Outlet />
        </main>
      </div>

      <Link to="/projects/new" className="fixed bottom-6 right-6 lg:hidden flex h-14 w-14 items-center justify-center rounded-full bg-primary border border-border/60 text-foreground shadow-glass hover:scale-105 transition-all z-40">
        <span className="text-2xl font-light">+</span>
      </Link>
    </div>);
}
