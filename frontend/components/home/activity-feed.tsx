import { Card, CardLabel } from "./card";
import { activity } from "./data";
import { cn } from "@/lib/utils";

export function ActivityFeed({ className }: { className?: string }) {
  return (
    <Card variant="cream" className={cn("px-4 py-5 sm:px-6", className)}>
      <CardLabel className="mb-4">Activity</CardLabel>

      <ul className="divide-y divide-line">
        {activity.map((item) => (
          <li key={item.title} className="py-2.5 text-xs">
            <div className="text-charcoal">{item.title}</div>
            <div className="mt-0.5 flex justify-between gap-3 text-subtle">
              <span className="min-w-0 truncate">{item.detail}</span>
              <span className="flex-none">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
