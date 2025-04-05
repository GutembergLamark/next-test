import { columns } from "@/components/general/columns";
import { DataTable } from "@/components/general/table";
import { getAllTasks } from "@/utils/actions/task/actions/task.actions";

import HomeContent from "./page.client";
import Link from "next/link";

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

      <Link
        href="/analytics"
        className="flex items-center justify-center gap-2 w-max m-auto mt-[3rem] mb-[3rem] whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
      >
        Visualização em gráficos
      </Link>
    </main>
  );
}
