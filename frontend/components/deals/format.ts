/** Formats £ millions as "£2.85M" or, below £1M, as "£940K". */
export function formatDealValue(millions: number): string {
  if (millions >= 1) return `£${millions.toFixed(2)}M`;
  return `£${Math.round(millions * 1000)}K`;
}
