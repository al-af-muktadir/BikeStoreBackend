import { z } from 'zod';

export const bikeValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  price: z.number().positive('Price must be greater than 0'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
  description: z.string().nonempty('Description is required'),
  image: z.string().nonempty('image is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
});
