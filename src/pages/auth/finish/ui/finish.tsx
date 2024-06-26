export const AuthFinishPage = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="mb-12 flex items-center gap-2">
        <h1 className="text-6xl font-extrabold text-blue-600">Kanban</h1>
      </div>
      {/* <LoginValidating /> */}

      {/* <LoginFinished /> */}

      <LoginFailed />
    </div>
  )
}

const LoginValidating = () => {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">Signing You In</h2>
      <p className="font-medium">
        Validating your credentials. This may take a few seconds…
      </p>
    </>
  )
}

const LoginFinished = () => {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">Sign In Successful</h2>
      <p className="font-medium">
        Your credentials have been verified. Welcome back!
      </p>
      <p className="font-medium">You'll be redirected shortly…</p>
    </>
  )
}

const LoginFailed = () => {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-red-400">Sign In Failed</h2>
      <p className="mb-4 max-w-96 text-center font-medium">
        We encountered an issue validating your sign-in link. Please ensure the
        link hasn't expired or been used before.
      </p>
      <button className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 transition-colors hover:bg-gray-100">
        Try again
      </button>
    </>
  )
}
