import { Card, CardLabel } from "./card";
import { pipelineStages } from "./data";
import { cn } from "@/lib/utils";

const formatM = (n: number) => `£${n.toFixed(2)}M`;

export function PipelineByStage({ className }: { className?: string }) {
  const total = pipelineStages.reduce((sum, s) => sum + s.amount, 0);

  return (
    <Card className={cn("px-4 py-5 sm:px-6", className)}>
      <CardLabel className="mb-4">Pipeline by Stage</CardLabel>

      <div className="flex h-7 w-full gap-px overflow-hidden rounded-xs">
        {pipelineStages.map((stage) => (
          <div
            key={stage.label}
            className={cn("cursor-default", stage.bar)}
            // width depends on data, so it can't be a static Tailwind class
            style={{ width: `${(stage.amount / total) * 100}%` }}
            title={`${stage.label}: ${formatM(stage.amount)}`}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {pipelineStages.map((stage) => (
          <li
            key={stage.label}
            className="flex items-center gap-1.5 text-[11px]"
          >
            <span className={cn("h-2 w-2 flex-none rounded-full", stage.bar)} />
            <span className="text-subtle">{stage.label}</span>
            <span className="font-medium text-charcoal">
              {formatM(stage.amount)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
