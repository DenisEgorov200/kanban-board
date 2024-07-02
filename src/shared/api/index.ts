import * as auth from './rest/auth'
import * as tasks from './rest/tasks'

export type { User } from './rest/common'

export const api = {
  auth,
  tasks,
}
