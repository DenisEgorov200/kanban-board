import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Board } from '@entities/board'
import { Item } from '@shared/ui/item'
import { useState } from 'react'

export const Kanban = () => {
  const [activeId, setActiveId] = useState(null)
  const [items, setItems] = useState({
    'to-do': ['1', '2', '3'],
    'in-progress': ['4', '5', '6'],
  })

  const findContainer = (id) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) => items[key].includes(id))
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, draggingRect } = event
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id)
      const overIndex = overItems.indexOf(overId)

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      }
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    const activeIndex = items[activeContainer].indexOf(active.id)
    const overIndex = items[overContainer].indexOf(over.id)

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }))
    }

    setActiveId(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ul className="grid grid-cols-3 gap-2">
        <Board id="todo" items={items['to-do']} />
        <Board id="inprogress" items={items['in-progress']} />
        <DragOverlay>{activeId ? <Item>Hello</Item> : null}</DragOverlay>
      </ul>
    </DndContext>
  )
}
