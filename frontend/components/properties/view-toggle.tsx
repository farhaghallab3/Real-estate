"use client";

import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "table";

export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  const options: { value: ViewMode; label: string }[] = [
    { value: "grid", label: "Grid" },
    { value: "table", label: "Table" },
  ];

  return (
    <div className="flex overflow-hidden rounded-xs border border-line">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "px-3 py-1.5 text-xs transition-colors",
            value === option.value
              ? "bg-charcoal text-cream"
              : "bg-white text-subtle hover:bg-cream",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
