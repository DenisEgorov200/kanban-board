import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'

export const currentRoute = routes.workspaces.view.boards
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})
