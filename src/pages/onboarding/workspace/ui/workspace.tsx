import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { useUnit } from 'effector-react'
import { $description, $name, $slug } from '../model'

export const PageLoader = () => {
  return (
    <main>
      <section>
        <h1>Session loading…</h1>
      </section>
    </main>
  )
}

export const OnboardingWorkspacePage = () => {
  const [name, slug, description] = useUnit([$name, $slug, $description])

  return (
    <main className="flex h-dvh w-dvw flex-col items-center py-20">
      <section className="mx-auto max-w-[512px]">
        <div className="flex flex-col gap-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
            <img src="/icons/folder-shield.svg" alt="folder" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-gray-900">
              Let's build a Workspace
            </h1>
            <p className="max-w-[450px] text-xl text-gray-600">
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </p>
          </div>
          <form className="flex flex-col gap-3.5">
            <Input
              label="Workspace name"
              onValue={() => console.log('@changed')}
              name="name"
              value={name}
              placeholder="Your Company Co."
            />
            <Input
              label="kanban.io/workspaces/"
              onValue={() => console.log('@changed')}
              name="slug"
              value={slug}
              placeholder="your-company-co"
            />
            <Textarea
              label="Description"
              onValue={() => console.log('@changed')}
              name="description"
              value={description}
              placeholder="Our team organizes everything here."
            />
            <Button type="submit">Get started</Button>
          </form>
        </div>
      </section>
    </main>
  )
}
