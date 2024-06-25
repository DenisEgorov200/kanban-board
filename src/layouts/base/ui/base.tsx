import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const LayoutBase = ({ children }: Props) => {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <header className="mb-2 border-b border-gray-300 bg-white py-5">
        <div className="container mx-auto flex items-center justify-between px-2.5">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10">
              <img src="/icons/logo.svg" alt="logo" />
            </div>
            <h1 className="text-4xl font-bold text-gray-600">Kanban</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-600">user-name</p>
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img src="https://placehold.co/100x100" alt="" />
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="/icons/notification.svg"
                alt="notification"
                className="h-8 w-8"
              />
            </div>
            <div className="flex items-center">
              <img src="/icons/logout.svg" alt="logout" className="h-6 w-6" />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-2.5">{children}</main>
      <footer className="border-t border-gray-300 bg-white py-5">
        <div className="container mx-auto flex items-center justify-between px-2.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5">
              <img src="/icons/logo.svg" alt="logo" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600">Kanban</h2>
          </div>
          <ul className="flex items-center gap-2">
            <li>
              <a href="#" className="font-medium text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="font-medium text-gray-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="font-medium text-gray-600">
                Cookie Policy
              </a>
            </li>
          </ul>
          <ul className="flex items-center gap-2">
            <li className="h-8 w-8">
              <a href="https://github.com/DenisEgorov200">
                <img src="/icons/github.svg" alt="github" />
              </a>
            </li>
            <li className="h-8 w-8">
              <a href="https://t.me/feaxh">
                <img src="/icons/telegram.svg" alt="telegram" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
