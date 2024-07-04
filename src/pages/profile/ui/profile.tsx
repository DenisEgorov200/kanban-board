import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import { useUnit } from 'effector-react'
import { $profile, signOutFx } from '../model'

export const ProfilePage = () => {
  const profile = useUnit($profile)

  const handleSignOut = useUnit(signOutFx)

  return (
    <>
      <div className="flex h-full flex-col justify-start pt-20">
        <div className="mb-4">
          <Avatar
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="avatar"
            className="h-16 w-16"
          />
        </div>
        <div className="mb-2 flex justify-between gap-2.5 max-sm:flex-col">
          <div className="flex flex-col gap-2.5 align-top">
            <h1 className="text-title text-xl font-semibold">Feaxh</h1>
            <p className="text-paragraph text-gray-400">{profile?.email}</p>
          </div>
          <div>
            <Button>Редактировать</Button>
          </div>
        </div>
        <p className="text-paragraph max-w-[600px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laborum
          repudiandae, reiciendis, atque ullam quia consectetur ad sapiente
          tempore, magnam ipsam sint unde aliquid totam nesciunt facere saepe
          culpa ratione!
        </p>
        <div className="mt-14">
          <Button onClick={() => handleSignOut()}>Выйти</Button>
        </div>
      </div>
    </>
  )
}
