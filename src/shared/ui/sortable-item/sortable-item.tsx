import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'
import { Item } from '../item'

interface Props {
  id: string
  children: ReactNode
}

export const SortableItem = ({ id, children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Item>
  )
}
