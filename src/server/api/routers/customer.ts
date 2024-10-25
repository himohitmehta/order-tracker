import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const customerRouter = createTRPCRouter({
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
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.create({
        data: {
          email: input.email,
          name: input.name,
          phone: input?.phone ?? "",
          address: input.address,
        },
      });
    }),

  getCustomers: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.db.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return customers ?? null;
  }),
});
