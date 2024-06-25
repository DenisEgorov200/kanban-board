import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Board } from '@entities/board'
import { useState } from 'react'

export const Kanban = () => {
  const [isDropped, setIsDropped] = useState(false)

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ul className="grid grid-cols-3 gap-2">
        <Board id="todo" items={['1']} />
        <Board id="in progress" items={['1']} />
      </ul>
    </DndContext>
  )
}
