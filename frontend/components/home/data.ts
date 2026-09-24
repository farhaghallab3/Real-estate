// Mock data — replace with API responses once the backend is ready.

export type Tone = "positive" | "warning" | "neutral" | "negative";

export type Lead = {
  name: string;
  brief: string;
  budget: string;
  source: string;
  tone: Tone;
};

export const leads: Lead[] = [
  { name: "Oliver Hartfield", brief: "Knightsbridge or Belgravia, min 4 beds, private garden", budget: "£3.50M", source: "Referral", tone: "positive" },
  { name: "Amara Osei", brief: "Notting Hill or Ladbroke Grove, 3 bed, period features", budget: "£1.50M", source: "Website", tone: "warning" },
  { name: "Rajiv Mehta", brief: "City or Shoreditch penthouse, investment or own use", budget: "£5M", source: "Referral", tone: "positive" },
  { name: "Charlotte Finch", brief: "Richmond or Twickenham, family home, min 4 beds", budget: "£950K", source: "Social", tone: "neutral" },
  { name: "Benedict Cromwell", brief: "Chelsea or South Kensington, 3-4 bed, easy commute to City", budget: "£2.20M", source: "Portal", tone: "negative" },
  { name: "Isabelle de Vries", brief: "Holland Park or Kensington, 5+ beds, garden essential", budget: "£4.50M", source: "Referral", tone: "positive" },
];

export type PipelineStage = {
  label: string;
  amount: number; // £ millions
  bar: string; // Tailwind bg class
};

export const pipelineStages: PipelineStage[] = [
  { label: "Viewing", amount: 4.6, bar: "bg-taupe" },
  { label: "Offer", amount: 4.17, bar: "bg-gold" },
  { label: "Negotiation", amount: 5.5, bar: "bg-ochre" },
  { label: "Under Contract", amount: 5.4, bar: "bg-steel" },
  { label: "Closed", amount: 3.23, bar: "bg-moss" },
  { label: "Lost", amount: 2.64, bar: "bg-brick" },
];

export type UpcomingEvent = {
  month: string;
  day: string;
  title: string;
  meta: string;
};

export const upcomingEvents: UpcomingEvent[] = [
  { month: "Dec", day: "16", title: "Viewing — 12 Belgravia Sq", meta: "10:00 · Sarah" },
  { month: "Dec", day: "16", title: "Call — Amara Osei", meta: "14:30 · Marcus" },
  { month: "Dec", day: "17", title: "Viewing — One Crown Place", meta: "11:00 · James" },
  { month: "Dec", day: "17", title: "Offer Review — Isabelle de Vries", meta: "15:00 · Sarah" },
];

export type ActivityItem = { title: string; detail: string; time: string };

export const activity: ActivityItem[] = [
  { title: "Offer submitted on One Crown Place", detail: "Rajiv Mehta · £3.9M", time: "2h ago" },
  { title: "New lead qualified — Nadia Volkov", detail: "Budget £7M · Mayfair", time: "4h ago" },
  { title: "Viewing confirmed for tomorrow", detail: "12 Belgravia Sq · Oliver Hartfield", time: "5h ago" },
  { title: "Deal moved to Under Contract", detail: "19 Montpelier Sq · £5.4M", time: "Yesterday" },
  { title: "Note added to Oliver Hartfield", detail: "Prefers Knightsbridge exclusively", time: "Yesterday" },
  { title: "Price reduced — 47 Notting Hill Gate", detail: "£1.395M (was £1.45M)", time: "2 days ago" },
];

export type AgentTone = "gold" | "sage" | "bronze" | "lavender" | "rose";

export type Agent = {
  initials: string;
  name: string;
  commission: number; // £ thousands
  deals: number;
  tone: AgentTone;
  trend: number[]; // 0–100, one point per period
};

export const agents: Agent[] = [
  { initials: "SC", name: "Sarah Chen", commission: 312, deals: 8, tone: "gold", trend: [35, 23, 64, 53, 87, 100, 25, 77, 97, 54, 0] },
  { initials: "MW", name: "Marcus Webb", commission: 185, deals: 6, tone: "sage", trend: [31, 48, 66, 89, 43, 100, 54, 71, 83, 60, 0] },
  { initials: "PP", name: "Priya Patel", commission: 131, deals: 5, tone: "bronze", trend: [33, 53, 73, 40, 87, 100, 60, 73, 93, 41, 0] },
  { initials: "JO", name: "James Okonkwo", commission: 113, deals: 4, tone: "lavender", trend: [53, 73, 87, 67, 100, 80, 93, 73, 58, 0] },
  { initials: "LF", name: "Lucia Ferreira", commission: 76, deals: 3, tone: "rose", trend: [50, 63, 75, 38, 88, 100, 63, 75, 88, 40, 0] },
];
