"use client";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { createRandomProducts } from "./data/seed";
import Image from "next/image";
import { toast } from "sonner";
import products from "./data/data.json";
import { Button } from "../ui/button";
export default function Products() {
  //   const [latestProducts] = api.products.getLatest.useSuspenseQuery();
  //   const utils = api.useUtils();

  //   const form = useForm();
  //  const createPost = api.post.create.useMutation({
  //     onSuccess: async () => {
  //       await utils.post.invalidate();
  //       setName("");
  //     },
  //   });

  const { mutate, isPending } = api.products.create.useMutation({
    onSuccess: () => {
      toast.success("Product added successfully");
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleClickAddProducts = async () => {
    setIsLoading(true);
    products.forEach((product) => {
      mutate({
        description: product.description,
        price: Number(product.price),
        title: product.title,

        // phone: user.phone,
      });
      console.log({ product }, "added this product", product);
    });
    setIsLoading(false);
    toast.success("Customers added successfully");
  };

  return (
    <div>
      {/* <Form {...form}>

    </Form> */}
      <div className="grid grid-cols-4 gap-4">
        <Button onClick={() => handleClickAddProducts()}>Add products</Button>
        {/* 
        {products.map((item) => {
          return (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-md border"
            >
              {/* <div>
                <Image
                  src={item.imageUrl}
                  alt="product image"
                  width={100}
                  height={100}
                  unoptimized
                  className="max-h-20 max-w-20 rounded-md"
                />
              </div> */}
        {/* <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
