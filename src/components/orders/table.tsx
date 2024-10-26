"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./table-pagination";
import { DataTableToolbar } from "./table-toolbar";
import { api } from "@/trpc/react";
import { FulfilmentStatus } from "@prisma/client";
import { useTableFilters } from "@/lib/hooks/orders/use-table-filters";
import { Skeleton } from "../ui/skeleton";
import { useSearchQuery } from "@/lib/hooks/orders/use-search-query";
import { keepPreviousData } from "@tanstack/react-query";
// import Pagination from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
  // totalRows?: number;
}

export function DataTable<TData, TValue>({
  columns,
  // data,
  // totalRows,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { query } = useTableFilters({ title: "Status" });
  const { query: search } = useSearchQuery({ title: "search" });
  const { query: startDate } = useSearchQuery({ title: "startDate" });
  const { query: endDate } = useSearchQuery({ title: "endDate" });

  console.log({ columnFilters, query });
  const {
    data: ordersData,
    isLoading,
    isRefetching,
    isFetching,
    isPending,
  } = api.orders.getOrders.useQuery(
    {
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      fulfilmentStatus: query,
      customer: search,
      startDate: startDate,
      endDate: endDate,
      // fulfilmentStatus: columnFilters.filter(
      //   (item) => item.id === "fulfilmentStatus",
      // )?.values,
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  const data = ordersData?.orders as TData[];
  const totalRows = ordersData?.total;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    // enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    rowCount: totalRows ?? 0,
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  // if (isLoading) {
  //   return <div>Loading</div>;
  // }
  if (isRefetching  || isFetching || isPending) {
    return (
      <div className="space-y-4">
        {/* <DataTableToolbar table={table} /> */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {[11, 22, 33, 444, 555].map((headerGroup) => (
                <TableRow key={headerGroup}>
                  {[1, 2, 3, 4, 5].map((header) => {
                    return (
                      <TableHead key={header} colSpan={1}>
                        {/* {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )} */}
                        <Skeleton className="h-8 w-20" />
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8].length ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                  <TableRow
                    key={row}
                    // data-state={row.getIsSelected() && "selected"}
                  >
                    {[12, 34, 56, 55, 666, 77, 88].map((cell) => (
                      <TableCell key={cell}>
                        {/* {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )} */}
                        <Skeleton className="h-8 w-20" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found matching your query.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} totalRows={totalRows!} />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found matching your query.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <Pagination pageSize={10} totalCount={totalRows!} /> */}
      <DataTablePagination table={table} totalRows={totalRows!} />
    </div>
  );
}
