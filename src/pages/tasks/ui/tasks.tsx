import { TodoCard } from '@entities/todo-card'
import { Select } from '@shared/ui/select'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { $tasks } from '../model'

export const TasksPage = () => {
  const tasks = useUnit($tasks)

  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select
          label="Status"
          placeholder="Any"
          data={['apple', 'banana']}
          value={value}
          onChange={setValue}
        />
        <Select data={['apple', 'banana']} />
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <TodoCard />
          </li>
        ))}
      </ul>
    </div>
  )
}
