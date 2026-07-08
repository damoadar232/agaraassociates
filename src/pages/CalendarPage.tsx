import { getCalendarEvents, getUpcomingEvents } from "@/lib/calendar-events";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  site_visit: "Site Visit",
  milestone: "Milestone",
  meeting: "Meeting",
  deadline: "Deadline",
  approval: "Approval",
};

export function CalendarPage() {
  const events = getCalendarEvents();
  const upcoming = getUpcomingEvents(12);
  const dates = [...new Set(events.map((e) => e.date))].sort();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Calendar" description="Site visits, milestones, meetings, and approval deadlines" />

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex gap-3">
          <Calendar className="h-5 w-5 text-primary shrink-0" />
          <p className="text-sm"><strong>{upcoming.length} upcoming events</strong> across active projects — site visits, milestones, and client meetings.</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {dates.map((date) => {
          const dayEvents = events.filter((e) => e.date === date);
          return (
            <section key={date}>
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {date}
              </h2>
              <div className="space-y-2">
                {dayEvents.map((e) => (
                  <Card key={e.id} className="card-hover">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium">{e.title}</p>
                          <Badge variant="outline" className="text-[10px]">{TYPE_LABELS[e.type] ?? e.type}</Badge>
                        </div>
                        {e.projectName && <p className="text-xs text-muted-foreground mt-1">{e.projectName}</p>}
                        {e.location && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />{e.location}
                          </p>
                        )}
                      </div>
                      {e.time && <span className="text-sm font-medium tabular-nums">{e.time}</span>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
