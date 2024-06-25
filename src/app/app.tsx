import { Kanban } from '@widgets/kanban'

export const App = () => {
  return (
    <div className="h-dvh w-dvw">
      <div className="container mx-auto px-2.5">
        <header className="py-10">
          <h1 className="text-center text-4xl font-bold uppercase">Kanban</h1>
        </header>
        <Kanban />
      </div>
    </div>
  )
}
