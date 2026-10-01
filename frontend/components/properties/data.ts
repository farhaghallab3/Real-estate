// Dummy data — swap getProperties() for a real fetch once the API is ready.
import type { AgentTone } from "@/components/shared/agent-tones";

export type PropertyStatus = "active" | "pending" | "sold";
export type PropertyType = "Flat" | "House" | "Townhouse" | "Penthouse" | "Mews";

export const statusOptions: { value: PropertyStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
];

export const typeOptions: { value: PropertyType; label: string }[] = [
  { value: "Flat", label: "Flat" },
  { value: "House", label: "House" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Penthouse", label: "Penthouse" },
  { value: "Mews", label: "Mews" },
];

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

export type Property = {
  id: string;
  name: string;
  area: string;
  postcode: string;
  price: number; // £ millions, e.g. 2.85 = £2.85M, 0.975 = £975K
  status: PropertyStatus;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  agentId: string;
  image: string; // local placeholder for now; swap for a real listing photo URL
};

export const properties: Property[] = [
  { id: "p1", name: "12 Belgravia Square", area: "Belgravia", postcode: "SW1X 8PH", price: 2.85, status: "active", type: "Townhouse", beds: 4, baths: 3, sqft: 2840, agentId: "a1", image: "/window.svg" },
  { id: "p2", name: "47 Notting Hill Gate", area: "Notting Hill", postcode: "W11 3JQ", price: 1.4, status: "pending", type: "Flat", beds: 3, baths: 2, sqft: 1620, agentId: "a2", image: "/window.svg" },
  { id: "p3", name: "8 The Drive", area: "Richmond", postcode: "TW9 2FG", price: 0.975, status: "active", type: "House", beds: 5, baths: 3, sqft: 2200, agentId: "a3", image: "/window.svg" },
  { id: "p4", name: "23 Kensington Park Road", area: "Notting Hill", postcode: "W11 2EU", price: 3.2, status: "active", type: "House", beds: 5, baths: 4, sqft: 3350, agentId: "a1", image: "/window.svg" },
  { id: "p5", name: "Apartment 14, One Crown Place", area: "Shoreditch", postcode: "EC2A 4AU", price: 4.1, status: "active", type: "Penthouse", beds: 3, baths: 3, sqft: 2100, agentId: "a4", image: "/window.svg" },
  { id: "p6", name: "6 Holland Villas Road", area: "Holland Park", postcode: "W14 8BT", price: 1.85, status: "sold", type: "House", beds: 3, baths: 2, sqft: 1780, agentId: "a5", image: "/window.svg" },
  { id: "p7", name: "3 Cheyne Walk", area: "Chelsea", postcode: "SW3 5TS", price: 1.75, status: "active", type: "Mews", beds: 2, baths: 2, sqft: 1340, agentId: "a2", image: "/window.svg" },
  { id: "p8", name: "19 Montpelier Square", area: "Knightsbridge", postcode: "SW7 1JU", price: 5.4, status: "active", type: "Townhouse", beds: 6, baths: 5, sqft: 4100, agentId: "a1", image: "/window.svg" },
];

/**
 * Fetches all properties. Swap the body for a real call once the backend exists:
 *
 *   const res = await fetch("/api/properties");
 *   return res.json();
 */
export async function getProperties(): Promise<Property[]> {
  return properties;
}
