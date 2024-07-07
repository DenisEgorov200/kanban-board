import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContentProps,
  DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu'

export const DropdownMenu = ({ children, open }: DropdownMenuProps) => {
  return <RadixDropdownMenu.Root open={open}>{children}</RadixDropdownMenu.Root>
}

const DropdownMenuContent = ({ children }: DropdownMenuContentProps) => {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content className="min-w-32 rounded-md bg-white shadow-md transition-colors hover:bg-gray-50 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
        {children}
        <RadixDropdownMenu.Arrow className="fill-gray-600" />
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  )
}

DropdownMenu.Button = RadixDropdownMenu.Trigger
DropdownMenu.Item = RadixDropdownMenu.Item
DropdownMenu.Content = DropdownMenuContent
