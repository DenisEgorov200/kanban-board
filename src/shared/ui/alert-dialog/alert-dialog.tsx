import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { AlertDialogProps } from '@radix-ui/react-alert-dialog'

export const AlertDialog = ({ open, onOpenChange }: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixAlertDialog.Trigger />
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/5" />
        <RadixAlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-sm focus:outline-none">
          <RadixAlertDialog.Title className="m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </RadixAlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <RadixAlertDialog.Cancel asChild>
              <button className="inline-flex items-center justify-center rounded border border-gray-200 px-4 py-3 font-medium leading-none outline-none transition-colors hover:bg-gray-50 focus:shadow-lg">
                Cancel
              </button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <button className="inline-flex items-center justify-center rounded bg-red-500 px-4 py-3 font-medium leading-none text-white outline-none transition-colors hover:bg-red-600 focus:shadow-lg">
                Yes, delete task
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
