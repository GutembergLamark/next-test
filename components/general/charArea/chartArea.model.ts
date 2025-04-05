import { statuses } from "@/assets/data/filters";
import { ChartConfig } from "@/components/ui/chart";
import { formatDataTasksForChart } from "@/utils/helpers";
import { ChartAreaProps } from "./chartArea.types";

export function useChartAreaModel({ data }: ChartAreaProps) {
  const chartConfig = {
    [statuses[0].value?.toLowerCase()]: {
      label: statuses[0].label,
      color: "#2563de",
    },
    [statuses[1].value?.toLowerCase()]: {
      label: statuses[1].label,
      color: "#60a5fa",
    },
    [statuses[2].value?.toLowerCase()]: {
      label: statuses[2].label,
      color: "#60aede",
    },
  } satisfies ChartConfig;

  const chartData = formatDataTasksForChart(data, "status");

  return {
    chartConfig,
    chartData,
  };
}
