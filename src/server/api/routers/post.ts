import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  index: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/' } })
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
      return {
        whatsapp_chat: await ctx.db.whatsapp_chat.findMany(),
        whatsapp_contact: await ctx.db.whatsapp_contact.findMany(),
        whatsapp_contact_to_chat: await ctx.db.whatsapp_contact_to_chat.findMany(),
        whatsapp_message: await ctx.db.whatsapp_message.findMany(),
      };
    }),
});
