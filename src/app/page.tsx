/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  api,
  // api,
  //  api,
  HydrateClient,
} from "@/trpc/server";
// import path from "path";
// import { z } from "zod";
// import { promises as fs } from "fs";
import Orders from "@/components/orders";
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/components/orders/data/tasks.json"),
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }
export default async function Home() {
  // const { orders, total } = await api.orders.getOrders();
  // const orders = data?.orders;
  // const total = data?.total;

  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  await api.orders.getOrders({});

  return (
    <HydrateClient>
      {/* <div>table will shown here</div>{" "}
       */}
      <div className="mx-auto max-w-screen-xl px-2 py-8">
        <Orders />
        {/* <DataTable data={orders} columns={columns} /> */}
      </div>
    </HydrateClient>
  );
}
