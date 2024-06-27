import { TodoCard } from '@entities/todo-card'
import { Select } from '@shared/ui/select'
import { useState } from 'react'

export const TasksPage = () => {
  const [selectStatus, setSelectStatus] = useState('React')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select
          label="Status"
          placeholder="Any"
          data={['React', 'Angular', 'Vue', 'Svelte', 'Effector']}
          value={selectStatus}
          onChange={setSelectStatus}
        />
        <Select
          label="Sort by"
          placeholder="Sort"
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />
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
