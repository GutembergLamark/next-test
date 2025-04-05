import { $Enums, Label, Task } from "@prisma/client";

export interface TaskActions {
  createTask: (formData: FormData) => Promise<ResponsePrismaTask | null>;
  updateTask: (
    formData: FormData,
    id: number
  ) => Promise<ResponsePrismaTask | null>;
  deleteTask: (id: number) => Promise<ResponsePrismaTask | null>;
  getAllTasks: () => Promise<Array<Task & { label: Label }>>;
  getTaskById: (id: number) => Promise<Task & { label: Label }>;
}

export interface BodyTaskCreate {
  title: string;
  description: string;
  status: $Enums.Status | undefined;
  priority: $Enums.Priority | undefined;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BodyTaskUpdate extends BodyTaskCreate {}

export interface ResponsePrismaTask {
  title: string;
  id: number;
  status: $Enums.Status;
  description: string | null;
  priority: $Enums.Priority;
}

export interface ResponsePrismaTaskWithLabel extends ResponsePrismaTask {
  label: {
    id: number;
    title: string;
    value: string;
  };
}
