import { cn } from "@/lib/utils";
import { statusOptions, type PropertyStatus } from "./data";

const dot: Record<PropertyStatus, string> = {
  active: "bg-moss",
  pending: "bg-ochre",
  sold: "bg-subtle",
};

const label = Object.fromEntries(
  statusOptions.map((s) => [s.value, s.label]),
) as Record<PropertyStatus, string>;

export function StatusBadge({ status }: { status: PropertyStatus }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} />
      <span className="text-[10px] font-medium uppercase tracking-wider text-cream">
        {label[status]}
      </span>
    </div>
  );
}
