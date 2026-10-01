import { cn } from "@/lib/utils";
import { DealCard } from "./deal-card";
import type { Agent, Deal, Stage } from "./data";
import { formatDealValue } from "./format";

export function StageColumn({
  stage,
  deals,
  agentById,
}: {
  stage: Stage;
  deals: Deal[];
  agentById: Map<string, Agent>;
}) {
  const total = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="w-56 flex-none border-l border-line pl-5 pr-5 first:border-l-0 first:pl-0">
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <span className={cn("h-2 w-2 flex-none rounded-full", stage.dot)} />
          <span className="text-xs font-medium text-charcoal">{stage.label}</span>
          <span className="ml-auto text-[10px] text-subtle">{deals.length}</span>
        </div>
        <div className="pl-4 text-[11px] font-medium text-subtle">
          {formatDealValue(total)}
        </div>
        <div className={cn("mt-2 h-px opacity-40", stage.dot)} />
      </div>

      <div className="flex flex-col divide-y divide-line">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} agent={agentById.get(deal.agentId)} />
        ))}
        {deals.length === 0 && (
          <p className="py-4 text-[11px] text-subtle">No deals in this stage.</p>
        )}
      </div>
    </div>
  );
}
