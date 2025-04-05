"use client";

import { ReactNode } from "react";
import { TaskForm } from "../forms/task-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { taskModalStore } from "@/store/tasks.store";

export function TaskDialog({
  type,
  children,
}: {
  type: "create" | "update";
  children: ReactNode;
}) {
  const { showModal, changeModal } = taskModalStore();

  const setDialogClose = () => {
    changeModal(false, type);
  };

  return (
    <Dialog open={showModal} onOpenChange={(open) => changeModal(open, type)}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Preencha os campos para{" "}
            {type === "create" ? "criar uma nova tarefa" : "editar a tarefa"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm setDialogClose={setDialogClose} type={type} />
      </DialogContent>
    </Dialog>
  );
}
