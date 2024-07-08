import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import {
  $description,
  $error,
  $name,
  $pending,
  $slug,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  OnboardingWorkspaceError,
  slugChanged,
} from '../model'

export const PageLoader = () => {
  return (
    <main>
      <section>
        <h1>Session loading…</h1>
      </section>
    </main>
  )
}

const errorText: { [Key in OnboardingWorkspaceError]: string } = {
  NameInvalid: 'Please, check name of the workspace. It should be longer.',
  SlugInvalid: 'Filled slug is incorrect. It can contain only a-z and dashes.',
  SlugTaken: 'Filled slug already taken, please choose another one.',
  UnknownError: 'Something wrong happened. Please try again.',
}

export const OnboardingWorkspacePage = () => {
  const [name, slug, description, error, pending] = useUnit([
    $name,
    $slug,
    $description,
    $error,
    $pending,
  ])
  const [handleFormSubmit, handleName, handleSlug, handleDescription] = useUnit(
    [formSubmitted, nameChanged, slugChanged, descriptionChanged],
  )

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleFormSubmit()
  }

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
          <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
            <Input
              label="Workspace name"
              onValue={handleName}
              name="name"
              value={name}
              placeholder="Your Company Co."
            />
            <Input
              label="kanban.io/workspaces/"
              onValue={handleSlug}
              name="slug"
              value={slug}
              placeholder="your-company-co"
            />
            <Textarea
              label="Description"
              onValue={handleDescription}
              name="description"
              value={description}
              placeholder="Our team organizes everything here."
            />
            <div className="text-red-600">
              {error ? errorText[error] : <span>&nbsp;</span>}
            </div>
            <Button type="submit" loading={pending}>
              Get started
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
