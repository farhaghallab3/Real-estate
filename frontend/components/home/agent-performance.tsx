import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardLabel } from "./card";
import { agents, type AgentTone } from "./data";
import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

const tones: Record<AgentTone, { border: string; avatar: string; bar: string; line: string }> = {
  gold: { border: "border-gold/25", avatar: "bg-gold/15 text-gold", bar: "bg-gold", line: "text-gold" },
  sage: { border: "border-sage/25", avatar: "bg-sage/15 text-sage", bar: "bg-sage", line: "text-sage" },
  bronze: { border: "border-bronze/25", avatar: "bg-bronze/15 text-bronze", bar: "bg-bronze", line: "text-bronze" },
  lavender: { border: "border-lavender/25", avatar: "bg-lavender/15 text-lavender", bar: "bg-lavender", line: "text-lavender" },
  rose: { border: "border-rose/25", avatar: "bg-rose/15 text-rose", bar: "bg-rose", line: "text-rose" },
};

export function AgentPerformance({ className }: { className?: string }) {
  const total = agents.reduce((sum, a) => sum + a.commission, 0);

  return (
    <Card className={cn("px-4 py-5 sm:px-6", className)}>
      <CardLabel className="mb-4">Agent Performance — YTD</CardLabel>

      <ul className="divide-y divide-line">
        {agents.map((agent) => {
          const tone = tones[agent.tone];
          return (
            <li key={agent.name} className="flex items-center gap-3 py-2.5 sm:gap-4">
              <Avatar className={cn("size-6 flex-none border", tone.border)}>
                <AvatarFallback className={cn("text-[9px] font-semibold", tone.avatar)}>
                  {agent.initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-charcoal">{agent.name}</div>
                <div className="mt-1 h-1 w-full rounded-[1px] bg-line">
                  <div
                    className={cn("h-full rounded-[1px]", tone.bar)}
                    style={{ width: `${(agent.commission / total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex-none text-right">
                <div className="text-xs font-semibold text-charcoal">£{agent.commission}K</div>
                <div className="text-[10px] text-subtle">{agent.deals} deals</div>
              </div>

              <Sparkline data={agent.trend} className={cn("hidden sm:block", tone.line)} />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
