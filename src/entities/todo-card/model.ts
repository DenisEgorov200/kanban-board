import { routes } from '@shared/routing'
import { createEvent, createStore, sample } from 'effector'

export const taskRoute = routes.task

export const alertOpened = createEvent<boolean>()
export const linkCopied = createEvent<string>()

export const $alertOpen = createStore<boolean>(false)
const $link = createStore('')

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
