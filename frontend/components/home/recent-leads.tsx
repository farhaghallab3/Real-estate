import { Card, CardHeader } from "./card";
import { leads, type Tone } from "./data";
import { cn } from "@/lib/utils";

const dotColor: Record<Tone, string> = {
  positive: "bg-moss",
  warning: "bg-ochre",
  neutral: "bg-subtle",
  negative: "bg-brick",
};

export function RecentLeads({ className }: { className?: string }) {
  return (
    <Card className={cn("px-4 py-5 sm:px-6", className)}>
      <CardHeader title="Recent Leads" action="View all" />

      <ul className="divide-y divide-line">
        {leads.map((lead) => (
          <li
            key={lead.name}
            className="flex cursor-pointer items-center gap-3 py-2.5 transition-opacity hover:opacity-70"
          >
            <span className={cn("mt-0.5 h-1.5 w-1.5 flex-none rounded-full", dotColor[lead.tone])} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-charcoal">{lead.name}</div>
              <div className="truncate text-[11px] text-subtle">{lead.brief}</div>
            </div>
            <div className="flex-none text-right">
              <div className="text-xs font-medium text-charcoal">{lead.budget}</div>
              <div className="text-[10px] text-subtle">{lead.source}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
