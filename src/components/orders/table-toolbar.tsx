"use client";

import { RxCross2 as Cross2Icon } from "react-icons/rx";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { statuses } from "./data/data";
import { DataTableFacetedFilter } from "./table-faceted-filter";
import { DatePickerWithRange } from "./date-range-picker";
import { useTableFilters } from "@/lib/hooks/orders/use-table-filters";
import { useSearchQuery } from "@/lib/hooks/orders/use-search-query";
import { useDebouncedCallback } from "use-debounce";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { query: search, setQuery } = useSearchQuery({ title: "search" });

  const debounced = useDebouncedCallback(async (value: string) => {
    await setQuery(value);
  }, 1000);

  const { query: startDate, setQuery: setStartDate } = useSearchQuery({
    title: "startDate",
  });

  const { query: endDate, setQuery: setEndDate } = useSearchQuery({
    title: "endDate",
  });
  const { query: status, setQuery: setStatus } = useTableFilters({
    title: "Status",
  });
  const isFiltered = status.length > 0 || startDate || endDate || search;

  const handleResetDate = async () => {
    await setStartDate("");
    await setEndDate("");
    await setQuery("");
    await setStatus([]);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Enter customer name or email to filter"
          defaultValue={search}
          onChange={(e) => debounced(e.target.value)}
          className="h-8 w-[150px] lg:w-[320px]"
        />
        {table.getColumn("fulfilmentStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("fulfilmentStatus")}
            title="Status"
            options={statuses}
          />
        )}
        <DatePickerWithRange />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => handleResetDate()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
