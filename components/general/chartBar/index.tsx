import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useChartBarModel } from "./chartBar.model";
import { ChartBarProps } from "./chartBar.types";

export function ChartBar({ data }: ChartBarProps) {
  const { chartConfig, chartData } = useChartBarModel({ data });

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="high" fill="var(--color-high)" radius={4} />
        <Bar dataKey="medium" fill="var(--color-medium)" radius={4} />
        <Bar dataKey="low" fill="var(--color-low)" radius={4} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent style={{ background: "transparent" }} />
          }
          wrapperStyle={{ background: "transparent" }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}
