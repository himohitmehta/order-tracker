"use client";

import { RxCross2 as Cross2Icon } from "react-icons/rx";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./table-view-options";

import { priorities, statuses } from "./data/data";
import { DataTableFacetedFilter } from "./table-faceted-filter";
import { DatePickerWithRange } from "./date-range-picker";
import { useTableFilters } from "@/lib/hooks/orders/use-table-filters";
import { useSearchQuery } from "@/lib/hooks/orders/use-search-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { query: search, setQuery } = useSearchQuery({ title: "search" });
  const [value, setValue] = useState(search ?? "");
  const debounced = useDebouncedCallback(async (value: string) => {
    setValue(value);
    await setQuery(value);
  }, 1000);
  console.log({
    value,
    search,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Orders..."
          defaultValue={search}
          // value={
          //   value
          //   // (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          // }
          onChange={
            (e) => debounced(e.target.value)
            // async (event) => await setQuery(event.target.value)
            // table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("fulfilmentStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("fulfilmentStatus")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <DatePickerWithRange />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
