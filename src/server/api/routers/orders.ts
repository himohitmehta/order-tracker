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

  getOrders: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
      },
      take: 100,
    });
    const countOfOrders = await ctx.db.order.count();

    return { orders, total: countOfOrders };
  }),
});
