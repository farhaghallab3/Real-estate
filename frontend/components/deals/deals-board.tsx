import { StageColumn } from "./stage-column";
import type { Agent, Deal, Stage } from "./data";

export function DealsBoard({
  stages,
  deals,
  agents,
}: {
  stages: Stage[];
  deals: Deal[];
  agents: Agent[];
}) {
  const agentById = new Map(agents.map((a) => [a.id, a]));

  return (
    <div className="flex min-h-[420px] gap-0 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <StageColumn
          key={stage.id}
          stage={stage}
          deals={deals.filter((d) => d.stageId === stage.id)}
          agentById={agentById}
        />
      ))}
    </div>
  );
}
