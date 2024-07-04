import { cn } from '@shared/lib/tw-merge'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props<T extends string>
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  onValue: (value: string, { name }: { name: T }) => void
}

export const Input = <T extends string>({
  icon,
  type,
  className,
  onValue,
  ...props
}: Props<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    onValue(value, { name: name as T })
  }

  return (
    <input
      className={cn(
        'rounded-sm border border-gray-200 p-1 outline-none transition-colors focus:border-gray-600',
        className,
      )}
      onChange={handleChange}
      {...props}
    />
  )
}
