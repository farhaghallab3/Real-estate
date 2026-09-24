import type { ReactNode } from "react";
import { Card, CardLabel, type CardVariant } from "./card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: ReactNode;
  caption: string;
  captionClassName?: string;
  variant?: CardVariant;
  className?: string;
};

export function StatCard({
  label,
  value,
  caption,
  captionClassName = "text-subtle",
  variant = "cream",
  className,
}: StatCardProps) {
  return (
    <Card
      variant={variant}
      className={cn("flex flex-col justify-between gap-4 p-5", className)}
    >
      <CardLabel>{label}</CardLabel>
      <div>
        <div className="mt-2 font-serif text-4xl text-charcoal">{value}</div>
        <div className={cn("mt-1 text-xs", captionClassName)}>{caption}</div>
      </div>
    </Card>
  );
}
