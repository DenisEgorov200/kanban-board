import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createEvent, createStore, sample } from 'effector'
import { debug } from 'patronum'

export interface Column {
  id: string
  title: string
}

export interface Task {
  id: string
  columnId: UniqueIdentifier
  content: string
}

const defaultCols: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
  },
  {
    id: 'doing',
    title: 'In progress',
  },
  {
    id: 'done',
    title: 'Done',
  },
]

const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    content: 'List admin APIs for dashboard',
  },
  {
    id: '2',
    columnId: 'todo',
    content:
      'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation',
  },
  {
    id: '3',
    columnId: 'doing',
    content: 'Conduct security testing',
  },
  {
    id: '4',
    columnId: 'doing',
    content: 'Analyze competitors',
  },
  {
    id: '5',
    columnId: 'done',
    content: 'Create UI kit documentation',
  },
  {
    id: '6',
    columnId: 'done',
    content: 'Dev meeting',
  },
  {
    id: '7',
    columnId: 'done',
    content: 'Deliver dashboard prototype',
  },
  {
    id: '8',
    columnId: 'todo',
    content: 'Optimize application performance',
  },
  {
    id: '9',
    columnId: 'todo',
    content: 'Implement data validation',
  },
  {
    id: '10',
    columnId: 'todo',
    content: 'Design database schema',
  },
  {
    id: '11',
    columnId: 'todo',
    content: 'Integrate SSL web certificates into workflow',
  },
  {
    id: '12',
    columnId: 'doing',
    content: 'Implement error logging and monitoring',
  },
  {
    id: '13',
    columnId: 'doing',
    content: 'Design and implement responsive UI',
  },
]
const generateId = (id: string) => {
  return `task_${id}`
}

export const dragStarted = createEvent<DragStartEvent>()
export const dragEnded = createEvent<DragEndEvent>()
export const dragging = createEvent<DragOverEvent>()

export const $columns = createStore(defaultCols)
export const $tasks = createStore(defaultTasks)

export const $activeColumn = createStore<Column | null>(null)
export const $activeTask = createStore<Task | null>(null)

sample({
  clock: dragStarted,
  filter: (event) =>
    Boolean(event.active.data.current) &&
    event.active.data.current?.type === 'Board',
  fn: (event) => event.active.data.current?.board as Column | null,
  target: $activeColumn,
})

sample({
  clock: dragStarted,
  filter: (event) =>
    Boolean(event.active.data.current) &&
    event.active.data.current?.type === 'Task',
  fn: (event) => event.active.data.current?.task as Task | null,
  target: $activeTask,
})

sample({
  clock: dragEnded,
  source: $columns,
  filter: (_, event) =>
    Boolean(event.over) &&
    event.active.id !== event.over?.id &&
    event.active.data.current?.type === 'Board',
  fn: (columns, event) => {
    const { active, over } = event

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === active.id,
    )

    const overColumnIndex = columns.findIndex(
      (column) => column.id === over?.id,
    )

    return arrayMove(columns, activeColumnIndex, overColumnIndex)
  },
  target: $columns,
})

sample({
  clock: dragEnded,
  fn: () => null,
  target: [$activeColumn, $activeTask],
})

sample({
  clock: dragging,
  source: $tasks,
  filter: (_, event) =>
    Boolean(event.over) &&
    event.active.id !== event.over?.id &&
    event.active.data.current?.type === 'Task',
  fn: (tasks, event) => {
    const { active, over } = event

    const activeTaskIndex = tasks.findIndex(
      (task) => generateId(task.id) === active.id,
    )

    switch (over?.data.current?.type) {
      case 'Task':
        const overTaskIndex = tasks.findIndex(
          (task) => generateId(task.id) === over.id,
        )

        if (tasks[activeTaskIndex].columnId !== tasks[overTaskIndex].columnId) {
          tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

          return arrayMove(tasks, activeTaskIndex, overTaskIndex - 1)
        }

        return arrayMove(tasks, activeTaskIndex, overTaskIndex)
      case 'Board':
        return arrayMove(tasks, activeTaskIndex, activeTaskIndex)
      default:
        return tasks
    }
  },
  target: $tasks,
})
