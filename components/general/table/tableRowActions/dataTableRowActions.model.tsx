import { Task } from "@prisma/client";
import { taskModalStore } from "@/store/tasks.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { DataTableRowActionsProps } from "./dataTableRowActions";

export default function useDataTableRowActionsModel<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const { changeModal, showModal } = taskModalStore();

  const setOrRemoveQueryIdParam = useCallback((type: string) => {
    if (type === "remove") {
      changeModal(false, "create");
      return router.replace(path);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("id", (row?.original as Task).id.toString());
    router.replace(`?${params.toString()}`);
  }, []);

  const openModalEdit = () => {
    changeModal(true, "update");
  };

  useEffect(() => {
    if (!showModal) {
      setOrRemoveQueryIdParam("remove");
    }
  }, [showModal]);

  return {
    setOrRemoveQueryIdParam,
    openModalEdit,
  };
}
