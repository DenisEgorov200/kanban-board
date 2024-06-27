import { CheckMark } from '@shared/ui/check-mark'

export const TodoCard = () => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 py-5">
      <div className="flex items-center gap-4">
        <CheckMark />
        <h2 className="font-medium text-gray-600">
          Develop user registration functionality with OTP delivered on SMS
          after email confirmation and phone number confirmation
        </h2>
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
