import clsx from 'clsx'
import { MouseEvent, ReactNode, useState } from 'react'

interface Props {
  label?: ReactNode
  placeholder?: ReactNode
  data?: string[]
  value?: ReactNode
  onChange?: (value: string) => void
}

export const Select = ({
  label,
  placeholder,
  data,
  value,
  onChange,
}: Props) => {
  const [isActive, setIsActive] = useState(false)

  const handleChange = (e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation()
    onChange(e.target.textContent)
    setIsActive(false)
  }

  return (
    <div
      className="relative flex cursor-pointer items-center gap-2"
      onClick={() => setIsActive(!isActive)}
    >
      {label && <p className="font-medium text-gray-600">{label}</p>}
      <div className="flex min-w-32 max-w-32 items-center justify-between gap-2 rounded-md bg-blue-50 px-5 py-2.5 font-medium text-gray-800">
        <p className="overflow-hidden overflow-ellipsis">
          {value ? value : placeholder}
        </p>
        <div
          className={clsx(
            'h-5 w-5 transition-transform',
            isActive ? '-rotate-90' : 'rotate-90',
          )}
        >
          <img src="/icons/arrow.svg" alt="arrow" />
        </div>
        {isActive && (
          <button
            className="absolute left-0 top-14 z-10 w-full rounded-md bg-blue-50"
            onClick={() => setIsActive(false)}
          >
            <ul className="flex max-h-40 flex-col overflow-y-auto">
              {data?.map((item) => (
                <li
                  key={item}
                  className="w-full p-2 text-start transition-colors hover:bg-blue-100"
                  onClick={(e) => handleChange(e)}
                >
                  <p className="overflow-x-hidden overflow-ellipsis text-gray-600">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </button>
        )}
      </div>
    </div>
  )
}
