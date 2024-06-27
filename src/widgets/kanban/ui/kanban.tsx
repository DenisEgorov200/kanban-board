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
import { SortableContext } from '@dnd-kit/sortable'
import { Board, TaskCard } from '@entities/board'
import { useUnit } from 'effector-react'
import { createPortal } from 'react-dom'
import {
  $activeColumn,
  $activeTask,
  $columns,
  $columnsId,
  $tasks,
  activeColumnChanged,
  activeTaskChanged,
  columnDropped,
  taskDropped,
} from '../model'

export const Kanban = () => {
  const [columns, columnsId] = useUnit([$columns, $columnsId])

  const [tasks, handleTaskDropped, handleColumnDropped] = useUnit([
    $tasks,
    taskDropped,
    columnDropped,
  ])

  const [activeColumn, handleActiveColumnChanged] = useUnit([
    $activeColumn,
    activeColumnChanged,
  ])

  const [activeTask, handleActiveTaskChanged] = useUnit([
    $activeTask,
    activeTaskChanged,
  ])

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
      <ul className="flex gap-2">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <li key={column.id} className="w-full">
              <Board
                board={column}
                items={tasks.filter((task) => task.columnId === column.id)}
              />
            </li>
          ))}
        </SortableContext>
        <li className="p-5">
          <button className="mb-2 flex min-w-56 items-center gap-2 border-b-2 border-black py-2 font-medium">
            Add Column
            <div className="h-5 w-5 rounded-full border border-black">
              <img src="/icons/add.svg" alt="add" />
            </div>
          </button>
        </li>
      </ul>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Board
              board={activeColumn}
              items={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}
          <TaskCard task={activeTask} />
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      handleActiveColumnChanged(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      handleActiveTaskChanged(event.active.data.current.task)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    handleActiveColumnChanged(null)
    handleActiveTaskChanged(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    console.log('DRAG END')
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

    console.log('@columnsId', columnsId)

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      handleTaskDropped({ activeId, overId })
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t.id === activeId)
      //   const overIndex = tasks.findIndex((t) => t.id === overId)

      //   if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
      //     // Fix introduced after video recording
      //     tasks[activeIndex].columnId = tasks[overIndex].columnId
      //     return arrayMove(tasks, activeIndex, overIndex - 1)
      //   }

      //   return arrayMove(tasks, activeIndex, overIndex)
      // })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      handleColumnDropped({ activeId, overId })
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t.id === activeId)
      //   tasks[activeIndex].columnId = overId
      //   console.log('DROPPING TASK OVER COLUMN', { activeIndex })
      //   return arrayMove(tasks, activeIndex, activeIndex)
      // })
    }
  }
}
