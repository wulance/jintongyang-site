import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(200),
  market: z.string().trim().max(120).optional().default(""),
  projectType: z.enum(["custom", "oem", "wholesale", "other"]),
  quantity: z.string().trim().max(60).optional().default(""),
  targetDate: z.string().trim().max(60).optional().default(""),
  product: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["en", "zh"]),
  // Honeypot: real visitors leave this empty.
  website: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
