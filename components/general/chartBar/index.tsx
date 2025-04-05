"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useChartBarModel } from "./chartBar.model";
import { ChartBarProps } from "./chartBar.types";

export function ChartBar({ data }: ChartBarProps) {
  const { chartConfig, chartData } = useChartBarModel({ data });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de barras múltiplas por prioridade</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="base"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <Bar dataKey="high" fill="var(--color-high)" radius={4} />
            <Bar dataKey="medium" fill="var(--color-medium)" radius={4} />
            <Bar dataKey="low" fill="var(--color-low)" radius={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
