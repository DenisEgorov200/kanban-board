import { CheckMark } from '@shared/ui/check-mark'
import { useState } from 'react'

interface Props {
  status: boolean
  content?: string
}

export const TodoCard = ({ status, content }: Props) => {
  const [isDone, setIsDone] = useState(status)

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 py-5">
      <div className="flex items-center gap-4">
        <CheckMark status={isDone} setStatus={setIsDone} />
        <h2 className="font-medium text-gray-600">{content}</h2>
      </div>
      <div>
        <ul className="flex items-center gap-4">
          <li className="h-5 w-5 cursor-pointer">
            <img src="/icons/hyperlink.svg" alt="hyperlink" />
          </li>
          <li className="h-5 w-5 cursor-pointer">
            <img src="/icons/settings.svg" alt="settings" />
          </li>
        </ul>
      </div>
    </div>
  )
}
