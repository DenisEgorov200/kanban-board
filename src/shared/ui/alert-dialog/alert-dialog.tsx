import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import {
  AlertDialogContentProps,
  AlertDialogProps,
} from '@radix-ui/react-alert-dialog'
import { Button } from '../button'

export const AlertDialog = ({
  open,
  onOpenChange,
  children,
}: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixAlertDialog.Root>
  )
}

const AlertDialogContent = ({
  children,
  ...props
}: AlertDialogContentProps) => {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className="fixed inset-0 bg-black/5 data-[state=open]:animate-overlayShow" />
      <RadixAlertDialog.Content
        className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-sm focus:outline-none data-[state=open]:animate-contentShow"
        {...props}
      >
        <RadixAlertDialog.Title className="m-0 text-xl font-medium">
          Are you absolutely sure?
        </RadixAlertDialog.Title>
        <RadixAlertDialog.Description className="mb-5 mt-4 leading-normal">
          {children}
        </RadixAlertDialog.Description>
        <div className="flex justify-end gap-6">
          <RadixAlertDialog.Cancel asChild>
            <Button>Cancel</Button>
          </RadixAlertDialog.Cancel>
          <RadixAlertDialog.Action asChild>
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Yes, delete task
            </Button>
          </RadixAlertDialog.Action>
        </div>
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  )
}

AlertDialog.Button = RadixAlertDialog.Trigger
AlertDialog.Action = RadixAlertDialog.Action
AlertDialog.Content = AlertDialogContent
