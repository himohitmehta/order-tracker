import { api, HydrateClient } from "@/trpc/server";
import Orders from "@/components/orders";
export default async function Home() {
  await api.orders.getOrders({});

  return (
    <HydrateClient>
      <div className="mx-auto mb-8 max-w-screen-2xl px-2">
        <Orders />
      </div>
    </HydrateClient>
  );
}
