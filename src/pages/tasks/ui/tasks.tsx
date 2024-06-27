import { TodoCard } from '@entities/todo-card'

export const TasksPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div>Status</div>
        <div>Sort by</div>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <TodoCard />
        </li>
        <li>
          <TodoCard />
        </li>
      </ul>
    </div>
  )
}
