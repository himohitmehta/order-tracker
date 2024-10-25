import Products from "@/components/products";
import React from "react";

export default async function ProductsPage() {
 // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

 
    return (
    <div>
      <Products />
    </div>
  );
}
