"use client";
import React from "react";
import { DataTable } from "./table";
import { orderColumns } from "./order-columns";

export default function Orders() {
  return (
    <div>
      <div className="sticky top-0 z-[1000] mb-4 flex justify-between border-b border-black bg-white">
        <div className="flex flex-col gap-4  pb-4">
          <h1 className="text-2xl font-bold">Fulfilment orders</h1>
          <p className="text-sm font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </p>
        </div>
      </div>
      <DataTable columns={orderColumns} />
    </div>
  );
}
