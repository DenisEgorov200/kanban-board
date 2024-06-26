import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'

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
  const tasksIds = useMemo(() => {
    return items.map((task) => task.id)
  }, [items])

  const { setNodeRef, transform, transition, isDragging } = useSortable({
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
    <>
      <div ref={setNodeRef} style={style} className="rounded-md bg-white p-5">
        <div className="mb-2 flex items-center justify-between border-b-2 border-black py-2 font-medium">
          <p>
            {board.title} {tasksIds.length}
          </p>
          <button className="h-5 w-5">
            <img src="/icons/settings.svg" alt="settings" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          <SortableContext items={tasksIds}>
            {items.map((item) => (
              <TaskCard key={item.id} task={item} />
            ))}
          </SortableContext>
        </ul>
      </div>
    </>
  )
}

interface TaskCardProps {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => {
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
