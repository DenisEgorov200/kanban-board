export const App = () => {
  return (
    <div className="h-dvh w-dvw">
      <div className="container mx-auto px-2.5">
        <header className="py-10">
          <h1 className="text-center text-4xl font-bold uppercase">Kanban</h1>
        </header>
        <ul className="grid grid-cols-3 gap-2">
          <li className="rounded-md bg-white p-5">
            <div className="mb-2 border-b-2 border-black py-2 font-medium">
              To do 2
            </div>
            <ul className="flex flex-col gap-2">
              <li className="rounded-md border-2 border-b-4 border-black p-2">
                выучить effector
              </li>
              <li className="rounded-md border-2 border-b-4 border-green-800 p-2">
                прописать план встречи
              </li>
            </ul>
          </li>
          <li className="rounded-md bg-white p-5">
            <div className="mb-2 border-b-2 border-blue-300 py-2 font-medium">
              In progress 2
            </div>
            <ul className="flex flex-col gap-2">
              <li className="rounded-md border-2 border-b-4 border-black p-2">
                выучить effector
              </li>
              <li className="rounded-md border-2 border-b-4 border-green-800 p-2">
                прописать план встречи
              </li>
            </ul>
          </li>
          <li className="rounded-md bg-white p-5">
            <div className="mb-2 border-b-2 border-gray-400 py-2 font-medium">
              Done 2
            </div>
            <ul className="flex flex-col gap-2">
              <li className="rounded-md border-2 border-b-4 border-black p-2">
                выучить effector
              </li>
              <li className="rounded-md border-2 border-b-4 border-green-800 p-2">
                прописать план встречи
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
