import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import { useUnit } from 'effector-react'
import { $profile, signOutFx } from '../model'
import { Input } from '@shared/ui/input'

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
            <Modal>
              <Modal.Button asChild>
                <Button>Edit profile</Button>
              </Modal.Button>
              <Modal.Content title="Edit profile">
                <ProfileForm />
              </Modal.Content>
            </Modal>
          </div>
        </div>
        <p className="text-paragraph max-w-[600px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laborum
          repudiandae, reiciendis, atque ullam quia consectetur ad sapiente
          tempore, magnam ipsam sint unde aliquid totam nesciunt facere saepe
          culpa ratione!
        </p>
        <div className="mt-14">
          <Button onClick={() => handleSignOut()}>Logout</Button>
        </div>
      </div>
    </>
  )
}

const ProfileForm = () => {
  return (
    <form action="" className="mt-3 flex h-full flex-col gap-3.5">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-button font-medium text-gray-400">
          User name
        </label>
        <Input type="text" onValue={() => console.log('@changed')} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-button font-medium text-gray-400">
          Адрес профиля
        </label>
        <Input type="text" onValue={() => console.log('@changed')} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-button font-medium text-gray-400">
          Описание
        </label>
        <Input type="text" onValue={() => console.log('@changed')} />
      </div>
      <div className="mt-auto flex items-center gap-2.5">
        <Modal.Close asChild>
          <Button type="submit" className="w-full">
            Отмена
          </Button>
        </Modal.Close>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-600/90"
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}
