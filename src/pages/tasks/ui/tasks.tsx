import { TodoCard } from '@entities/todo-card'
import { Accordion } from '@shared/ui/accordion'
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
      <Accordion
        type="single"
        className="w-full rounded-md shadow-[0_2px_10px] shadow-black/5"
      >
        <Accordion.Trigger>
          <div className="flex items-center gap-4 border-b border-gray-200 p-4 shadow-main">
            <div className="h-5 w-5 cursor-pointer rounded-full border border-blue-600 p-0.5">
              <img src="/icons/plus.svg" alt="plus" />
            </div>
            <input
              type="text"
              className="w-full border-0 font-medium text-gray-600 outline-none placeholder:text-blue-600"
              placeholder="Add task"
            />
          </div>
        </Accordion.Trigger>
        <Accordion.Content className="bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/icons/notification.svg"
                alt="notification"
                className="h-8 w-8"
              />
            </div>
            <button className="border border-gray-200 bg-white px-5 py-1 font-medium text-blue-600 transition-colors hover:bg-gray-100">
              Add
            </button>
          </div>
        </Accordion.Content>
      </Accordion>
      <ul className="flex flex-col gap-2">
        {tasks?.map((task) => (
          <li key={task.id}>
            <TodoCard
              id={task.id}
              status={task.status}
              content={task.content}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
