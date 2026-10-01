import { DealsBoard } from "@/components/deals/deals-board";
import { DealsHeader } from "@/components/deals/deals-header";
import { agents, getDeals, stages } from "@/components/deals/data";

export default async function DealsPage() {
  // TODO: this already awaits getDeals(), so pointing it at a real
  // fetch("/api/deals") call later needs no change here.
  const deals = await getDeals();

  return (
    <section>
      <DealsHeader deals={deals} />
      <DealsBoard stages={stages} deals={deals} agents={agents} />
    </section>
  );
}
