import {
  BodyTaskCreate,
  BodyTaskUpdate,
  ResponsePrismaTaskWithLabel,
  TaskActions,
} from "../types/task.actions.types";
import { $Enums, Label, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { IDbClient } from "../../types/actions.type";

export default class TaskServer implements TaskActions {
  constructor(private readonly dbClient: IDbClient) {}
  async createTask(formData: FormData): Promise<ResponsePrismaTaskWithLabel> {
    const taskData = Object.fromEntries(formData.entries()) as Record<
      keyof BodyTaskCreate,
      FormDataEntryValue
    >;

    try {
      if (!taskData.title) {
        throw new Error("Title is required");
      }

      const data = (await this.dbClient?.task?.create({
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
      const data = (await this.dbClient?.task?.update({
        where: {
          id: id,
        },
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
      }
    }

    return null;
  }
  async deleteTask(id: number): Promise<ResponsePrismaTaskWithLabel | null> {
    try {
      const data = (await this.dbClient?.task?.delete({
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

  async getAllTasks(): Promise<Array<Task & { label: Label }>> {
    try {
      const data = (await this.dbClient?.task?.findMany({
        include: {
          label: true,
        },
      })) as Array<Task & { label: Label }>;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }

      throw new Error("Failed to get tasks");
    }
  }

  async getTaskById(id: number): Promise<Task & { label: Label }> {
    try {
      const data = (await this.dbClient?.task?.findUnique({
        where: {
          id,
        },
        include: {
          label: true,
        },
      })) as Task & { label: Label };

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }

      throw new Error("Failed to get task");
    }
  }
}
