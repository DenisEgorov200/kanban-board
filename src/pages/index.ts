import { LayoutBase } from '@layouts/base'
import { createRoutesView } from 'atomic-router-react'
import { AboutRoute } from './about'
import { AuthFinishRoute } from './auth/finish'
import { SignInRoute } from './auth/sign-in'
import { HomeRoute } from './home'
import { OnboardingWorkspaceRoute } from './onboarding/workspace'
import { ProfileRoute } from './profile'
import { TasksRoute } from './tasks'

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
    {
      route: OnboardingWorkspaceRoute.route,
      view: OnboardingWorkspaceRoute.view,
    },
    {
      route: TasksRoute.route,
      view: TasksRoute.view,
      layout: LayoutBase,
    },
    {
      route: ProfileRoute.route,
      view: ProfileRoute.view,
      layout: LayoutBase,
    },
    {
      route: AboutRoute.route,
      view: AboutRoute.view,
      layout: LayoutBase,
    },
  ],
})
