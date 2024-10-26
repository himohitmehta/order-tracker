"use client";
import { api } from "@/trpc/react";
import React from "react";
import { DataTable } from "./table";
import { orderColumns } from "./order-columns";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FulfilmentStatus } from "@prisma/client";

export default function Orders() {
  // const { data, isLoading } = api.orders.getOrders.useQuery({
  //   page: 0,
  //   pageSize: 10,
  // });
  // const orders = data?.orders;
  // const total = data?.total;
  // const { data: customers } = api.customer.getCustomers.useQuery();
  // const { data: products } = api.products.getLatest.useQuery();

  // const utils = api.useUtils();

  // const { mutate } = api.orders.create.useMutation({
  //   async onSuccess(data, variables, context) {
  //     toast.success("Order added successfully");
  //     await utils.orders.invalidate();
  //   },
  // });
  // const handleAddOrder = () => {
  //   if (!customers) return;
  //   if (!products) return;
  //   // create 50 orders and take 30 customers and create orders for them, add 2-3 products to each order and set random fulfilment status
  //   // customer should not have more than 5 orders
  //   // order should not have more than 5 products
  //   // order should have a total of all products

  //   // const customerIds

  //   // start writing the logic
  //   const orders = Array.from({ length: 500 }).map((_, index) => {
  //     const customerId = customers[index % customers.length]?.id;

  //     // get random product ids from products

  //     const productIds = products
  //       .sort(() => 0.5 - Math.random())
  //       .slice(0, Math.floor(Math.random() * 3) + 1)
  //       .map((product) => product.id);

  //     const selectedProducts = products.filter((product) => {
  //       if (Array.isArray(productIds)) {
  //         return productIds.includes(product.id);
  //       }
  //     });
  //     const total = selectedProducts.reduce(
  //       (acc, product) => acc + product.price,
  //       0,
  //     );
  //     // get random fulfilment status
  //     let status = [
  //       FulfilmentStatus.CANCELLED,
  //       FulfilmentStatus.DELIVERED,
  //       FulfilmentStatus.DISPATCHED,
  //       FulfilmentStatus.OUT_FOR_DELIVERY,
  //       FulfilmentStatus.PENDING,
  //       FulfilmentStatus.PROCESSING,
  //       FulfilmentStatus.RETURNED,
  //     ];

  //     const randomStatus = status[Math.floor(Math.random() * status.length)];

  //     // const

  //     return {
  //       customerId: customerId as string,
  //       productIds: productIds as string[],
  //       quantity: selectedProducts.length,
  //       total: total,
  //       fulfilmentStatus: randomStatus as FulfilmentStatus,
  //     };
  //   });

  //   console.log({ orders });
  //   orders.forEach((order) => {
  //     mutate(order);
  //   });

  //   // mutate({
  //   //   customerId: id,
  //   //   fulfilmentStatus: FulfilmentStatus.PENDING,
  //   //   productIds: [],
  //   //   quantity: 1,
  //   //   total: 100,
  //   // });
  // };

  // console.log({ orders });
  // if (!orders && isLoading) return <div>Loading...</div>;
  // if (orders)
  const { mutate } = api.orders.updateAllOrders.useMutation({
    onSuccess() {
      toast.success("Orders updated successfully");
    },
  });
  const handleUpdateOrders = async () => {
    // await api.orders.updateAllOrders.useMutation()
    mutate();
  };
  return (
    <div>
      <Button onClick={handleUpdateOrders}>Update Orders</Button>
      <DataTable
        //  data={orders}
        columns={orderColumns}
        // totalRows={total}
      />
    </div>
  );
}
