import { TodoCard } from '@entities/todo-card'
import { SelectUI } from '@shared/ui/select'

export const TasksPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <SelectUI />
        <SelectUI />
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
