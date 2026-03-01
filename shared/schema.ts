import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  selectedPlan: z.string().min(1, "Plan is required"),
  budget: z.string().min(1, "Budget is required"),
  projectDescription: z.string().min(1, "Project description is required"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const orderSchema = contactFormSchema.extend({
  id: z.string(),
  code: z.string(),
  createdAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
