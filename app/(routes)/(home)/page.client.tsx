"use client";

import { TaskDialog } from "@/components/general/dialogTask";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { taskModalStore } from "@/store/tasks.store";

export default function HomeContent() {
  const { type } = taskModalStore();

  return (
    <TaskDialog type={type}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Task</Button>
      </DialogTrigger>
    </TaskDialog>
  );
}
