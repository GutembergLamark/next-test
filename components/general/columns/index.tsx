/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/general/table/tableRowActions/dataTableRowActions";
import { Task } from "@prisma/client";
import { Suspense, useCallback, useEffect } from "react";
import { DataTableColumnHeader } from "../table/dataTableColumnHeader/dataTableColumnHeader";
import { priorities, statuses } from "@/assets/data/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { taskModalStore } from "@/store/tasks.store";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const label = (row.original as any)?.label;

      const { changeModal, showModal } = taskModalStore();
      const router = useRouter();
      const searchParams = useSearchParams();
      const path = usePathname();

      const setOrRemoveQueryIdParam = useCallback(
        (id: string, type?: string) => {
          if (type === "remove") {
            changeModal(false, "create");
            return router.replace(path, { scroll: false });
          }

          const params = new URLSearchParams(searchParams.toString());
          params.set("id", (row?.original as Task).id.toString());
          router.replace(`${path}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, row, path, changeModal]
      );

      useEffect(() => {
        if (!showModal) {
          setOrRemoveQueryIdParam("remove");
        }
      }, [showModal]);

      return (
        <div className="flex space-x-2 ">
          {label && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setOrRemoveQueryIdParam((row.original as Task).id);
                changeModal(true, "view");
              }}
            >
              {label?.title}
            </Badge>
          )}
          <span
            className="max-w-[500px] truncate font-medium cursor-pointer"
            onClick={() => {
              setOrRemoveQueryIdParam((row.original as Task).id);
              changeModal(true, "view");
            }}
          >
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableRowActions row={row} />
      </Suspense>
    ),
  },
];
