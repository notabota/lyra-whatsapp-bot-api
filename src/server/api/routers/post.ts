import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  chats: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/chats' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string().nullable()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.whatsapp_chat.findMany();
    }),

  contacts: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/contacts' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string().nullable(),
      phoneNumber: z.string(),
      pushName: z.string(),
      shortName: z.string().nullable()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.whatsapp_contact.findMany();
    }),

  contactToChat: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/contact-chat' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
      contactId: z.string(),
      chatId: z.string()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.whatsapp_contact_to_chat.findMany();
    }),

  messages: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/messages' } })
    .input(z.void())
    .output(z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      messageId: z.string(),
      body: z.string(),
      type: z.string(),
      data: z.string().nullable(),
      filename: z.string().nullable(),
      mimetype: z.string().nullable(),
      filesize: z.number().nullable(),
      timestamp: z.number(),
      contactToChatId: z.number()
    })))
    .query(async ({ ctx }) => {
      return await ctx.db.whatsapp_message.findMany();
    }),
});
