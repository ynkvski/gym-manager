import { z } from 'zod';

export const clientSchema = z.object({
  firstName: z.string().trim().min(1, 'Введите имя'),
  lastName: z.string().trim().min(1, 'Введите фамилию'),

  phone: z.string().optional(),

  email: z.string().email('Введите корректный email').or(z.literal('')),

  birthDate: z.string().optional(),

  membershipPlanId: z.string().optional(),

  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
