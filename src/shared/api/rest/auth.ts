import { AuthError } from '@supabase/supabase-js'
import { createEffect } from 'effector'
import { client } from '../client'
import { checkError, User } from './common'

export const getMeFx = createEffect<void, User | null, AuthError>(async () => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  checkError(error)

  if (user) {
    return {
      id: user.id as string,
      email: user.email as string,
    }
  }

  return null
})
