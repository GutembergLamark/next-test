"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { $Enums, Label, Task } from "@prisma/client";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageClient({
  data,
}: {
  data: Array<Task & { label: Label }>;
}) {
  const chartConfig = {
    [$Enums?.Priority?.HIGH?.toLocaleLowerCase()]: {
      label: $Enums?.Priority?.HIGH,
      color: "#2563eb",
    },
    [$Enums?.Priority?.MEDIUM?.toLocaleLowerCase()]: {
      label: $Enums?.Priority?.MEDIUM,
      color: "#60a5fa",
    },
    [$Enums?.Priority?.LOW?.toLocaleLowerCase()]: {
      label: $Enums?.Priority?.MEDIUM,
      color: "#60a5fe",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      [$Enums?.Priority?.HIGH?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) => (acc += cur.priority === $Enums?.Priority?.HIGH ? 1 : 0),
        0
      ),
      [$Enums?.Priority?.MEDIUM?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) =>
          (acc += cur.priority === $Enums?.Priority?.MEDIUM ? 1 : 0),
        0
      ),
      [$Enums?.Priority?.LOW?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) => (acc += cur.priority === $Enums?.Priority?.LOW ? 1 : 0),
        0
      ),
      month: "March",
    },
  ];

  /* const chartData = data?.map((item) => {
    return {
      [$Enums?.Priority?.HIGH?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) => (acc += cur.priority === $Enums?.Priority?.HIGH ? 1 : 0),
        0
      ),
      [$Enums?.Priority?.MEDIUM?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) =>
          (acc += cur.priority === $Enums?.Priority?.MEDIUM ? 1 : 0),
        0
      ),
      [$Enums?.Priority?.LOW?.toLocaleLowerCase()]: data?.reduce(
        (acc, cur) => (acc += cur.priority === $Enums?.Priority?.LOW ? 1 : 0),
        0
      ),
      month: new Date(item.createdAt).getMonth(),
    };
  }); */

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <main>
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
            content={
              <ChartTooltipContent style={{ background: "transparent" }} />
            }
            wrapperStyle={{ background: "transparent" }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </main>
  );
}
