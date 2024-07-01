import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { AlertDialogProps } from '@radix-ui/react-alert-dialog'

export const AlertDialog = ({ open, onOpenChange }: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixAlertDialog.Trigger />
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
        <RadixAlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-sm focus:outline-none">
          <RadixAlertDialog.Title className="m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </RadixAlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <RadixAlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Yes, delete account
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
