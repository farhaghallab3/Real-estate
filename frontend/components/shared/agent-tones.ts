export type AgentTone = "gold" | "sage" | "bronze" | "lavender" | "rose";

export const agentTones: Record<
  AgentTone,
  { border: string; avatar: string; bar: string; line: string }
> = {
  gold: {
    border: "border-gold/25",
    avatar: "bg-gold/15 text-gold",
    bar: "bg-gold",
    line: "text-gold",
  },
  sage: {
    border: "border-sage/25",
    avatar: "bg-sage/15 text-sage",
    bar: "bg-sage",
    line: "text-sage",
  },
  bronze: {
    border: "border-bronze/25",
    avatar: "bg-bronze/15 text-bronze",
    bar: "bg-bronze",
    line: "text-bronze",
  },
  lavender: {
    border: "border-lavender/25",
    avatar: "bg-lavender/15 text-lavender",
    bar: "bg-lavender",
    line: "text-lavender",
  },
  rose: {
    border: "border-rose/25",
    avatar: "bg-rose/15 text-rose",
    bar: "bg-rose",
    line: "text-rose",
  },
};
