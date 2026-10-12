/** Formats £ millions as "£2.85M" or, below £1M, as "£975K". */
export function formatPrice(millions: number): string {
  if (millions >= 1) return `£${millions.toFixed(2)}M`;
  return `£${Math.round(millions * 1000)}K`;
}

const sqftFormatter = new Intl.NumberFormat("en-GB");

export function formatSqft(sqft: number): string {
  return `${sqftFormatter.format(sqft)} sq ft`;
}
