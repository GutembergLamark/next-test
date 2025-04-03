"use server";
import { prisma } from "@/utils/lib/prisma/db";
import {
  BodyTaskCreate,
  BodyTaskUpdate,
  ResponsePrismaTaskWithLabel,
  TaskActions,
} from "./task.actions.types";
import { $Enums, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

class TaskServer implements TaskActions {
  async createTask(formData: FormData): Promise<ResponsePrismaTaskWithLabel> {
    const taskData = Object.fromEntries(formData.entries()) as Record<
      keyof BodyTaskCreate,
      FormDataEntryValue
    >;

    try {
      const data = (await prisma?.task?.create({
        data: {
          title: (taskData.title as string) ?? "",
          description: (taskData.description as string) ?? "",
          status:
            $Enums.Status[taskData.status as $Enums.Status] ??
            $Enums.Status.PENDING,
          priority:
            $Enums.Priority[taskData.priority as $Enums.Priority] ??
            $Enums.Priority.LOW,
          label: {
            connectOrCreate: {
              where: {
                title: (taskData.label as string) ?? "",
              },
              create: {
                title: (taskData.label as string) ?? "",
                value: (taskData.label as string) ?? "",
              },
            },
          },
        },
        include: {
          label: true,
        },
      })) as ResponsePrismaTaskWithLabel;

      revalidatePath("/");

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }

      throw new Error("Failed to create task");
    }
  }

  async updateTask(
    formData: FormData,
    id: number
  ): Promise<ResponsePrismaTaskWithLabel | null> {
    const taskData = Object.fromEntries(formData.entries()) as Record<
      keyof BodyTaskUpdate,
      FormDataEntryValue
    >;

    try {
      const data = (await prisma?.task?.update({
        where: {
          id: id,
        },
        data: {
          title: (taskData.title as string) ?? "",
          description: (taskData.description as string) ?? "",
          status:
            $Enums.Status[taskData.status as $Enums.Status] ??
            $Enums.Status.PENDING,
        },
        include: {
          label: true,
        },
      })) as ResponsePrismaTaskWithLabel;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }
  async deleteTask(id: number): Promise<ResponsePrismaTaskWithLabel | null> {
    try {
      const data = (await prisma?.task?.delete({
        where: {
          id,
        },
        include: {
          label: true,
        },
      })) as ResponsePrismaTaskWithLabel;

      revalidatePath("/");

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }

  async getAllTasks(): Promise<Array<Task> | null> {
    try {
      const data = (await prisma?.task?.findMany({
        include: {
          label: true,
        },
      })) as Array<Task>;

      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }
}

const taskServer = new TaskServer();

// Exporte as Server Actions individualmente
export const createTask = async (formData: FormData) => {
  return taskServer.createTask(formData);
};

export const updateTask = async (formData: FormData, id: number) => {
  return taskServer.updateTask(formData, id);
};

export const deleteTask = async (id: number) => {
  return taskServer.deleteTask(id);
};

export const getAllTasks = async () => {
  return taskServer.getAllTasks();
};
