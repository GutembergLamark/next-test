"use server";

import { prisma } from "@/utils/lib/prisma/db";
import TaskServer from "./task.class";

const taskServer = new TaskServer(prisma);

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
export const getTaskById = async (id: number) => {
  return taskServer.getTaskById(id);
};
