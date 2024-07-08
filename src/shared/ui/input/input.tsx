import { cn } from '@shared/lib/tw-merge'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props<T extends string>
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onValue: (value: string, { name }: { name: T }) => void
  name: T
  value: string
  label?: string
  type?: 'text' | 'email' | 'search'
  hint?: string
  error?: string
}

export const Input = <T extends string>({
  className,
  onValue,
  name,
  value,
  label,
  hint,
  type = 'text',
  error,
  ...props
}: Props<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    onValue(value, { name: name as T })
  }

  return label ? (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        name={name}
        className={cn(
          'rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-500 outline-none transition-colors focus:border-gray-400',
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error ? (
        <span className="text-red-600">{error}</span>
      ) : (
        hint && <span className="text-gray-500">{hint}</span>
      )}
    </label>
  ) : (
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
