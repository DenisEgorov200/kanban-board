import { api } from '@shared/api'
import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { attach } from 'effector'

export const currentRoute = routes.profile
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

export const signOutFx = attach({ effect: api.auth.signOutFx })
