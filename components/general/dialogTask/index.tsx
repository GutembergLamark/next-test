"use client";

import { ReactNode, Suspense } from "react";
import { TaskForm } from "../../forms/taskForm/taskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { taskModalStore } from "@/store/tasks.store";

export function TaskDialog({
  type,
  children,
}: {
  type: "create" | "update" | "view";
  children: ReactNode;
}) {
  const { showModal, changeModal } = taskModalStore();

  const setDialogClose = () => {
    changeModal(false, type);
  };

  const title =
    type === "create"
      ? "Criar tarefa"
      : type === "view"
      ? "Visualizar tarefa"
      : "Editar tarefa";

  return (
    <Dialog open={showModal} onOpenChange={(open) => changeModal(open, type)}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type !== "view" && "Preencha os campos para"} {title}
          </DialogTitle>
        </DialogHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskForm setDialogClose={setDialogClose} type={type} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
