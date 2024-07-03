import { AlertDialog } from '@shared/ui/alert-dialog'
import { CheckMark } from '@shared/ui/check-mark'
import { DropdownMenu } from '@shared/ui/dropdown-menu'
import { useLink } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import {
  $alertOpen,
  $taskId,
  alertOpened,
  linkCopied,
  taskIdChanged,
  taskRoute,
} from '../model'

interface Props {
  id: string
  status: boolean
  content?: string
}

export const TodoCard = ({ id, status, content }: Props) => {
  const link = useLink(taskRoute, { id })
  const handleCopied = useUnit(linkCopied)

  const [taskId, handleTaskIdChange] = useUnit([$taskId, taskIdChanged])

  const [alertOpen, handleAlertOpened] = useUnit([$alertOpen, alertOpened])

  const [isDone, setIsDone] = useState(status)

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 py-5">
      <div className="flex items-center gap-4">
        <CheckMark status={isDone} setStatus={setIsDone} />
        <h2 className="font-medium text-gray-600">{content}</h2>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <button
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleCopied(link)}
          >
            <img src="/icons/hyperlink.svg" alt="hyperlink" />
          </button>
        </li>
        <li>
          <DropdownMenu onOpenChange={handleAlertOpened} />
          <AlertDialog open={alertOpen} onOpenChange={handleAlertOpened}>
            <AlertDialog.Action onClick={() => handleTaskIdChange(id)} asChild>
              <button className="inline-flex items-center justify-center rounded bg-red-500 px-4 py-3 font-medium leading-none text-white outline-none transition-colors hover:bg-red-600 focus:shadow-lg">
                Yes, delete task
              </button>
            </AlertDialog.Action>
          </AlertDialog>
        </li>
      </ul>
    </div>
  )
}
