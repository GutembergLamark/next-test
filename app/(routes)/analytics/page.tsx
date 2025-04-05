import { getAllTasks } from "@/utils/actions/task/actions/task.actions";
import PageClient from "./page.client";

export default async function Home() {
  const data = await getAllTasks();

  return (
    <main>
      <PageClient data={data} />
    </main>
  );
}
