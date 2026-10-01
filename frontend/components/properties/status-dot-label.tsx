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

/** Status dot + label on a light background — for table rows. StatusBadge is for the dark photo overlay. */
export function StatusDotLabel({ status }: { status: PropertyStatus }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-charcoal">
      <span className={cn("h-1.5 w-1.5 flex-none rounded-full", dot[status])} />
      {label[status]}
    </span>
  );
}
