"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Lead } from "./data";
import { emptyFilters, LeadsFilters, type Filters } from "./leads-filters";
import { LeadsTable } from "./leads-table";

const unique = (values: string[]) => [...new Set(values)].sort();

export function LeadsView({ leads }: { leads: Lead[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const agents = useMemo(() => unique(leads.map((l) => l.agent)), [leads]);
  const sources = useMemo(() => unique(leads.map((l) => l.source)), [leads]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return leads.filter(
      (l) =>
        (!q ||
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)) &&
        (filters.status === "all" || l.status === filters.status) &&
        (filters.agent === "all" || l.agent === filters.agent) &&
        (filters.source === "all" || l.source === filters.source),
    );
  }, [leads, filters]);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl">Leads</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {filtered.length} of {leads.length} leads
          </p>
        </div>
        <Button>+ Add Lead</Button>
      </div>

      <LeadsFilters
        filters={filters}
        onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        onClear={() => setFilters(emptyFilters)}
        agents={agents}
        sources={sources}
      />

      <LeadsTable leads={filtered} />
    </section>
  );
}
