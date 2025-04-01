import { prisma } from "@/utils/lib/prisma/db";
import {
  BodyTaskCreate,
  BodyTaskUpdate,
  ResponsePrismaTask,
  TaskActions,
} from "./task.actions.types";
import { $Enums } from "@prisma/client";

class Task implements TaskActions {
  async createTask(formData: FormData): Promise<ResponsePrismaTask | null> {
    "use server";

    const taskData = Object.fromEntries(formData.entries()) as Record<
      keyof BodyTaskCreate,
      FormDataEntryValue
    >;

    try {
      const data = await prisma?.task?.create({
        data: {
          title: (taskData.title as string) ?? "",
          description: (taskData.description as string) ?? "",
          status:
            $Enums.Status[taskData.status as $Enums.Status] ??
            $Enums.Status.PENDING,
        },
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }

  async updateTask(
    formData: FormData,
    id: number
  ): Promise<ResponsePrismaTask | null> {
    "use server";

    const taskData = Object.fromEntries(formData.entries()) as Record<
      keyof BodyTaskUpdate,
      FormDataEntryValue
    >;

    try {
      const data = await prisma?.task?.update({
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
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }
  async deleteTask(id: number): Promise<ResponsePrismaTask | null> {
    "use server";

    try {
      const data = await prisma?.task?.delete({
        where: {
          id,
        },
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return null;
  }
}

const ImplTask = new Task();

export default ImplTask;
