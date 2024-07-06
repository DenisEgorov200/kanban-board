import {
  DndContext,
  DragOverlay,
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
  $tasks,
  dragEnded,
  dragging,
  dragStarted,
} from '../model'

export const Kanban = () => {
  const columns = useUnit($columns)
  const tasks = useUnit($tasks)

  const activeColumn = useUnit($activeColumn)
  const activeTask = useUnit($activeTask)

  const handleDragStart = useUnit(dragStarted)
  const handleDragEnd = useUnit(dragEnded)
  const handleDrag = useUnit(dragging)

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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDrag}
    >
      <ul className="flex">
        <SortableContext items={columns.map(({ id }) => id)}>
          {columns.map((column) => (
            <li key={column.id} className="w-full">
              <Board
                board={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
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
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              className="bg-gray-50"
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
