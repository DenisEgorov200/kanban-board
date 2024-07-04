import { cn } from '@shared/lib/tw-merge'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'rounded border border-gray-200 px-5 py-2 font-medium transition-colors hover:bg-gray-50',
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)
