import * as auth from './rest/auth'
import * as tasks from './rest/tasks'
import * as workspaces from './rest/workspaces'

export type { User } from './rest/common'

export const api = {
  auth,
  tasks,
  workspaces,
}
