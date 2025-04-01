import { $Enums } from "@prisma/client";

export interface TaskActions {
  createTask: (formData: FormData) => Promise<ResponsePrismaTask | null>;
  updateTask: (
    formData: FormData,
    id: number
  ) => Promise<ResponsePrismaTask | null>;
  deleteTask: (id: number) => Promise<ResponsePrismaTask | null>;
}

export interface BodyTaskCreate {
  title: string;
  description: string;
  status: $Enums.Status | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BodyTaskUpdate extends BodyTaskCreate {}

export interface ResponsePrismaTask {
  title: string;
  id: number;
  status: $Enums.Status;
  description: string | null;
}
