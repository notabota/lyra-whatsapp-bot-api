import { appRouter } from "~/server/api/root";
import { generateOpenApiDocument } from 'trpc-to-openapi';

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'tRPC OpenAPI',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api/trpc',
  });
  