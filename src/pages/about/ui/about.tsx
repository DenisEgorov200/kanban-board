export const AboutPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold text-gray-500">
        About the Kanban app
      </h1>
      <p className="mb-6 max-w-[450px] text-center text-lg text-gray-400">
        Kanban is a project management methodology that helps organize work on
        tasks in the form of columns or boards.
      </p>
      <div className="flex h-96 w-96 items-center justify-center rounded-full bg-blue-600">
        <img src="/gif/duck.gif" alt="duck" />
      </div>
    </div>
  )
}
