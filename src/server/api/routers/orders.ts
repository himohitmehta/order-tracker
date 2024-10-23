import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        address: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.create({
        data: {
          email: input.email,
          name: input.name,
          phone: input.phone,
          address: input.address,
        },
      });
    }),

  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });

  // return post ?? null;
  //   }),
});
