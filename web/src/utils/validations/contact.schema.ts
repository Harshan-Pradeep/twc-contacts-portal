import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  gender: z.enum(['Male', 'Female'], {
    required_error: "Gender is required",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;