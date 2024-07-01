import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

export const DropdownMenu = ({ open, onOpenChange }: DropdownMenuProps) => {
  const handleSelect = () => {
    onOpenChange?.(true)
  }

  return (
    <RadixDropdownMenu.Root open={open}>
      <RadixDropdownMenu.Trigger className="h-5 w-5 cursor-pointer">
        <img src="/icons/settings.svg" alt="settings" />
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content className="min-w-32 rounded-md bg-white shadow-md transition-colors hover:bg-gray-50">
          <RadixDropdownMenu.Item
            onSelect={handleSelect}
            className="group relative flex cursor-pointer select-none items-center rounded bg-red-500 px-4 py-3 font-medium leading-none text-white outline-none data-[disabled]:pointer-events-none"
          >
            Delete
            <div className="ml-auto pl-[20px] group-data-[highlighted]:text-white">
              <img src="/icons/trash.svg" alt="trash" />
            </div>
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Arrow className="fill-gray-600" />
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
