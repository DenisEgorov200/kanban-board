import { arrayMove } from '@dnd-kit/sortable'
import { createEvent, createStore, sample } from 'effector'

interface Column {
  id: string
  title: string
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

export const columnsChanged = createEvent()

export const $columns = createStore(defaultCols)
