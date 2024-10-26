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
  updateAllOrders: publicProcedure.mutation(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany();
    for (const order of orders) {
      // const productIds = order.productIds;
      // const products = await ctx.db.product.findMany({
      //   where: {
      //     id: {
      //       in: productIds,
      //     },
      //   },
      // });
      // randomly add the fulfilment status to the order
      const status = [
        FulfilmentStatus.CANCELLED,
        FulfilmentStatus.DELIVERED,
        FulfilmentStatus.DISPATCHED,
        FulfilmentStatus.OUT_FOR_DELIVERY,
        FulfilmentStatus.PENDING,
        FulfilmentStatus.PROCESSING,
        FulfilmentStatus.RETURNED,
      ];
      // make sure randomStatus should not be undefined

      const randomStatus = status[Math.floor(Math.random() * status.length)];
      // const randomStatus = status[Math.floor(Math.random() * status.length)];

      await ctx.db.order.update({
        where: { id: order.id },
        data: {
          fulfilmentStatus: randomStatus,
        },
      });
    }

    // return ctx.db.order.updateMany({
    //   data: {
    //     createdAt: faker.date.past(),
    //   },
    // });
  }),

  getOrders: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
        customer: z.string().optional(),
        fulfilmentStatus: z.array(z.string()).optional(),
        //  z.nativeEnum(FulfilmentStatus).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        dateSortOrder: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const statusArray = Object.values(FulfilmentStatus);
      const fulfilmentStatusArray =
        input?.fulfilmentStatus?.length === 0
          ? statusArray
          : input.fulfilmentStatus;

      const filterCondition = {
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
      };

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

      return { orders, total: countOfOrders, filterCondition };
    }),
});
