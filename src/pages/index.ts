import { LayoutBase } from '@layouts/base'
import { createRoutesView } from 'atomic-router-react'
import { AuthFinishRoute } from './auth/finish'
import { SignInRoute } from './auth/sign-in'
import { HomeRoute } from './home'

export const Pages = createRoutesView({
  routes: [
    {
      route: HomeRoute.route,
      view: HomeRoute.view,
      layout: LayoutBase,
    },
    {
      route: SignInRoute.route,
      view: SignInRoute.view,
    },
    {
      route: AuthFinishRoute.route,
      view: AuthFinishRoute.view,
    },
  ],
})
