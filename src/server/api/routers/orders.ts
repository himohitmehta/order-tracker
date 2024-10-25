import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { FulfilmentStatus } from "@prisma/client";

export const ordersRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        quantity: z.number(),
        total: z.number(),
        fulfilmentStatus: z.nativeEnum(FulfilmentStatus),
        productIds: z.array(z.string()),
        customerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // ctx.db.order.createMany({
      //   data: [
      //     {
      //       quantity: Number(input.quantity),
      //       total: Number(input.total),
      //       fulfilmentStatus: input.fulfilmentStatus,
      //       productIds: input.productIds,
      //       customerId: input.customerId,
      //     },
      //   ],
      // });
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
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
        customerName: z.string().optional(),
        customerEmail: z.string().optional(),
        fulfilmentStatus: z.array(z.string()).optional(),
        //  z.nativeEnum(FulfilmentStatus).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log({ input });
      const filterCondition = {
        customer: {
          name: {
            contains: input.customerName ?? "",
          },
          email: {
            contains: input.customerEmail ?? "",
          },
        },
        fulfilmentStatus: {
          in: input.fulfilmentStatus as FulfilmentStatus[],
          // [FulfilmentStatus.DELIVERED, FulfilmentStatus.PENDING],
          // input.fulfilmentStatus,
        },
      };

      const orders = await ctx.db.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
          // _count: {
          //   select: { productIds: true },
          // },
        },
        where: filterCondition,
        // having: {

        // },
        take: input.pageSize ?? 10,
        skip: input.page ?? 0,
      });
      const countOfOrders = await ctx.db.order.count({
        where: filterCondition,
      });

      return { orders, total: countOfOrders };
    }),
});
