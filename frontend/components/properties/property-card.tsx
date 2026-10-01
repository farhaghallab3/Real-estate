import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { agentTones } from "@/components/shared/agent-tones";
import { cn } from "@/lib/utils";
import type { Agent, Property } from "./data";
import { formatPrice, formatSqft } from "./format";
import { StatusBadge } from "./status-badge";

export function PropertyCard({ property, agent }: { property: Property; agent?: Agent }) {
  const tone = agent ? agentTones[agent.tone] : null;

  return (
    <div className="group cursor-pointer overflow-hidden rounded-[3px]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

        <div className="absolute left-3 top-3">
          <StatusBadge status={property.status} />
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <div className="font-serif text-2xl leading-none text-cream">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-white px-4 py-3.5">
        <div className="text-sm font-medium text-charcoal">{property.name}</div>
        <div className="mt-0.5 text-[11px] text-subtle">
          {property.area} · {property.postcode}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-3 text-[11px] text-subtle">
            <span>{property.beds} bed</span>
            <span>{property.baths} bath</span>
            <span>{formatSqft(property.sqft)}</span>
          </div>
          {agent && (
            <Avatar className="size-5 flex-none">
              <AvatarFallback className={cn("text-[9px] font-semibold", tone?.avatar)}>
                {agent.initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
}
