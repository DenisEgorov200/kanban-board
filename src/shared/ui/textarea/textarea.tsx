import cn from 'clsx'
import type { ChangeEvent, TextareaHTMLAttributes } from 'react'

export interface Props<T extends string>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  onValue: (value: string, { name }: { name: T }) => void
  name: T
  value: string
  label?: string
  hint?: string
  error?: string
}

export const Textarea = <T extends string>({
  className,
  onValue,
  name,
  value,
  label,
  hint,
  error,
  ...props
}: Props<T>) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.currentTarget
    onValue(value, { name: name as T })
  }

  return label ? (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <textarea
        name={name}
        className="min-h-40 resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-500 outline-none transition-colors focus:border-gray-400"
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
    <>
      <textarea
        name={name}
        className={cn(
          'min-h-40 resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-500 outline-none transition-colors focus:border-gray-400',
          className,
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
    </>
  )
}
