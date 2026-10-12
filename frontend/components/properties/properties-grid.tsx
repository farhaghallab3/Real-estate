import { PropertyCard } from "./property-card";
import type { Agent, Property } from "./data";

export function PropertiesGrid({
  properties,
  agents,
}: {
  properties: Property[];
  agents: Agent[];
}) {
  const agentById = new Map(agents.map((a) => [a.id, a]));

  if (properties.length === 0) {
    return <p className="py-12 text-center text-sm text-subtle">No properties match your filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} agent={agentById.get(property.agentId)} />
      ))}
    </div>
  );
}
