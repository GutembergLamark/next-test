import { getAllTasks } from "@/utils/actions/task/task.actions";
import PageClient from "./page.client";

export default async function Home() {
  const data = await getAllTasks();

  console.log(data);

  return (
    <>
      <PageClient data={data} />
    </>
  );
}
