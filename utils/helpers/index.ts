import { priorities, statuses } from "@/assets/data/filters";
import { Label, Task } from "@prisma/client";

export const formatDataTasksForChart = (
  data: Array<Task & { label: Label }>,
  type: "status" | "priority"
) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 1. Extrair todos os meses únicos
  const uniqueMonths = new Set(
    data?.map((item) => new Date(item.createdAt).getMonth())
  );

  // 2. Decidir a chave de agrupamento: mês ou dia
  const groupBy = uniqueMonths.size === 1 ? "day" : "month";

  const groupedMap = new Map<string, typeof data>();

  data?.forEach((item) => {
    const date = new Date(item.createdAt);

    const key =
      groupBy === "month"
        ? monthNames[date.getMonth()]
        : `${date.getDate().toString().padStart(2, "0")}/${
            date.getMonth() + 1
          }`; // exemplo: "05/3"

    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }

    groupedMap.get(key)?.push(item);
  });

  const arrayType = type === "status" ? statuses : priorities;

  const chartData = Array.from(groupedMap.entries()).map(([label, items]) => {
    const counts = arrayType.reduce((acc, curValue) => {
      const key = curValue.value?.toLowerCase();
      acc[key] = items.reduce(
        (count, item) => count + (item[type] === curValue.value ? 1 : 0),
        0
      );
      return acc;
    }, {} as Record<string, number>);

    return {
      ...counts,
      ["base"]: label, // `month` ou `day` conforme o caso
    };
  });

  return chartData;
};
