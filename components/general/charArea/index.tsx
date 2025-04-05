"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartAreaModel } from "./chartArea.model";
import { ChartAreaProps } from "./chartArea.types";

export function ChartArea({ data }: ChartAreaProps) {
  const { chartData, chartConfig } = useChartAreaModel({ data });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de área por status</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="base"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="var(--color-pending)"
              fillOpacity={0.4}
              stroke="var(--color-pending)"
              stackId="a"
            />
            <Area
              dataKey="in_progress"
              type="natural"
              fill="var(--color-in_progress)"
              fillOpacity={0.4}
              stroke="var(--color-in_progress)"
              stackId="b"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="var(--color-completed)"
              fillOpacity={0.4}
              stroke="var(--color-completed)"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
