import { cn } from '@shared/lib/tw-merge'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'rounded border border-gray-200 px-5 py-2 font-medium transition-colors hover:bg-gray-50 focus:shadow-lg',
          className,
        )}
        aria-disabled={loading ?? disabled}
        ref={ref}
        {...props}
      >
        {loading ? 'Loading…' : children}
      </button>
    )
  },
)
