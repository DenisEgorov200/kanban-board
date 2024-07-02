import { PostgrestError } from '@supabase/supabase-js'
import { createEffect } from 'effector'
import { client } from '../client'
import { checkError } from './common'

interface Task {
  id: string
  createdAt: Date
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

export const TasksCreateFx = createEffect<{ task: Task }, void, PostgrestError>(
  async ({ task }) => {
    const { createdAt, status, content } = task

    const { error } = await client
      .from('tasks')
      .insert({ created_at: createdAt, status, content })

    checkError(error)
  },
)
