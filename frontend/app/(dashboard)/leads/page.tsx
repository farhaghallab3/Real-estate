import { leads } from "@/components/leads/data";
import { LeadsView } from "@/components/leads/leads-view";

export default function LeadsPage() {
  // TODO: fetch leads from the backend here and pass them down
  return <LeadsView leads={leads} />;
}
