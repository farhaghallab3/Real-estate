// Dummy data — swap getDeals() for a real fetch once the API is ready.
import type { AgentTone } from "@/components/shared/agent-tones";

export type StageId =
  | "viewing"
  | "offer"
  | "negotiation"
  | "under-contract"
  | "closed";

export type Stage = {
  id: StageId;
  label: string;
  dot: string; // Tailwind bg-* class
};

export const stages: Stage[] = [
  { id: "viewing", label: "Viewing", dot: "bg-taupe" },
  { id: "offer", label: "Offer", dot: "bg-gold" },
  { id: "negotiation", label: "Negotiation", dot: "bg-ochre" },
  { id: "under-contract", label: "Under Contract", dot: "bg-steel" },
  { id: "closed", label: "Closed", dot: "bg-moss" },
];

// Stages counted toward the "active deals / £ in pipeline" summary.
export const ACTIVE_STAGES: StageId[] = ["viewing", "offer", "negotiation", "under-contract"];

export type Agent = {
  id: string;
  name: string;
  initials: string;
  tone: AgentTone;
};

export const agents: Agent[] = [
  { id: "a1", name: "Sarah Chen", initials: "SC", tone: "gold" },
  { id: "a2", name: "Marcus Webb", initials: "MW", tone: "sage" },
  { id: "a3", name: "Priya Patel", initials: "PP", tone: "bronze" },
  { id: "a4", name: "James Okonkwo", initials: "JO", tone: "lavender" },
  { id: "a5", name: "Lucia Ferreira", initials: "LF", tone: "rose" },
];

export type Deal = {
  id: string;
  client: string;
  property: string;
  value: number; // £ millions, e.g. 2.85 = £2.85M, 0.94 = £940K
  agentId: string;
  stageId: StageId;
  /** Days the deal has sat in its current stage. Omit for closed deals. */
  daysInStage?: number;
  lastActivity: string; // e.g. "2 days ago", already formatted
};

export const deals: Deal[] = [
  { id: "d1", client: "Oliver Hartfield", property: "12 Belgravia Square", value: 2.85, agentId: "a1", stageId: "viewing", daysInStage: 4, lastActivity: "2 days ago" },
  { id: "d2", client: "Benedict Cromwell", property: "3 Cheyne Walk", value: 1.75, agentId: "a5", stageId: "viewing", daysInStage: 2, lastActivity: "1 day ago" },
  { id: "d3", client: "Charlotte Finch", property: "8 The Drive", value: 0.975, agentId: "a3", stageId: "offer", daysInStage: 3, lastActivity: "5 hours ago" },
  { id: "d4", client: "Isabelle de Vries", property: "23 Kensington Park Road", value: 3.2, agentId: "a1", stageId: "offer", daysInStage: 6, lastActivity: "1 day ago" },
  { id: "d5", client: "Rajiv Mehta", property: "Apartment 14, One Crown Place", value: 4.1, agentId: "a4", stageId: "negotiation", daysInStage: 8, lastActivity: "3 hours ago" },
  { id: "d6", client: "Amara Osei", property: "47 Notting Hill Gate", value: 1.4, agentId: "a2", stageId: "negotiation", daysInStage: 5, lastActivity: "6 hours ago" },
  { id: "d7", client: "Nadia Volkov", property: "19 Montpelier Square", value: 5.4, agentId: "a1", stageId: "under-contract", daysInStage: 12, lastActivity: "4 days ago" },
  { id: "d8", client: "Thomas Ashby", property: "6 Holland Villas Road", value: 1.85, agentId: "a5", stageId: "closed", lastActivity: "3 weeks ago" },
  { id: "d9", client: "Peter Kowalski", property: "47 Notting Hill Gate", value: 1.38, agentId: "a2", stageId: "closed", lastActivity: "1 month ago" },
];

/**
 * Fetches all deals. Swap the body for a real call once the backend exists:
 *
 *   const res = await fetch("/api/deals");
 *   return res.json();
 */
export async function getDeals(): Promise<Deal[]> {
  return deals;
}
