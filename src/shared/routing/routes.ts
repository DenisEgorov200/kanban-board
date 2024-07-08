import { createRoute, UnmappedRouteObject } from 'atomic-router'

export const routes = {
  home: createRoute(),
  auth: {
    signIn: createRoute(),
    finish: createRoute(),
  },
  onboarding: {
    user: createRoute(),
    workspace: createRoute(),
  },
  workspaces: {
    view: {
      boards: createRoute<{ workspaceId: string }>(),
      settings: createRoute<{ workspaceId: string }>(),
    },
  },
  tasks: createRoute(),
  task: createRoute(),
  profile: createRoute(),
  about: createRoute(),
}

export const pageNotFoundRoute = createRoute()

/* eslint-disable @typescript-eslint/no-explicit-any */
export const routesMap: UnmappedRouteObject<any>[] = [
  { path: '/', route: routes.home },
  { path: '/auth/sign-in', route: routes.auth.signIn },
  { path: '/auth/finish', route: routes.auth.finish },
  { path: '/onboarding/user', route: routes.onboarding.user },
  { path: '/onboarding/workspace', route: routes.onboarding.workspace },
  {
    path: '/workspaces/:workspaceId',
    route: routes.workspaces.view.boards,
  },
  {
    path: '/workspaces/:workspaceId/settings',
    route: routes.workspaces.view.settings,
  },
  { path: '/tasks', route: routes.tasks },
  { path: '/task/:id', route: routes.task },
  { path: '/profile/:id', route: routes.profile },
  { path: '/about', route: routes.about },
]
