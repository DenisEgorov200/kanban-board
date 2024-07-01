import { TodoCard } from '@entities/todo-card'
import { Select } from '@shared/ui/select'
import { useState } from 'react'

export const TasksPage = () => {
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
