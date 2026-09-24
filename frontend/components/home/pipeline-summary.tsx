import { Card, CardLabel } from "./card";
import { cn } from "@/lib/utils";

const secondary = [
  { label: "Closed YTD", value: "£3.23M" },
  { label: "Commission YTD", value: "£817K" },
];

export function PipelineSummary({ className }: { className?: string }) {
  return (
    <Card
      variant="ink"
      className={cn("flex flex-col justify-between p-5 sm:p-7", className)}
    >
      <div>
        <CardLabel>Active Pipeline</CardLabel>
        <div className="mt-3 font-serif text-5xl leading-none text-cream sm:text-[56px]">
          £19.67M
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gold">↑ 12%</span>
          <span className="text-xs text-subtle">vs last quarter</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-line pt-4">
        {secondary.map(({ label, value }) => (
          <div key={label}>
            <div className="text-[10px] uppercase tracking-wider text-subtle">
              {label}
            </div>
            <div className="mt-1 font-serif text-2xl text-gold">{value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
