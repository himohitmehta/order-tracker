import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { title } from "process";

export const productsRouter = createTRPCRouter({
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
        title: z.string().min(3),
        description: z.string(),
        content: z.string().optional(),
        price: z.number(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          title: input.title,
          description: input.description,
          content: input.content,
          price: input.price,
          imageUrl: input.imageUrl,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return products ?? null;
  }),
});
