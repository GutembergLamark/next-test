import { priorities } from "@/assets/data/filters";
import { ChartConfig } from "@/components/ui/chart";
import { formatDataTasksForBarChart } from "@/utils/helpers";
import { ChartBarProps } from "./chartBar.types";

export function useChartBarModel({ data }: { data: ChartBarProps }) {
  const chartConfig = {
    [priorities[0].value?.toLowerCase()]: {
      label: priorities[0].label,
      color: "#2563eb",
    },
    [priorities[1].value?.toLowerCase()]: {
      label: priorities[1].label,
      color: "#60a5fa",
    },
    [priorities[2].value?.toLowerCase()]: {
      label: priorities[2].label,
      color: "#60a5fe",
    },
  } satisfies ChartConfig;

  const chartData = formatDataTasksForBarChart(data);

  return {
    chartConfig,
    chartData,
  };
}
