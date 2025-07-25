"use client";

import * as React from "react";
import { format } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] lg:w-[300px] sm:py-6 py-3 justify-center rounded-[15px] h-[45px] bg-pink-100",
            !date && "text-muted-foreground",
            "text-primary font-montserrat font-extrabold"
          )}
        >
          <LuCalendarDays className="text-primary text-3xl" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-primary text-[15px] font-montserrat font-extrabold">
              Choose birthday date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-primary" align="start">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
