import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Droppable = ({ children }: Props) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  })

  return <div ref={setNodeRef}>{children}</div>
}
