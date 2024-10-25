"use client";
import React from "react";
import { usePagination, DOTS } from "@/lib/hooks/use-pagination";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePageQuery } from "@/lib/hooks/orders/use-page-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function Pagination({
  //   onPageChange,
  totalCount,
  siblingCount = 1,
  //   currentPage,
  pageSize = 10,
  //   className,
}: {
  //   onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  //   currentPage: number;
  pageSize: number;
  //   className: string;
}) {
  // const {
  // 	onPageChange,
  // 	totalCount,
  // 	siblingCount = 1,
  // 	currentPage,
  // 	pageSize,
  // 	className,
  // } = props;
  const { page, setPage } = usePageQuery();
  const currentPage = Number(page) ?? 0;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })!;

  if (
    currentPage === 0 ||
    // (Array.isArray(paginationRange) &&
    paginationRange?.length < 2
  ) {
    return null;
  }

  const onPageChange = async (page: number) => {
    await setPage(page.toString());
  };
  console.log({ paginationRange, currentPage });
  const onNext = async () => {
    await onPageChange(currentPage + 1);
  };

  const onPrevious = async () => {
    await onPageChange(currentPage - 1);
  };

  const lastPage =
    Array.isArray(paginationRange) &&
    paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} */}
        {pageSize} of{" "}
        {
          // table.getFilteredRowModel().rows.length
          totalCount
        }
        row(s) selected.
      </div>
      <div className="flex items-center  gap-4 py-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >{`<`}</Button>
        {paginationRange?.map((item: string | number) => {
            // do not show two consecutive DOTS
           

            
          if (item === DOTS) {
            return (
              <Button
                variant={"ghost"}
                size={"icon"}
                // onClick={() => onPageChange(item)}
                key={item}
                disabled
                className="h-8 w-8"
                // className="bg-black text-white p-3 rounded-md"
              >
                {/* {`...`} */}
                &#8230;
              </Button>
            );
          }
          return (
            <Button
              variant={item === currentPage ? "default" : "ghost"}
              size={"icon"}
              onClick={() => onPageChange(Number(item))}
              key={item}
              className="h-8 w-8"
              // className="bg-black text-white p-3 rounded-md"
            >
              {item}
            </Button>
          );
        })}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onNext}
          className="h-8 w-8"
          disabled={currentPage === lastPage}
        >{`>`}</Button>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
        // value={`${table.getState().pagination.pageSize}`}
        // onValueChange={(value) => {
        //   table.setPageSize(Number(value));
        // }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue
              placeholder={
                // table.getState().pagination.pageSize
                "10"
              }
            />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((item) => (
              <SelectItem key={item} value={`${item}`}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
