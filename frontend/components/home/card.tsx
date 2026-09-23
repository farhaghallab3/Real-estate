import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variants = {
  white: "border border-line bg-white",
  cream: "border border-line bg-cream",
  ink: "bg-ink",
} as const;

export type CardVariant = keyof typeof variants;

type CardProps = {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
};

export function Card({ variant = "white", className, children }: CardProps) {
  return (
    <div className={cn("rounded-[3px]", variants[variant], className)}>
      {children}
    </div>
  );
}

export function CardLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("text-[11px] uppercase tracking-widest text-subtle", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <CardLabel>{title}</CardLabel>
      {action && (
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-gold"
        >
          {action}
        </Button>
      )}
    </div>
  );
}
