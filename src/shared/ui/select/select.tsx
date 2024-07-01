import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { forwardRef, ReactNode, RefAttributes } from 'react'

export const Select = () => {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger
        className="inline-flex min-w-28 items-center justify-between gap-2 rounded border border-transparent bg-blue-50 px-4 py-2.5 font-medium leading-none text-gray-600 outline-none focus:border-gray-200"
        aria-label="Status"
      >
        <RadixSelect.Value
          placeholder="Any"
          className="max-w-12 overflow-ellipsis"
        />
        <RadixSelect.Icon className="h-5 w-5 -rotate-90">
          <img src="/icons/arrow.svg" alt="arrow" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="overflow-hidden rounded-md bg-white shadow-xl"
          align="center"
          position="popper"
          sideOffset={10}
        >
          <RadixSelect.ScrollUpButton className="flex h-5 w-5 rotate-90 cursor-default items-center justify-center bg-white">
            <img src="/icons/arrow.svg" alt="arrow" />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="bg-white">
            <RadixSelect.Group>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex h-5 -rotate-90 cursor-default items-center justify-center bg-white">
            <img src="/icons/arrow.svg" alt="arrow" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

interface SelectItemProps {
  className?: string
  children: ReactNode
  value: string
  disabled?: boolean
  textValue?: string
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        ref={forwardedRef}
        className={clsx(
          'cursor-pointer px-5 py-2.5 transition-colors hover:bg-gray-50',
          className,
        )}
        {...props}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  },
)
