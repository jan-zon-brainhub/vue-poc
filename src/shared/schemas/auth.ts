import { z } from 'zod'
import { userSchema } from './user.ts'

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
})

export type AuthResponse = z.infer<typeof authResponseSchema>
