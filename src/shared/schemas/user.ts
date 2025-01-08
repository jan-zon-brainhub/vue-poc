import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export type User = z.infer<typeof userSchema>
