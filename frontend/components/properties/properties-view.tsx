"use client";

import { useMemo, useState } from "react";
import { agents, type Property } from "./data";
import {
  emptyFilters,
  PropertiesFilters,
  type Filters,
} from "./properties-filters";
import { PropertiesHeader } from "./properties-header";
import { PropertiesGrid } from "./properties-grid";
import { PropertiesTable } from "./properties-table";
import type { ViewMode } from "./view-toggle";

export function PropertiesView({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          (filters.status === "all" || p.status === filters.status) &&
          (filters.type === "all" || p.type === filters.type),
      ),
    [properties, filters],
  );

  return (
    <section>
      <PropertiesHeader
        shown={filtered.length}
        total={properties.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <PropertiesFilters
        filters={filters}
        onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        onClear={() => setFilters(emptyFilters)}
      />

      {viewMode === "grid" ? (
        <PropertiesGrid properties={filtered} agents={agents} />
      ) : (
        <PropertiesTable properties={filtered} agents={agents} />
      )}
    </section>
  );
}
