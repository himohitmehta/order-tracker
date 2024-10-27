"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { api } from "@/trpc/react";
import { Skeleton } from "../ui/skeleton";

export default function OrderItemDetails({
  orderId,
  text,
}: {
  orderId: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = api.orders.getOrderLineItems.useQuery(
    {
      orderId,
    },
    {
      enabled: open,
    },
  );

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button variant="link">{text}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        {isLoading && !data ? (
          <div className={""}>
            <div className="flex w-full flex-col gap-8">
              {[1, 2].map((item) => {
                return (
                  <div
                    key={item}
                    className="flex w-full flex-grow flex-col gap-4"
                  >
                    <Skeleton className="w-50 h-8" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.map((item) => {
              return (
                <div key={item.id} className="my-2 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="font-semibold">Price: ${item.price}</p>
                </div>
              );
            })}
          </div>
        )}{" "}
      </HoverCardContent>
    </HoverCard>
  );
}
