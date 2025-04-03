import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Task 1",
      description: "Description 1",
      status: "PENDING",
      priority: "LOW",
      label: {
        create: { title: "Label 1", value: "label-1" },
      },
    },
  });
  const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Task 2",
      description: "Description 2",
      status: "PENDING",
      priority: "LOW",
      label: {
        create: { title: "Label 2", value: "label-2" },
      },
    },
  });
  console.log({ task1, task2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
