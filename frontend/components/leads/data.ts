// Dummy data — replace with an API call later.

export type LeadStatus = "new" | "qualified" | "contacted" | "unresponsive";

export type Lead = {
  id: string;
  name: string;
  email: string;
  source: string;
  interest: string;
  budget: string;
  status: LeadStatus;
  agent: string;
  added: string;
};

export const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "qualified", label: "Qualified" },
  { value: "contacted", label: "Contacted" },
  { value: "unresponsive", label: "Unresponsive" },
];

export const leads: Lead[] = [
  {
    id: "1",
    name: "Oliver Hartfield",
    email: "o.hartfield@hartfieldlaw.co.uk",
    source: "Referral",
    interest: "Knightsbridge or Belgravia, min 4 beds, private garden",
    budget: "£3.50M",
    status: "qualified",
    agent: "Sarah Chen",
    added: "28 Nov",
  },
  {
    id: "2",
    name: "Amara Osei",
    email: "amara.osei@gmail.com",
    source: "Website",
    interest: "Notting Hill or Ladbroke Grove, 3 bed, period features",
    budget: "£1.50M",
    status: "contacted",
    agent: "Marcus Webb",
    added: "1 Dec",
  },
  {
    id: "3",
    name: "Rajiv Mehta",
    email: "rajiv.mehta@meridian-cap.com",
    source: "Referral",
    interest: "City or Shoreditch penthouse, investment or own use",
    budget: "£5M",
    status: "qualified",
    agent: "James Okonkwo",
    added: "15 Nov",
  },
  {
    id: "4",
    name: "Charlotte Finch",
    email: "charlotte@finchinteriors.com",
    source: "Social",
    interest: "Richmond or Twickenham, family home, min 4 beds",
    budget: "£950K",
    status: "new",
    agent: "Priya Patel",
    added: "8 Dec",
  },
  {
    id: "5",
    name: "Benedict Cromwell",
    email: "bcromwell@bluewater-partners.co.uk",
    source: "Portal",
    interest: "Chelsea or South Kensington, 3-4 bed, easy commute to City",
    budget: "£2.20M",
    status: "unresponsive",
    agent: "Lucia Ferreira",
    added: "22 Oct",
  },
  {
    id: "6",
    name: "Isabelle de Vries",
    email: "i.devries@devriesgroup.nl",
    source: "Referral",
    interest: "Holland Park or Kensington, 5+ beds, garden essential",
    budget: "£4.50M",
    status: "qualified",
    agent: "Sarah Chen",
    added: "5 Dec",
  },
  {
    id: "7",
    name: "Tom Whitmore",
    email: "tomwhit@outlook.com",
    source: "Website",
    interest: "Hackney or Bethnal Green, 2-3 bed, outdoor space",
    budget: "£800K",
    status: "contacted",
    agent: "Marcus Webb",
    added: "30 Nov",
  },
  {
    id: "8",
    name: "Nadia Volkov",
    email: "n.volkov@vortexcapital.eu",
    source: "Cold Outreach",
    interest: "Mayfair or St John's Wood, prestige asset, flexible on type",
    budget: "£7M",
    status: "new",
    agent: "James Okonkwo",
    added: "10 Dec",
  },
];
