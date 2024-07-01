import * as Checkbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

interface Props {
  status?: boolean
  setStatus: (value: boolean) => void
}

export const CheckMark = ({ status, setStatus }: Props) => {
  return (
    <>
      <Checkbox.Root
        className="group h-5 w-5 cursor-pointer rounded-full border border-blue-600 p-0.5 transition-opacity"
        id="c1"
        checked={status}
        onCheckedChange={() => setStatus(!status)}
      >
        <Checkbox.Indicator>
          <img
            src="/icons/check.svg"
            alt="check"
            className={clsx('opacity-0 group-hover:opacity-100', {
              'opacity-100': status,
            })}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </>
  )
}
