import { TodoCard } from '@entities/todo-card'
import { Select } from '@shared/ui/select'

export const TasksPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select />
        <Select />
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
