import { createEvent, createStore } from 'effector'

export const alertOpened = createEvent<boolean>()

export const $alertOpen = createStore<boolean>(false)

$alertOpen.on(alertOpened, (_, open) => open)
