import { AlertDialog } from '@shared/ui/alert-dialog'
import { Button } from '@shared/ui/button'
import { CheckMark } from '@shared/ui/check-mark'
import { DropdownMenu } from '@shared/ui/dropdown-menu'
import { useLink } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import {
  $alertOpen,
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

  const handleTaskIdChange = useUnit(taskIdChanged)

  const [alertOpen, handleAlertOpened] = useUnit([$alertOpen, alertOpened])

  const [isDone, setIsDone] = useState(status)

  const handleSelectDelete = () => {
    handleAlertOpened(true)
  }

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
              task and remove your data from our servers."
            >
              <AlertDialog.Action>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleTaskIdChange(id)}
                >
                  Yes, delete task
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog>
        </li>
      </ul>
    </div>
  )
}
