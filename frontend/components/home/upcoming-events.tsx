import { Card, CardHeader } from "./card";
import { upcomingEvents } from "./data";
import { cn } from "@/lib/utils";

export function UpcomingEvents({ className }: { className?: string }) {
  return (
    <Card variant="cream" className={cn("px-4 py-5 sm:px-6", className)}>
      <CardHeader title="Upcoming" action="Calendar" />

      <ul className="space-y-3">
        {upcomingEvents.map((event) => (
          <li
            key={`${event.day}-${event.title}`}
            className="flex gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0"
          >
            <div className="w-10 flex-none rounded-[2px] bg-sand py-1 text-center">
              <div className="text-[10px] text-subtle">{event.month}</div>
              <div className="font-serif text-lg leading-tight text-charcoal">{event.day}</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-charcoal">{event.title}</div>
              <div className="mt-0.5 text-[11px] text-subtle">{event.meta}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
