import { columns } from "@/components/general/columns";
import { DataTable } from "@/components/general/table";
import { getAllTasks } from "@/utils/actions/task/actions/task.actions";

import HomeContent from "./page.client";

export default async function Home() {
  const data = await getAllTasks();

  return (
    <main>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex flex-col items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bem-vindo!</h2>
            <p className="text-muted-foreground">
              Aqui está o seu gerenciador de tarefas!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <HomeContent />
          </div>
        </div>
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </main>
  );
}
