import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ActivityFeed } from "@/components/home/activity-feed";
import { AgentPerformance } from "@/components/home/agent-performance";
import { FeaturedProperty } from "@/components/home/featured-property";
// import { Greeting } from "@/components/home/greeting";
import { PipelineByStage } from "@/components/home/pipeline-by-stage";
import { PipelineSummary } from "@/components/home/pipeline-summary";
import { RecentLeads } from "@/components/home/recent-leads";
import { StatCard } from "@/components/home/stat-card";
import { UpcomingEvents } from "@/components/home/upcoming-events";

export default async function Home() {
  const session = await getSession();

  // send to login if not logged in
  // TODO: enable when i receive the backend api
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-serif text-2xl">Good morning, Sarah</h1>
        <p className="text-sm mt-0.5">Monday, 16 December 2024</p>
      </div>

      {/* 1 col on mobile, 2 on tablet, 12 on desktop */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <PipelineSummary className="md:col-span-2 lg:col-span-5 lg:row-span-2" />

        <StatCard
          label="Avg Days to Close"
          value="47"
          caption="days · -3 vs Q3"
          variant="white"
          className="lg:col-span-3"
        />
        <StatCard
          label="Conversion Rate"
          value={
            <>
              31<span className="text-2xl">%</span>
            </>
          }
          caption="↑ 4pp vs Q3"
          captionClassName="text-moss"
          className="lg:col-span-4"
        />
        <StatCard
          label="Active Deals"
          value="7"
          caption="across 5 stages"
          className="md:col-span-2 lg:col-span-7"
        />

        <PipelineByStage className="md:col-span-2 lg:col-span-12" />

        <RecentLeads className="md:col-span-2 lg:col-span-5" />
        <UpcomingEvents className="lg:col-span-4" />
        <ActivityFeed className="lg:col-span-3" />

        <AgentPerformance className="md:col-span-2 lg:col-span-6" />
        <FeaturedProperty className="md:col-span-2 lg:col-span-6" />
      </div>
    </section>
  );
}
