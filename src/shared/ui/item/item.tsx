import { forwardRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Item = forwardRef(({ children, ...props }: Props, ref) => {
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  )
})
