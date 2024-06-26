import { useUnit } from 'effector-react'
import {
  $email,
  $error,
  $pending,
  emailChanged,
  formSubmitted,
  SignInError,
} from '../model'

const errorText: { [Key in SignInError]: string } = {
  UnknownError: 'Something wrong happened. Please try again.',
  InvalidEmail: 'Must be a valid email address.',
  RateLimit: 'Too much logins. Try again later.',
}

export const SignInPage = () => {
  const [email, error, pending] = useUnit([$email, $error, $pending])
  const [handleEmail, handleSubmit] = useUnit([emailChanged, formSubmitted])

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="mb-12 flex items-center gap-2">
        <h1 className="text-6xl font-extrabold text-blue-600">Kanban</h1>
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <h2 className="mb-10 text-center text-3xl font-bold">
          Log in to your account
        </h2>
        <ul className="mb-7 flex items-center justify-center gap-4">
          <li className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 transition-colors hover:bg-gray-100">
              <div className="h-5 w-5">
                <img src="/icons/google.svg" alt="google" />
              </div>
              Google
            </button>
          </li>
          <li className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 transition-colors hover:bg-gray-100">
              <div className="h-5 w-5">
                <img src="/icons/github.svg" alt="github" />
              </div>
              Github
            </button>
          </li>
        </ul>
        <div className="relative mb-7 text-center text-xs font-medium text-gray-300">
          <span className="absolute left-0 top-1/2 w-[45%] -translate-y-1/2 border border-gray-300" />
          OR
          <span className="absolute right-0 top-1/2 w-[45%] -translate-y-1/2 border border-gray-300" />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          disabled={pending}
          className="mb-3 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-blue-600"
        />
        {error ? (
          <p className="mb-3 font-medium text-red-400">{errorText[error]}</p>
        ) : null}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-3 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Log in to Kanban
        </button>
      </form>
    </div>
  )
}
