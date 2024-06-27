import { createRoute, UnmappedRouteObject } from 'atomic-router'

export const routes = {
  home: createRoute(),
  auth: {
    signIn: createRoute(),
    finish: createRoute(),
  },
  tasks: createRoute(),
}

export const pageNotFoundRoute = createRoute()

/* eslint-disable @typescript-eslint/no-explicit-any */
export const routesMap: UnmappedRouteObject<any>[] = [
  { path: '/', route: routes.home },
  { path: '/auth/sign-in', route: routes.auth.signIn },
  { path: '/auth/finish', route: routes.auth.finish },
  { path: '/tasks', route: routes.tasks },
]
