import { routes } from '@shared/routing'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { ReactNode } from 'react'
import { $profile, signOutFx } from '../model'
import { Avatar } from '@shared/ui/avatar'

interface Props {
  children: ReactNode
}

const LINKS = [{ id: 0, route: routes.tasks, value: 'tasks' }]

export const LayoutBase = ({ children }: Props) => {
  const profile = useUnit($profile)

  const handleSignOut = useUnit(signOutFx)

  return (
    <div className="flex h-dvh w-dvw flex-col">
      <header className="border-b border-gray-300 p-5">
        <div className="container mx-auto flex items-center justify-between px-2.5">
          <div className="flex items-end gap-4">
            <Link to={routes.home} className="flex items-center gap-2">
              <div className="h-10 w-10">
                <img src="/icons/logo.svg" alt="logo" />
              </div>
              <h1 className="text-4xl font-extrabold text-blue-600">Kanban</h1>
            </Link>
            <ul className="flex items-center gap-8">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.route}
                    className="text-lg capitalize text-gray-600"
                    activeClassName="font-semibold"
                    inactiveClassName="font-medium"
                  >
                    {link.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {profile ? (
              <Link
                to={routes.profile}
                params={{ id: profile?.id }}
                className="flex items-center gap-2"
              >
                <p className="font-medium text-gray-600">user-name</p>
                <Avatar
                  src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  alt="avatar"
                  className="h-8 w-8"
                />
              </Link>
            ) : (
              <p>loading...</p>
            )}
            <div className="flex items-center">
              <img
                src="/icons/notification.svg"
                alt="notification"
                className="h-8 w-8"
              />
            </div>
            <button
              onClick={() => handleSignOut()}
              className="flex items-center"
            >
              <img src="/icons/logout.svg" alt="logout" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 overflow-x-auto p-2.5">
        {children}
      </main>
      <footer className="border-t border-gray-300 py-5">
        <div className="container mx-auto flex items-center justify-between px-2.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5">
              <img src="/icons/logo.svg" alt="logo" />
            </div>
            <h2 className="text-xl font-semibold text-blue-600">Kanban</h2>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link to={routes.about} className="font-medium text-gray-600">
                About
              </Link>
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
