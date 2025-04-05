import { prisma } from "@/__mocks__/@/utils/lib/prisma/db";
import { revalidatePath } from "@/__mocks__/next/cache";
import { $Enums } from "@prisma/client";
import TaskServer from "../actions/task.class";

describe("TaskServer - Unit Tests", () => {
  let taskServer: TaskServer;

  beforeEach(() => {
    taskServer = new TaskServer(prisma);
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a task with valid data", async () => {
      const mockFormData = new FormData();
      mockFormData.append("title", "Test Task");
      mockFormData.append("description", "Test Description");
      mockFormData.append("status", "PENDING");
      mockFormData.append("priority", "LOW");
      mockFormData.append("label", "Test Label");

      const result = await taskServer.createTask(mockFormData);

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          title: "Test Task",
          description: "Test Description",
          status: $Enums.Status.PENDING,
          priority: $Enums.Priority.LOW,
          label: {
            connectOrCreate: {
              where: { title: "Test Label" },
              create: { title: "Test Label", value: "Test Label" },
            },
          },
        },
        include: { label: true },
      });

      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(result).toEqual({
        id: 1,
        title: "Test Task",
        description: "Test Description",
        status: "PENDING",
        priority: "LOW",
        label: { title: "Test Label", value: "Test Label" },
      });
    });

    it("should throw an error when creation fails", async () => {
      const mockFormData = new FormData();

      if (!mockFormData?.get("title")) {
        await expect(taskServer.createTask(mockFormData)).rejects.toThrow(
          "Title is required"
        );
      }

      if (mockFormData?.get("title")) {
        (prisma.task.create as jest.Mock).mockRejectedValueOnce(
          new Error("DB Error")
        );

        await expect(taskServer.createTask(mockFormData)).rejects.toThrow(
          "DB Error"
        );
      }
    });
  });

  describe("updateTask", () => {
    it("should update a task with valid data", async () => {
      const mockFormData = new FormData();
      mockFormData.append("title", "Updated Task");
      mockFormData.append("description", "Updated Description");
      mockFormData.append("status", "COMPLETED");
      mockFormData.append("priority", "HIGH");
      mockFormData.append("label", "Updated Label");

      const result = await taskServer.updateTask(mockFormData, 1);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: "Updated Task",
          description: "Updated Description",
          status: $Enums.Status.COMPLETED,
          priority: $Enums.Priority.HIGH,
          label: {
            connectOrCreate: {
              where: { title: "Updated Label" },
              create: { title: "Updated Label", value: "Updated Label" },
            },
          },
        },
        include: { label: true },
      });

      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(result).toEqual({
        id: 1,
        title: "Updated Task",
        description: "Updated Description",
        status: "COMPLETED",
        priority: "HIGH",
        label: { title: "Updated Label", value: "Updated Label" },
      });
    });

    it("should return null when update fails", async () => {
      (prisma.task.update as jest.Mock).mockRejectedValueOnce(
        new Error("DB Error")
      );

      const mockFormData = new FormData();

      const result = await taskServer.updateTask(mockFormData, 1);
      expect(result).toBeNull();
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const result = await taskServer.deleteTask(1);

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { label: true },
      });

      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(result).toEqual({
        id: 1,
        title: "Deleted Task",
        label: { title: "Any Label", value: "Any Label" },
      });
    });

    it("should return null when deletion fails", async () => {
      (prisma.task.delete as jest.Mock).mockRejectedValueOnce(
        new Error("DB Error")
      );

      const result = await taskServer.deleteTask(1);
      expect(result).toBeNull();
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      const result = await taskServer.getAllTasks();

      expect(prisma.task.findMany).toHaveBeenCalledWith({
        include: { label: true },
      });

      expect(result).toEqual([
        { id: 1, title: "Mock Task 1", label: {} },
        { id: 2, title: "Mock Task 2", label: {} },
      ]);
    });

    it("should throw an error when fetching fails", async () => {
      (prisma.task.findMany as jest.Mock).mockRejectedValueOnce(
        new Error("DB Error")
      );

      await expect(taskServer.getAllTasks()).rejects.toThrow("DB Error");
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", async () => {
      const result = await taskServer.getTaskById(1);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { label: true },
      });

      expect(result).toEqual({
        id: 1,
        title: "Mock Task",
        label: { title: "Any Label", value: "Any Label" },
      });
    });

    it("should throw an error when fetching fails", async () => {
      (prisma.task.findUnique as jest.Mock).mockRejectedValueOnce(
        new Error("DB Error")
      );

      await expect(taskServer.getTaskById(1)).rejects.toThrow("DB Error");
    });
  });
});
