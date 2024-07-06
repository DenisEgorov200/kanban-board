import { UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  board: Column
  tasks: Task[]
  tasksIds?: string[]
}

interface Column {
  id: string
  title: string
}

interface Task {
  id: string
  columnId: UniqueIdentifier
  content: string
}

export const Board = ({ board, tasks, tasksIds }: Props) => {
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
      type: 'Board',
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
        className="flex h-full max-h-full w-full flex-col rounded-md border border-gray-300 bg-gray-200 opacity-40"
      />
    )
  }

  return (
    <>
      <div ref={setNodeRef} className="min-w-96 rounded-md bg-white">
        <div
          {...attributes}
          {...listeners}
          className="mb-2 flex items-center justify-between border-b-2 border-black py-2 font-medium"
        >
          <p>{board.title} 0</p>
          <button className="h-5 w-5">
            <img src="/icons/settings.svg" alt="settings" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          <SortableContext items={tasks}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
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
  return (
    <div className="rounded-md border-2 border-b-4 border-black bg-white p-2">
      {task.content}
    </div>
  )
}
