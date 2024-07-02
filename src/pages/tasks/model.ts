import { api } from '@shared/api'
import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { chainRoute } from 'atomic-router'
import { attach, createEvent, createStore, restore, sample } from 'effector'
import { v4 as uuidv4 } from 'uuid'

export const currentRoute = routes.tasks
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

export const TasksGetFx = attach({ effect: api.tasks.TasksGetFx })
export const TasksCreateFx = attach({ effect: api.tasks.TasksCreateFx })

chainRoute({
  route: currentRoute,
  beforeOpen: TasksGetFx,
})

export const formSubmitted = createEvent()
export const contentChanged = createEvent<string>()

export const $tasks = restore(TasksGetFx, null)

export const $content = createStore('')

$content.on(contentChanged, (_, content) => content)

sample({
  clock: formSubmitted,
  source: {
    created_at: new Date(),
    status: false,
    content: $content,
  },
  target: TasksCreateFx,
})
