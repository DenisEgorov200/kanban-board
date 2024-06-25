import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Board } from '@entities/board'
import { act, useState } from 'react'

export const Kanban = () => {
  const [activeId, setActiveId] = useState(null)
  const [items, setItems] = useState(['1', '2', '3'])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ul className="grid grid-cols-3 gap-2">
        <Board id="todo" items={items} />
      </ul>
    </DndContext>
  )
}
