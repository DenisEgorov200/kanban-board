import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableItem } from '@shared/ui/sortable-item'

interface Props {
  board: Column
  items: Task[]
}

interface Column {
  id: string
  title: string
}

interface Task {
  id: string
  columnId: string
  content: string
}

export const Board = ({ board, items }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: 'Column',
      board,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-black opacity-40"
      />
    )
  }

  return (
    <SortableContext items={items}>
      <div ref={setNodeRef} style={style} className="rounded-md bg-white p-5">
        <div className="mb-2 border-b-2 border-black py-2 font-medium">
          To do 2
        </div>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <TaskCard task={item} />
            </SortableItem>
          ))}
        </ul>
      </div>
    </SortableContext>
  )
}

export const TaskCard = ({ task }: Task) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  })

  console.log(task)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-black bg-gray-200 p-2.5 text-left opacity-30"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md border-2 border-b-4 border-black bg-white p-2"
    >
      {task.content}
    </div>
  )
}
