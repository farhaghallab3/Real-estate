import { Button } from "@/components/ui/button";
import { ACTIVE_STAGES, type Deal } from "./data";
import { formatDealValue } from "./format";

export function DealsHeader({ deals }: { deals: Deal[] }) {
  const active = deals.filter((d) => ACTIVE_STAGES.includes(d.stageId));
  const total = active.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
      <div>
        <h1 className="font-serif text-2xl text-charcoal">Deal Pipeline</h1>
        <p className="mt-0.5 text-sm text-subtle">
          {active.length} active deals · {formatDealValue(total)} in pipeline
        </p>
      </div>
      <Button className="rounded-[2px] bg-gold px-4 text-xs font-medium text-ink hover:bg-gold/80">
        + New Deal
      </Button>
    </div>
  );
}
