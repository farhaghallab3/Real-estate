"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions, typeOptions } from "./data";

export type Filters = {
  status: string;
  type: string;
};

export const emptyFilters: Filters = { status: "all", type: "all" };

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
        className="w-full sm:w-40"
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

export function PropertiesFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
}) {
  const isFiltered = filters.status !== "all" || filters.type !== "all";
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <FilterSelect
        label="status"
        allLabel="All statuses"
        value={filters.status}
        options={statusOptions}
        onChange={(status) => onChange({ status })}
      />
      <FilterSelect
        label="type"
        allLabel="All types"
        value={filters.type}
        options={typeOptions}
        onChange={(type) => onChange({ type })}
      />
      {isFiltered && (
        <Button variant="ghost" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
}
