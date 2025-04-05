export const prisma = {
  task: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      title: "Test Task",
      description: "Test Description",
      status: "PENDING",
      priority: "LOW",
      label: { title: "Test Label", value: "Test Label" },
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      title: "Updated Task",
      description: "Updated Description",
      status: "COMPLETED",
      priority: "HIGH",
      label: { title: "Updated Label", value: "Updated Label" },
    }),
    delete: jest.fn().mockResolvedValue({
      id: 1,
      title: "Deleted Task",
      label: { title: "Any Label", value: "Any Label" },
    }),
    findMany: jest.fn().mockResolvedValue([
      { id: 1, title: "Mock Task 1", label: {} },
      { id: 2, title: "Mock Task 2", label: {} },
    ]),
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      title: "Mock Task",
      label: { title: "Any Label", value: "Any Label" },
    }),
  },
};
