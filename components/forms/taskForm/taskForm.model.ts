import { getTaskById } from "@/utils/actions/task/actions/task.actions";
import { Label, Task } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useTaskFormModel({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const [task, setTask] = useState<(Task & { label: Label }) | null>(null);

  const syncTaskById = async () => {
    const id = parseInt(searchParams.get("id") as string);
    const task = await getTaskById(id);
    setTask(task);
  };

  useEffect(() => {
    if ((type === "update" || type === "view") && searchParams.get("id")) {
      syncTaskById();
    }
  }, [type, searchParams]);

  return {
    task,
    searchParams,
  };
}
