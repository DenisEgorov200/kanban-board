import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Board } from '@entities/board'
import { TaskCard } from '@entities/board/ui/board'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

interface Column {
  id: string
  title: string
}

interface Task {
  id: string
  columnId: string
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

export const Kanban = () => {
  const [columns, setColumns] = useState(defaultCols)
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  const [tasks, setTasks] = useState(defaultTasks)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <ul className="grid grid-cols-3 gap-2">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <Board
              key={column.id}
              board={column}
              items={tasks.filter((task) => task.columnId === column.id)}
            />
          ))}
        </SortableContext>
      </ul>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Board
              board={activeColumn}
              items={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    console.log('DRAG END')

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId
        console.log('DROPPING TASK OVER COLUMN', { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}
