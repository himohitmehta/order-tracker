import { FulfilmentStatus } from "@prisma/client";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const createOrderSchema = z.object({
  quantity: z.number(),
  total: z.number(),
  fulfilmentStatus: z.nativeEnum(FulfilmentStatus),
  productIds: z.array(z.string()),
  customerId: z.string(),
});

export const getOrdersSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  customer: z.string().optional(),
  fulfilmentStatus: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  dateSortOrder: z.string().optional(),
});
