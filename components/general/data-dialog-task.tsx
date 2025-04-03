"use client";

import { useState } from "react";
import { CreateTaskForm } from "../forms/task-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function TaskDialog({ type }: { type: string }) {
  const [open, setOpen] = useState(type === "edit" ? true : false);

  const setDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {type === "create" && (
        <DialogTrigger asChild>
          <Button variant="outline">
            {type === "create" ? "Criar Task" : "Editar"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Preencha os campos para criar uma nova tarefa
          </DialogTitle>
        </DialogHeader>
        <CreateTaskForm setDialogClose={setDialogClose} type={type} />
      </DialogContent>
    </Dialog>
  );
}
