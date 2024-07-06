import { UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@shared/lib/tw-merge'

interface Props {
  board: Column
  tasks: Task[]
  className?: string
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

export const Board = ({ board, tasks, className }: Props) => {
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
      <div
        ref={setNodeRef}
        className={cn(
          'h-[500px] min-h-[500px] min-w-96 rounded-md px-5',
          className,
        )}
      >
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
          <SortableContext items={tasks.map(({ id }) => `task_${id}`)}>
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
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task_${task.id}`,
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
