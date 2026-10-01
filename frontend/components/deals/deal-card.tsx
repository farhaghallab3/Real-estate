import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { agentTones } from "@/components/shared/agent-tones";
import { cn } from "@/lib/utils";
import type { Agent, Deal } from "./data";
import { formatDealValue } from "./format";

export function DealCard({ deal, agent }: { deal: Deal; agent?: Agent }) {
  const tone = agent ? agentTones[agent.tone] : null;

  return (
    <div className="flex cursor-pointer gap-2.5 py-3.5 transition-colors first:pt-0 hover:opacity-80">
      <span
        className={cn(
          "w-1 flex-none self-stretch rounded-full",
          tone?.bar ?? "bg-line",
        )}
      />

      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-medium leading-snug text-charcoal">
          {deal.client}
        </div>
        <div className="mt-0.5 truncate text-[11px] text-subtle">
          {deal.property}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-serif text-sm text-charcoal">
            {formatDealValue(deal.value)}
          </div>
          {agent && (
            <Avatar className="size-4 flex-none">
              <AvatarFallback
                className={cn("text-[8px] font-semibold", tone?.avatar)}
              >
                {agent.initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="mt-1.5 text-[10px] text-subtle">
          {deal.daysInStage != null
            ? `${deal.daysInStage}d in stage · ${deal.lastActivity}`
            : deal.lastActivity}
        </div>
      </div>
    </div>
  );
}
