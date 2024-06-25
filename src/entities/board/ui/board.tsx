import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { SortableItem } from '@shared/ui/sortable-item'

interface Props {
  id: string
  items: string[]
}

export const Board = ({ id, items }: Props) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <SortableContext items={items}>
      <div className="rounded-md bg-white p-5">
        <div className="mb-2 border-b-2 border-black py-2 font-medium">
          To do 2
        </div>
        <ul ref={setNodeRef} className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableItem key={item} id={item}>
              <li className="rounded-md border-2 border-b-4 border-black bg-white p-2">
                выучить effector
              </li>
            </SortableItem>
          ))}
        </ul>
      </div>
    </SortableContext>
  )
}