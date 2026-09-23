import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusOptions, type Lead, type LeadStatus } from "./data";

const statusColor: Record<LeadStatus, string> = {
  new: "bg-gray-400",
  qualified: "bg-green-500",
  contacted: "bg-amber-500",
  unresponsive: "bg-red-500",
};

const statusLabel = Object.fromEntries(
  statusOptions.map((s) => [s.value, s.label]),
) as Record<LeadStatus, string>;

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Source</TableHead>
            <TableHead className="hidden lg:table-cell">Interest</TableHead>
            <TableHead className="text-right">Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Agent</TableHead>
            <TableHead className="hidden text-right sm:table-cell">
              Added
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No leads match your filters.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer">
                <TableCell>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {lead.email}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {lead.source}
                </TableCell>
                <TableCell className="hidden max-w-xs lg:table-cell">
                  <div className="truncate text-muted-foreground">
                    {lead.interest}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {lead.budget}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusColor[lead.status]}`}
                    />
                    {statusLabel[lead.status]}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {lead.agent}
                </TableCell>
                <TableCell className="hidden text-right tabular-nums text-muted-foreground sm:table-cell">
                  {lead.added}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
