import { cn } from "@/lib/utils";
const WIDTH = 80;
const HEIGHT = 24;
const PAD = 2;

/** Dashed trend line. `data` values are 0–100. Colour comes from `currentColor`. */
export function Sparkline({
  data,
  className,
}: {
  data: number[];
  className?: string;
}) {
  const step = WIDTH / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${HEIGHT - PAD - (v / 100) * (HEIGHT - PAD * 2)}`)
    .join(" ");

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("h-6 w-20 flex-none overflow-visible", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
    </svg>
  );
}
