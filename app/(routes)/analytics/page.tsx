import { getAllTasks } from "@/utils/actions/task/actions/task.actions";
import { ChartBar } from "@/components/general/chartBar";
import { ChartArea } from "@/components/general/charArea";
import Link from "next/link";

export default async function Home() {
  const data = await getAllTasks();

  return (
    <main className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-xl font-bold">Aanálise de tarefas via gráficos</h2>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-max whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
        >
          Voltar
        </Link>
      </div>

      <ChartBar data={data} />
      <ChartArea data={data} />
    </main>
  );
}
