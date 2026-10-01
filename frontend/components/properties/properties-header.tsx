import { Button } from "@/components/ui/button";
import { ViewToggle, type ViewMode } from "./view-toggle";

export function PropertiesHeader({
  shown,
  total,
  viewMode,
  onViewModeChange,
}: {
  shown: number;
  total: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
      <div>
        <h1 className="font-serif text-2xl text-charcoal">Properties</h1>
        <p className="mt-0.5 text-sm text-subtle">
          {shown === total ? `${total} listings` : `${shown} of ${total} listings`}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ViewToggle value={viewMode} onChange={onViewModeChange} />
        <Button className="rounded-[2px] bg-gold px-4 text-xs font-medium text-ink hover:bg-gold/80">
          + Add Property
        </Button>
      </div>
    </div>
  );
}
