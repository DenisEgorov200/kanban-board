import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { Board } from '@entities/board'
import { useUnit } from 'effector-react'
import { createPortal } from 'react-dom'
import {
  $activeColumn,
  $columns,
  $columnsId,
  $tasks,
  activeColumnChanged,
  columnDropped,
} from '../model'

export const Kanban = () => {
  const [columns, handleColumnDropped] = useUnit([$columns, columnDropped])
  const columnsId = useUnit($columnsId)

  const [activeColumn, handleActiveColumnChanged] = useUnit([
    $activeColumn,
    activeColumnChanged,
  ])

  const tasks = useUnit($tasks)

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
    >
      <ul className="flex">
        <SortableContext items={columnsId}>
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
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Board') {
      handleActiveColumnChanged(event.active.data.current.board)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    handleActiveColumnChanged(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Board'
    if (!isActiveAColumn) return

    handleColumnDropped({ activeId, overId })
  }
}
