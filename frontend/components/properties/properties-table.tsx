import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { agentTones } from "@/components/shared/agent-tones";
import { cn } from "@/lib/utils";
import type { Agent, Property } from "./data";
import { formatPrice, formatSqft } from "./format";
import { StatusDotLabel } from "./status-dot-label";

export function PropertiesTable({
  properties,
  agents,
}: {
  properties: Property[];
  agents: Agent[];
}) {
  const agentById = new Map(agents.map((a) => [a.id, a]));

  return (
    <div className="overflow-hidden rounded-[3px] border border-line bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Specs</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="hidden text-right sm:table-cell">Agent</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {properties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No properties match your filters.
              </TableCell>
            </TableRow>
          ) : (
            properties.map((property) => {
              const agent = agentById.get(property.agentId);
              const tone = agent ? agentTones[agent.tone] : null;
              return (
                <TableRow key={property.id} className="cursor-pointer">
                  <TableCell>
                    <div className="font-medium">{property.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {property.area} · {property.postcode}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{property.type}</TableCell>
                  <TableCell>
                    <StatusDotLabel status={property.status} />
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {property.beds} bed · {property.baths} bath · {formatSqft(property.sqft)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatPrice(property.price)}
                  </TableCell>
                  <TableCell className="hidden text-right sm:table-cell">
                    {agent && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-muted-foreground">{agent.name}</span>
                        <Avatar className="size-5 flex-none">
                          <AvatarFallback className={cn("text-[9px] font-semibold", tone?.avatar)}>
                            {agent.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
