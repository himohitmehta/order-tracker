"use client";
import React, { useEffect, useState } from "react";
// import { users } from "./data/seed";
// import { faker } from "@faker-js/faker";
// import { createRandomUser } from "./data/seed";
// import Image from "next/image";
// import { Avatar } from "../ui/avatar";
import users from "./data/data.json";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Customers() {
  //   const [customers, setCustomers] = React.useState(users);

  //   useEffect(() => {
  //     console.log(customers);
  //     setCustomers(users);
  //   }, [users]);

  const { mutate, isPending } = api.customer.create.useMutation({
    onSuccess: () => {
      toast.success("Customer added successfully");
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleClickAddCustomers = async () => {
    setIsLoading(true);
    users.forEach((user) => {
      mutate({
        address: user.address,
        email: user.email,
        name: user.name,
        // phone: user.phone,
      });
      console.log({ user }, "added this user", user.email);
    });
    setIsLoading(false);
    toast.success("Customers added successfully");
  };
  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {/* {customers.map((item) => {
          return (
            <div key={`${item.address}-{item.username}`} className="">
              <div className="flex items-center gap-4">
                <Avatar>
                  <Image
                    src={item.avatar}
                    alt="avatar"
                    unoptimized
                    width={48}
                    height={48}
                    //   className="h-8 w-8"
                  />{" "}
                </Avatar>

                <span>{item.username}</span>
              </div>
              <div>{item.email}</div>
            </div>
          );
        })} */}
        <Button onClick={() => handleClickAddCustomers()} disabled={isLoading}>
          {isLoading ? "Adding customers info" : "Add Customers"}
        </Button>
      </div>
    </div>
  );
}
// export const users = faker.helpers.multiple(createRandomUser, {
//   count: 500,
// });

/**
 * "userId": "26d7388d-bcdc-449b-bf31-654f367d4641",
    "username": "Devin_Wuckert39",
    "email": "Eliane.Runolfsson@hotmail.com",
    "avatar": "https://avatars.githubusercontent.com/u/74069598",
    "password": "OskMgpxfh5vhSM0",
    "birthdate": "1962-08-11T18:53:34.124Z",
    "registeredAt": "2024-04-04T09:16:38.514Z"
  
 */
