import { createEffect } from 'effector'
import { client } from '../client'
import { checkError } from './common'

export const TasksGetFx = createEffect(async () => {
  const { data, error } = await client.from('tasks').select()

  checkError(error)

  return data
})
