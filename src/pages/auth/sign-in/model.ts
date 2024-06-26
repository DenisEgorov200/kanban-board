import { routes } from '@shared/routing'
import { chainAnonymous } from '@shared/viewer'
import { createEvent, createStore } from 'effector'

export const currentRoute = routes.auth.signIn
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
})

export const emailChanged = createEvent<string>()

export const $email = createStore('')

$email.on(emailChanged, (_, email) => email)
