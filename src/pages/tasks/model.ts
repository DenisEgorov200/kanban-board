import { api } from '@shared/api'
import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { chainRoute } from 'atomic-router'
import { attach, restore } from 'effector'

export const currentRoute = routes.tasks
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

export const TasksGetFx = attach({ effect: api.tasks.TasksGetFx })

chainRoute({
  route: currentRoute,
  beforeOpen: TasksGetFx,
})

export const $tasks = restore(TasksGetFx, null)
