import { z } from "zod";
import { contactFormSchema, type ContactForm } from "./schema";

export { contactFormSchema, type ContactForm };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact" as const,
      input: contactFormSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string(), code: z.string() }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ContactFormInput = z.infer<typeof api.contact.submit.input>;
export type ContactFormResponse = z.infer<typeof api.contact.submit.responses[200]>;
