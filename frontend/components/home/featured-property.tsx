import Image from "next/image";
import { cn } from "@/lib/utils";

export function FeaturedProperty({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative min-h-[240px] overflow-hidden rounded-[3px]",
        className,
      )}
    >
      <Image
        src="./globe.svg"
        alt="19 Montpelier Square, Knightsbridge"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-gold">
          Under Contract
        </div>
        <div className="font-serif text-xl leading-tight text-cream">
          19 Montpelier Square
        </div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
          <div className="text-sm text-sand">
            Knightsbridge · 6 bed · 4,100 sq ft
          </div>
          <div className="font-serif text-2xl text-gold">£5.4M</div>
        </div>
      </div>
    </div>
  );
}
