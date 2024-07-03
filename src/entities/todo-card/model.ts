import { api } from '@shared/api'
import { routes } from '@shared/routing'
import { attach, createEvent, createStore, sample } from 'effector'

export const taskRoute = routes.task

export const TasksGetFx = attach({ effect: api.tasks.TasksGetFx })
export const TasksDeleteFx = attach({ effect: api.tasks.TasksDeleteFx })

export const taskIdChanged = createEvent<string>()
export const taskDeleted = createEvent()

export const alertOpened = createEvent<boolean>()
export const linkCopied = createEvent<string>()

export const $taskId = createStore('')

export const $alertOpen = createStore<boolean>(false)
const $link = createStore('')

$taskId.on(taskIdChanged, (_, id) => id)

$alertOpen.on(alertOpened, (_, open) => open)
$link.on(linkCopied, (_, link) => link)

sample({
  clock: linkCopied,
  source: $link,
  fn: async (link) => {
    try {
      await navigator.clipboard.writeText(link)
      alert('Content copied to clipboard')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  },
})

sample({
  clock: taskIdChanged,
  source: { id: $taskId },
  target: taskDeleted,
})

sample({
  clock: taskDeleted,
  source: { id: $taskId },
  target: TasksDeleteFx,
})

sample({
  clock: taskDeleted,
  target: TasksGetFx,
})
