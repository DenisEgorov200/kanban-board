import { api } from '@shared/api'
import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { chainRoute } from 'atomic-router'
import {
  attach,
  combine,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector'

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

const $form = combine({
  created_at: new Date(),
  status: false,
  content: $content,
})

$content.on(contentChanged, (_, content) => content)

sample({
  clock: formSubmitted,
  source: { task: $form },
  target: TasksCreateFx,
})

sample({
  clock: formSubmitted,
  target: TasksGetFx,
})
