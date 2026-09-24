"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "./data";

export type Filters = {
  search: string;
  status: string;
  agent: string;
  source: string;
};

export const emptyFilters: Filters = {
  search: "",
  status: "all",
  agent: "all",
  source: "all",
};

type Option = { value: string; label: string };

function FilterSelect({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? allLabel;

  return (
    <Select value={value} onValueChange={(v) => onChange(v ?? "all")}>
      <SelectTrigger
        className="w-full sm:w-44"
        aria-label={`Filter by ${label}`}
      >
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type LeadsFiltersProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
  agents: string[];
  sources: string[];
};

export function LeadsFilters({
  filters,
  onChange,
  onClear,
  agents,
  sources,
}: LeadsFiltersProps) {
  const isFiltered = JSON.stringify(filters) !== JSON.stringify(emptyFilters);
  const toOptions = (values: string[]): Option[] =>
    values.map((v) => ({ value: v, label: v }));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Input
        type="search"
        placeholder="Search by name or email…"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className="sm:min-w-48 sm:flex-1"
      />
      <FilterSelect
        label="status"
        allLabel="All statuses"
        value={filters.status}
        options={statusOptions}
        onChange={(status) => onChange({ status })}
      />
      <FilterSelect
        label="agent"
        allLabel="All agents"
        value={filters.agent}
        options={toOptions(agents)}
        onChange={(agent) => onChange({ agent })}
      />
      <FilterSelect
        label="source"
        allLabel="All sources"
        value={filters.source}
        options={toOptions(sources)}
        onChange={(source) => onChange({ source })}
      />
      {isFiltered && (
        <Button variant="ghost" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
}
