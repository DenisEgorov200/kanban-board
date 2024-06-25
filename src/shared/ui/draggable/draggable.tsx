import { useDraggable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Draggable = ({ children }: Props) => {
  const { setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <button ref={setNodeRef} style={style}>
      {children}
    </button>
  )
}
