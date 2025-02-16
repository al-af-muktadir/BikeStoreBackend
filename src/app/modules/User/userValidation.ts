import { z } from 'zod';

const userValidationSchema = z.object({
  email: z.string({ required_error: 'email is Required' }).email(),
  name: z
    .string({ required_error: 'name is Required' })
    .min(3, { message: 'atleast 3 charecter' }),
  password: z.string({ required_error: 'password is Required' }),
  image: z.string({ required_error: 'image is Required' }),
});

export const userLoginValidation = userValidationSchema.pick({
  email: true,
  password: true,
});
export const updateValidation = z.object({
  password: z.string({ required_error: 'password is Required' }),
});
export const userValidation = { userValidationSchema };
