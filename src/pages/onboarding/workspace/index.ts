import { createRouteView } from 'atomic-router-react'
import { currentRoute, workspaceLoadedRoute } from './model'
import { OnboardingWorkspacePage, PageLoader } from './ui/workspace'

const WorkspaceView = createRouteView({
  route: workspaceLoadedRoute,
  view: OnboardingWorkspacePage,
  otherwise: PageLoader,
})

export const OnboardingWorkspaceRoute = {
  view: WorkspaceView,
  route: currentRoute,
}
