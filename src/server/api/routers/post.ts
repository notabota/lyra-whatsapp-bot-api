import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  chats: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/chats' } })
    .input(z.void())
    .output(z.array(z.object({ id: z.string(), name: z.string().nullable() })))
    .query(async ({ ctx }) => {
      return await ctx.db.chats.findMany();
    }),

  messages: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/messages' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.string(),
      body: z.string().nullable(),
      author: z.string().nullable(),
      from: z.string().nullable(),
      to: z.string().nullable(),
      type: z.string().nullable(),
      data: z.string().nullable(),
      filename: z.string().nullable(),
      mimetype: z.string().nullable(),
      filesize: z.number().nullable(),
      timestamp: z.number().nullable()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.messages.findMany();
    }),

  contacts: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/contacts' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.string(),
      name: z.string().nullable(),
      number: z.string().nullable(),
      pushname: z.string().nullable(),
      shortName: z.string().nullable()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.contacts.findMany();
    }),

  contactChat: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/contact-chat' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.number(),
      contact_id: z.string().nullable(),
      chat_id: z.string().nullable()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.contact_chat.findMany();
    }),
});
