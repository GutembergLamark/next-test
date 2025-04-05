import { priorities } from "@/assets/data/filters";
import { Label, Task } from "@prisma/client";

export const formatDataTasksForBarChart = (
  data: Array<Task & { label: Label }>
) => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const groupedByMonth = new Map<string, typeof data>();

  data?.forEach((item) => {
    const monthIndex = new Date(item.createdAt).getMonth();
    const monthName = monthNames[monthIndex];

    if (!groupedByMonth.has(monthName)) {
      groupedByMonth.set(monthName, []);
    }

    groupedByMonth.get(monthName)?.push(item);
  });

  const chartData = Array.from(groupedByMonth.entries()).map(
    ([month, items]) => {
      const priorityCounts = priorities.reduce((acc, priority) => {
        const key = priority.value?.toLowerCase();
        acc[key] = items.reduce(
          (count, item) => count + (item.priority === priority.value ? 1 : 0),
          0
        );
        return acc;
      }, {} as Record<string, number>);

      return {
        ...priorityCounts,
        month,
      };
    }
  );

  return chartData;
};
