import { routes } from '@shared/routing'
import { chainAnonymous } from '@shared/viewer'

export const currentRoute = routes.auth.signIn
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
})
