"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchQuery } from "@/lib/hooks/orders/use-search-query";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { query: startDate, setQuery: setStartDate } = useSearchQuery({
    title: "startDate",
  });

  const { query: endDate, setQuery: setEndDate } = useSearchQuery({
    title: "endDate",
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : new Date(),
    to: endDate ? new Date(endDate) : new Date(),
  });
  const handleSetDate = async (value: DateRange) => {
    const from = format(value.from!, "yyyy-MM-dd");
    const to = format(value.to!, "yyyy-MM-dd");
    await setStartDate(from);
    await setEndDate(to);
    setDate(value);
  };
  const handleResetDate = async () => {
    await setStartDate("");
    await setEndDate("");
    setDate(undefined);
  };

  return (
    <div className="flex gap-4">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(value) => handleSetDate(value!)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button variant={'ghost'} size={'sm'} onClick={handleResetDate}>Reset</Button>
    </div>
  );
}
