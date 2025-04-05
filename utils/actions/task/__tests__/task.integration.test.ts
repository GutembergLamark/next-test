import { PrismaClient, $Enums } from "@prisma/client";
import TaskServer from "../actions/task.class";

const prisma = new PrismaClient();
const taskServer = new TaskServer(prisma);

beforeEach(async () => {
  // Limpa o banco antes de cada teste
  await prisma.task.deleteMany();
  await prisma.label.deleteMany();
});

describe("TaskServer - Integration Tests", () => {
  describe("createTask", () => {
    it("should create a task and label in the database", async () => {
      const formData = new FormData();
      formData.append("title", "Integration Task");
      formData.append("description", "Integration Description");
      formData.append("status", "PENDING");
      formData.append("priority", "LOW");
      formData.append("label", "Work");

      const task = await taskServer.createTask(formData);

      expect(task).toMatchObject({
        title: "Integration Task",
        description: "Integration Description",
        status: $Enums.Status.PENDING,
        priority: $Enums.Priority.LOW,
        label: {
          title: "Work",
          value: "Work",
        },
      });

      const found = await prisma.task.findFirst({
        where: { title: "Integration Task" },
        include: { label: true },
      });
      expect(found).not.toBeNull();
      expect(found?.label?.title).toBe("Work");
    });
    it("should throw an error if task creation fails", async () => {
      const formData = new FormData();

      await expect(taskServer.createTask(formData)).rejects.toThrow();
    });
  });

  describe("updateTask", () => {
    it("should update an existing task", async () => {
      const label = await prisma.label.create({
        data: { title: "Old", value: "Old" },
      });
      const task = await prisma.task.create({
        data: {
          title: "Old Title",
          description: "Old Desc",
          status: $Enums.Status.PENDING,
          priority: $Enums.Priority.MEDIUM,
          label: { connect: { id: label.id } },
        },
        include: { label: true },
      });

      const formData = new FormData();
      formData.append("title", "Updated Title");
      formData.append("description", "Updated Desc");
      formData.append("status", "COMPLETED");
      formData.append("priority", "HIGH");
      formData.append("label", "Updated Label");

      const updated = await taskServer.updateTask(formData, task.id);

      expect(updated).toMatchObject({
        title: "Updated Title",
        description: "Updated Desc",
        status: $Enums.Status.COMPLETED,
        priority: $Enums.Priority.HIGH,
        label: {
          title: "Updated Label",
          value: "Updated Label",
        },
      });
    });
    it("should return null if update fails", async () => {
      const formData = new FormData();
      formData.append("title", "Updated Title");

      const result = await taskServer.updateTask(formData, 9999);

      expect(result).toBeNull();
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const label = await prisma.label.create({
        data: { title: "ToDelete", value: "ToDelete" },
      });
      const task = await prisma.task.create({
        data: {
          title: "To Delete",
          description: "Delete this",
          status: $Enums.Status.PENDING,
          priority: $Enums.Priority.LOW,
          label: { connect: { id: label.id } },
        },
        include: { label: true },
      });

      const deleted = await taskServer.deleteTask(task.id);

      expect(deleted).toMatchObject({ title: "To Delete" });

      const exists = await prisma.task.findUnique({ where: { id: task.id } });
      expect(exists).toBeNull();
    });

    it("should return null if deletion fails", async () => {
      const result = await taskServer.deleteTask(9999);

      expect(result).toBeNull();
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      const label = await prisma.label.create({
        data: {
          title: "Label Test",
          value: "label-test",
        },
      });

      await prisma.task.createMany({
        data: [
          {
            title: "Task 1",
            description: "Desc 1",
            status: "PENDING",
            priority: "LOW",
            labelId: label?.id,
          },
          {
            title: "Task 2",
            description: "Desc 2",
            status: "COMPLETED",
            priority: "HIGH",
            labelId: label?.id,
          },
        ],
      });

      const tasks = await taskServer.getAllTasks();
      expect(tasks.length).toBe(2);
    });
    it("should throw an error if fetching all tasks fails", async () => {
      const original = prisma.task.findMany;
      prisma.task.findMany = jest.fn().mockRejectedValue(new Error("DB Error"));

      await expect(taskServer.getAllTasks()).rejects.toThrow("DB Error");

      prisma.task.findMany = original;
    });
  });

  describe("getTaskById", () => {
    it("should return a task by ID", async () => {
      const task = await prisma.task.create({
        data: {
          title: "Find Me",
          description: "Some",
          status: "PENDING",
          priority: "LOW",
          label: {
            connectOrCreate: {
              where: { title: "Find Me" },
              create: { title: "Find Me", value: "Find Me" },
            },
          },
        },
      });

      const found = await taskServer.getTaskById(task.id);
      expect(found?.title).toBe("Find Me");
    });
    it("should return null if task not found", async () => {
      const result = await taskServer.getTaskById(9999); // ID inexistente
      expect(result).toBeNull();
    });
  });
});
