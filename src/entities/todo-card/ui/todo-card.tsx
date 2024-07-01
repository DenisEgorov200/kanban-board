import { CheckMark } from '@shared/ui/check-mark'
import { DropdownMenu } from '@shared/ui/dropdown-menu'
import { useLink } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { linkCopied, taskRoute } from '../model'

interface Props {
  id: string
  status: boolean
  content?: string
}

export const TodoCard = ({ id, status, content }: Props) => {
  const link = useLink(taskRoute, { id })
  const handleCopied = useUnit(linkCopied)

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
        <DropdownMenu />
      </ul>
    </div>
  )
}
