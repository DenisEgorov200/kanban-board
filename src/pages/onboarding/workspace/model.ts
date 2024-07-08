import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { createStore } from 'effector'

export const currentRoute = routes.onboarding.workspace
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

export const $name = createStore('')
export const $slug = createStore('')
