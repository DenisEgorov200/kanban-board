import { routes } from '@shared/routing'
import { chainAuthenticated } from '@shared/viewer'
import { createStore } from 'effector'

interface Task {
  id: string
  status: boolean
  content: string
}

const defaultTasks: Task[] = [
  {
    id: '1',
    status: true,
    content: 'List admin APIs for dashboard',
  },
  {
    id: '2',
    status: true,
    content:
      'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation',
  },
  {
    id: '3',
    status: false,
    content: 'Conduct security testing',
  },
  {
    id: '4',
    status: false,
    content: 'Analyze competitors',
  },
  {
    id: '5',
    status: true,
    content: 'Create UI kit documentation',
  },
  {
    id: '6',
    status: false,
    content: 'Dev meeting',
  },
  {
    id: '7',
    status: false,
    content: 'Deliver dashboard prototype',
  },
  {
    id: '8',
    status: false,
    content: 'Optimize application performance',
  },
  {
    id: '9',
    status: false,
    content: 'Implement data validation',
  },
  {
    id: '10',
    status: false,
    content: 'Design database schema',
  },
  {
    id: '11',
    status: false,
    content: 'Integrate SSL web certificates into workflow',
  },
  {
    id: '12',
    status: false,
    content: 'Implement error logging and monitoring',
  },
  {
    id: '13',
    status: false,
    content: 'Design and implement responsive UI',
  },
]

export const currentRoute = routes.tasks
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

export const $tasks = createStore(defaultTasks)
