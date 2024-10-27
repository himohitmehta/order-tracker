/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { type ColumnDef } from "@tanstack/react-table";

// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "./data/data";
import { DataTableColumnHeader } from "./table-column-header";
import { type Order, type Customer } from "@prisma/client";
import { format } from "date-fns";
import OrderItemDetails from "./order-items-details";

/**
 * {
    "id": "c67ce873-b106-498b-a2db-5b9bce6dcb19",
    "quantity": 3,
    "total": 1139.91,
    "createdAt": "2024-10-25T09:34:38.030Z",
    "updatedAt": "2024-10-25T09:34:38.030Z",
    "customerId": "6d235182-e304-4495-9633-2cadbe469223",
    "productIds": [
        "0ec1375b-2992-43a0-b54c-6bbf73c59a11",
        "6796fbe8-a482-40d1-a848-6fc928861e31",
        "0bcae28c-a097-4641-b993-96a544f077c4"
    ],
    "fulfilmentStatus": "RETURNED",
    "productId": null,
    customer:{
    "id": "6d235182-e304-4495-9633-2cadbe469223",
    "name": "Maritza Predovic",
    "email": "Lisandro.Kshlerin-Douglas@yahoo.com",
    "phone": "",
    "createdAt": "2024-10-25T08:43:45.598Z",
    "updatedAt": "2024-10-25T08:43:45.598Z",
    "address": "625 Randi Mall, Port Ociefurt, Oklahoma, Mali - 38037-0074"
}
}
 */

interface OrderType extends Order {
  customer: Customer;
}

export const orderColumns: ColumnDef<OrderType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ordered On"
        orderKey={"dateOrder"}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">
        {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy, hh:mm a")}
      </div>
    ),
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      //   const label = labels.find((label) => label.value === row.original.label);
      const name = row.original.customer.name;
      const email = row.original.customer.email;
      return (
        <div className="">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <h4 className="max-w-[500px] truncate font-medium">{name}</h4>
          {/* <br /> */}
          <p>{email}</p>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const address = row.original.customer.address;
      return (
        <div className="">
          <h4 className="w-[320px] break-words font-medium">{address}</h4>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order line items" />
    ),
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return (
        <div className="w-[120px]">
          <OrderItemDetails
            text={`${quantity} ${quantity > 1 ? "items" : "item"}`}
            orderId={row.original.id}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fulfilmentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("fulfilmentStatus"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          {/* {row.getValue("fulfilmentStatus")} */}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Total"
        orderKey={"total"}
      />
    ),
    cell: ({ row }) => {
      const total = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(row.getValue("total"));

      return (
        <div className="flex items-center">
          {/* {priority.icon && (
            <priority.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )} */}
          <span>{total}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value?.includes(row.getValue(id));
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  //   },
];
