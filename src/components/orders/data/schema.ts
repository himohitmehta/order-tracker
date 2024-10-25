import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const orderSchema = z.object({
  customerName: z.string(),
  customerAddress: z.string(),
  fulfillmentStatus: z.string(),
  orderLineItems: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
    }),
  ),
});
