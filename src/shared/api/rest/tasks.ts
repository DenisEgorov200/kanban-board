import { PostgrestError } from '@supabase/supabase-js'
import { createEffect } from 'effector'
import { client } from '../client'
import { checkError } from './common'

interface Task {
  id: string
  status: boolean
  content: string
}

export const TasksGetFx = createEffect<void, Task[] | null, PostgrestError>(
  async () => {
    const { data, error } = await client.from('tasks').select()

    checkError(error)

    return data
  },
)
