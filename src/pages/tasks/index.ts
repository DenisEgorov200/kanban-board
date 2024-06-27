import { currentRoute } from './model'
import { TasksPage } from './ui/tasks'

export const TasksRoute = {
  view: TasksPage,
  route: currentRoute,
}
