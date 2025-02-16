import { z } from 'zod';

export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'REfresh Token Required',
    }),
  }),
});
