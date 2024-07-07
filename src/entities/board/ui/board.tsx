import { UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@shared/lib/tw-merge'
import { Button } from '@shared/ui/button'
import { DropdownMenu } from '@shared/ui/dropdown-menu'
import { useUnit } from 'effector-react'
import { $alertOpen, alertOpened } from '../model'
import { AlertDialog } from '@shared/ui/alert-dialog'

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

  const [alertOpen, handleAlertOpened] = useUnit([$alertOpen, alertOpened])

  const handleSelectDelete = () => {
    handleAlertOpened(true)
  }

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
          'h-[500px] min-h-[500px] min-w-96 rounded-md p-5',
          className,
        )}
      >
        <div
          {...attributes}
          {...listeners}
          className="mb-2 flex items-center justify-between border-b-2 border-black py-2 font-medium"
        >
          <p>{board.title} 0</p>
          <DropdownMenu>
            <DropdownMenu.Button className="h-5 w-5 cursor-pointer">
              <img src="/icons/settings.svg" alt="settings" />
            </DropdownMenu.Button>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                onSelect={handleSelectDelete}
                className="group relative flex cursor-pointer select-none items-center rounded bg-red-500 px-4 py-3 font-medium leading-none text-white outline-none data-[disabled]:pointer-events-none"
              >
                Delete
                <div className="ml-auto pl-5 group-data-[highlighted]:text-white">
                  <img src="/icons/trash.svg" alt="trash" />
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
          <AlertDialog open={alertOpen} onOpenChange={handleAlertOpened}>
            <AlertDialog.Content
              description="This action cannot be undone. This will permanently delete your
              board and remove your data from our servers."
            >
              <AlertDialog.Action>
                <Button className="bg-red-500 text-white hover:bg-red-600">
                  Yes, delete board
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog>
        </div>
        <ul className="flex flex-col gap-2">
          <SortableContext items={tasks.map(({ id }) => `task_${id}`)}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
          <li className="w-full">
            <Button className="inline-flex w-full items-center gap-2 rounded-md border-2 border-b-4 border-black bg-white p-2 text-start">
              Add task
              <div className="h-5 w-5 rounded-full border border-black">
                <img src="/icons/add.svg" alt="plus" />
              </div>
            </Button>
          </li>
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
