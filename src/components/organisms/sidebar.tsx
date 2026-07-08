"use client";

import { Link, useLocation } from "react-router-dom";
import { APP_TAGLINE, NAV_ITEMS } from "@/lib/constants";
import { AppLogo } from "@/components/atoms/app-logo";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const { pathname } = useLocation();
  const groups = [...new Set(NAV_ITEMS.map((item) => item.group || "Main"))];

  return (
    <aside className="hidden lg:flex w-[240px] flex-col glass-subtle border-r border-border/40 h-screen sticky top-0">
      <div className="flex h-14 items-center px-5 border-b border-divider">
        <Link to="/dashboard" className="min-w-0">
          <AppLogo size="sm" showName tagline={APP_TAGLINE} />
        </Link>
      </div>
      <ScrollArea className="flex-1 py-3">
        <nav className="px-3 space-y-5">
          {groups.map((group) => (
            <div key={group}>
              <p className="px-3 mb-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground">
                {group}
              </p>
              <div className="space-y-0.5">
                {NAV_ITEMS.filter((item) => (item.group || "Main") === group).map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                        isActive
                          ? "glass-pill-active"
                          : "text-foreground hover:bg-surface-hover",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
