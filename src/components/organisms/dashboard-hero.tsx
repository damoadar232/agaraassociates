"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Cloud, CloudRain, CloudSun, Sun, MapPin } from "lucide-react";
import { WeatherInfo } from "@/types";
import { CURRENT_USER } from "@/lib/constants";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressRing } from "@/components/atoms/progress-ring";
import { cn } from "@/lib/utils";

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  partly_cloudy: CloudSun,
};

interface DashboardHeroProps {
  userName: string;
  studio: string;
  userRole?: string;
  weather: WeatherInfo;
  onTrackPercent?: number;
}

export function DashboardHero({
  userName,
  studio,
  userRole = CURRENT_USER.role,
  weather,
  onTrackPercent = 87,
}: DashboardHeroProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const WeatherIcon = weatherIcons[weather.icon];
  const profileImage = CURRENT_USER.avatar;

  return (
    <div className="flex flex-col gap-2.5 lg:h-full lg:min-h-0">
      <GlassCard className="px-3 py-2.5 shrink-0">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-muted-foreground truncate">
              {format(now, "EEEE, MMM d")}
            </p>
            <p className="text-lg sm:text-xl font-semibold tracking-tight tabular-nums leading-tight mt-0.5">
              {format(now, "h:mm")}
              <span className="text-xs font-medium text-muted-foreground ml-1">{format(now, "a")}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-surface/80 border border-border/60 shrink-0">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg",
                weather.icon === "sunny"
                  ? "bg-accent/20 text-accent-foreground"
                  : weather.icon === "rainy"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/80 text-muted-foreground",
              )}
            >
              <WeatherIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{weather.temperature}°C</p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate max-w-[72px] sm:max-w-none">{weather.city}</span>
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="relative overflow-hidden p-0 flex-1 min-h-[220px] sm:min-h-[260px] lg:min-h-0 lg:flex lg:flex-col">
        <div className="relative flex-1 min-h-[220px] sm:min-h-[260px] lg:min-h-0">
          <img
            src={profileImage}
            alt={userName}
            className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl font-semibold text-white tracking-tight truncate">
                  {userName}
                </p>
                <p className="text-[12px] sm:text-sm text-white/75 mt-0.5 truncate">{userRole}</p>
                <p className="text-[11px] text-white/55 mt-1 truncate hidden sm:block">{studio}</p>
              </div>

              <div className="shrink-0 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-3 py-2 text-center">
                <p className="text-[10px] uppercase tracking-wide text-white/70">On-Track</p>
                <p className="text-sm font-bold text-white tabular-nums">{onTrackPercent}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10 bg-surface/90 backdrop-blur-md shrink-0">
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Portfolio</p>
            <p className="text-xs font-medium truncate">{weather.condition} · {weather.city}</p>
          </div>
          <ProgressRing value={onTrackPercent} size={48} strokeWidth={4} />
        </div>
      </GlassCard>
    </div>
  );
}
