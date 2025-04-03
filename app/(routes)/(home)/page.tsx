import { columns } from "@/components/general/columns";
import { DataTable } from "@/components/general/table/data-table";
import { TaskDialog } from "@/components/general/data-dialog-task";
import { getAllTasks } from "@/utils/actions/task/task.actions";

export default async function Home() {
  const data = await getAllTasks();

  return (
    <main className="">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex flex-col items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <TaskDialog type="create" />
          </div>
        </div>
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </main>
  );
}
