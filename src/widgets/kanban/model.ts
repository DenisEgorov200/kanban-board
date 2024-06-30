import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createEvent, createStore, sample } from 'effector'
import { debounce } from 'patronum'

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

export const columnsChanged = createEvent()
export const tasksChanged = createEvent()

export const taskDropped = createEvent<{
  activeId: UniqueIdentifier
  overId: UniqueIdentifier
}>()
export const columnDropped = createEvent<{
  activeId: UniqueIdentifier
  overId: UniqueIdentifier
}>()

export const activeColumnChanged = createEvent<Column | null>()
export const activeTaskChanged = createEvent<Task | null>()

export const $columns = createStore(defaultCols)
export const $columnsId = $columns.map((col) => col.map(({ id }) => id))

export const $tasks = createStore(defaultTasks)
export const $tasksIds = $tasks.map((task) => task.map(({ id }) => id))

export const $activeColumn = createStore<Column | null>(null)
export const $activeTask = createStore<Task | null>(null)

$activeTask.on(activeTaskChanged, (_, activeTask) => activeTask)
$activeColumn.on(activeColumnChanged, (_, activeColumn) => activeColumn)

// TODO: Change order logic
sample({
  clock: taskDropped,
  source: $tasks,
  fn: (tasks, { activeId, overId }) => {
    const activeIndex = tasks.findIndex((t) => t.id === activeId)
    const overIndex = tasks.findIndex((t) => t.id === overId)

    if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
      tasks[activeIndex].columnId = tasks[overIndex].columnId
      return arrayMove(tasks, activeIndex, overIndex - 1)
    }

    return arrayMove(tasks, activeIndex, overIndex)
  },
  target: $tasks,
})

sample({
  clock: columnDropped,
  source: $tasks,
  fn: (tasks, { activeId, overId }) => {
    const activeIndex = tasks.findIndex((t) => t.id === activeId)
    tasks[activeIndex].columnId = overId

    return arrayMove(tasks, activeIndex, activeIndex)
  },
  target: $tasks,
})
