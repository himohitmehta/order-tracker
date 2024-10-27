import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { FulfilmentStatus } from "@prisma/client";
import {
  createOrderSchema,
  getOrdersSchema,
} from "@/components/orders/data/schema";

export const ordersRouter = createTRPCRouter({
  create: publicProcedure
    .input(createOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.create({
        data: {
          quantity: Number(input.quantity),
          total: Number(input.total),
          fulfilmentStatus: input.fulfilmentStatus,
          productIds: input.productIds,
          customer: {
            connect: { id: input.customerId },
          },
        },
      });
    }),

  getOrders: publicProcedure
    .input(getOrdersSchema)
    .query(async ({ ctx, input }) => {
      const statusArray = Object.values(FulfilmentStatus);
      const fulfilmentStatusArray =
        input?.fulfilmentStatus?.length === 0
          ? statusArray
          : input.fulfilmentStatus;

      // const filterCondition = {
      //   customer: {
      //     is: {
      //       OR: [
      //         {
      //           name: {
      //             contains: input.customer ?? "",
      //             mode: "insensitive",
      //           },
      //         },
      //         {
      //           email: {
      //             contains: input.customer ?? "",
      //             mode: "insensitive",
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   createdAt: {
      //     gte: input.startDate ? new Date(input.startDate) : undefined,
      //     lte: input.endDate ? new Date(input.endDate) : undefined,
      //   },

      //   fulfilmentStatus: {
      //     in: fulfilmentStatusArray as FulfilmentStatus[],
      //   },
      // };

      const dateSortOrder = input.dateSortOrder === "asc" ? "asc" : "desc";

      const orders = await ctx.db.order.findMany({
        orderBy: {
          createdAt: dateSortOrder ?? "desc",
        },
        include: {
          customer: true,
        },
        where: {
          customer: {
            is: {
              OR: [
                {
                  name: {
                    contains: input.customer ?? "",
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: input.customer ?? "",
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
          createdAt: {
            gte: input.startDate ? new Date(input.startDate) : undefined,
            lte: input.endDate ? new Date(input.endDate) : undefined,
          },

          fulfilmentStatus: {
            in: fulfilmentStatusArray as FulfilmentStatus[],
          },
        },
        take: input.pageSize ?? 10,
        skip: input.page ?? 0,
      });

      const countOfOrders = await ctx.db.order.count({
        where: {
          customer: {
            is: {
              OR: [
                {
                  name: {
                    contains: input.customer ?? "",
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: input.customer ?? "",
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
          createdAt: {
            gte: input.startDate ? new Date(input.startDate) : undefined,
            lte: input.endDate ? new Date(input.endDate) : undefined,
          },

          fulfilmentStatus: {
            in: fulfilmentStatusArray as FulfilmentStatus[],
          },
        },
      });

      return { orders, total: countOfOrders };
    }),

  getOrderLineItems: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      if (!order) return null;
      const products = await ctx.db.product.findMany({
        where: {
          id: {
            in: order.productIds,
          },
        },
      });
      return products;
    }),
});
