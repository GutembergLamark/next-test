"use client";

import {
  createTask,
  getTaskById,
  updateTask,
} from "@/utils/actions/task/task.actions";
import Form from "next/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { priorities, statuses } from "@/assets/data/filters";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label, Task } from "@prisma/client";

export function TaskForm({
  setDialogClose,
  type,
}: {
  setDialogClose: () => void;
  type: string;
}) {
  const searchParams = useSearchParams();
  const [task, setTask] = useState<(Task & { label: Label }) | null>(null);

  const syncTaskById = async () => {
    const id = parseInt(searchParams.get("id") as string);
    const task = await getTaskById(id);
    setTask(task);
  };

  useEffect(() => {
    if (type === "update" && searchParams.get("id")) {
      syncTaskById();
    }
  }, [type, searchParams]);

  return (
    <Form
      action={async (formData) => {
        if (type === "create") {
          await createTask(formData);
        }

        if (type === "update") {
          const id = parseInt(searchParams.get("id") as string);
          await updateTask(formData, id);
        }

        setDialogClose();
      }}
      className="flex items-center gap-4 flex-wrap flex-[1]"
    >
      <>
        <Input
          placeholder="Título"
          name="title"
          className="h-8"
          defaultValue={task?.title}
        />
        <Textarea
          placeholder="Descrição"
          name="description"
          className="h-20"
          defaultValue={task?.description ?? ""}
        />
        <Select name="priority" defaultValue={task?.priority?.toString()}>
          <SelectTrigger className="h-8 max-w-[calc(50%-.50rem)] w-[100%] cursor-pointer">
            <SelectValue placeholder={"Prioridade"} />
          </SelectTrigger>
          <SelectContent side="top">
            {priorities.map((priority) => (
              <SelectItem
                key={priority?.value}
                value={priority?.value}
                className="cursor-pointer"
              >
                {priority?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="status" defaultValue={task?.status}>
          <SelectTrigger className="h-8 max-w-[calc(50%-.50rem)] w-[100%] cursor-pointer">
            <SelectValue placeholder={"Status"} />
          </SelectTrigger>
          <SelectContent side="top">
            {Object.values(statuses).map((status) => (
              <SelectItem
                key={status?.value}
                value={status?.value}
                className="cursor-pointer"
              >
                {status?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Label"
          name="label"
          className="h-8 "
          defaultValue={task?.label?.title}
        />
      </>

      {/*  {!task && (
        <>
          <Input placeholder="Título" name="title" className="h-8 " />
          <Textarea
            placeholder="Descrição"
            name="description"
            className="h-20"
          />
          <Select name="priority">
            <SelectTrigger className="h-8 max-w-[calc(50%-.50rem)] w-[100%] cursor-pointer">
              <SelectValue placeholder={"Prioridade"} />
            </SelectTrigger>
            <SelectContent side="top">
              {priorities.map((priority) => (
                <SelectItem
                  key={priority?.value}
                  value={priority?.value}
                  className="cursor-pointer"
                >
                  {priority?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name="status">
            <SelectTrigger className="h-8 max-w-[calc(50%-.50rem)] w-[100%] cursor-pointer">
              <SelectValue placeholder={"Status"} />
            </SelectTrigger>
            <SelectContent side="top">
              {Object.values(statuses).map((status) => (
                <SelectItem
                  key={status?.value}
                  value={status?.value}
                  className="cursor-pointer"
                >
                  {status?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input placeholder="Label" name="label" className="h-8 " />
        </>
      )} */}

      <Button type="submit" className="ml-auto">
        {type === "create" ? "Criar" : "Atualizar"}
      </Button>
    </Form>
  );
}
