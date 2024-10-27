/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { api, HydrateClient } from "@/trpc/server";
import Orders from "@/components/orders";
export default async function Home() {
  await api.orders.getOrders({});

  return (
    <HydrateClient>
      <div className="mx-auto max-w-screen-xl px-2 mb-8">
        <Orders />
      </div>
    </HydrateClient>
  );
}
