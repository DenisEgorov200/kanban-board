import * as RadixAvatar from '@radix-ui/react-avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { cn } from '@shared/lib/tw-merge'

interface Props extends AvatarProps {
  src: string
  className?: string
  alt: string
}

export const Avatar = ({ src, alt, className }: Props) => {
  return (
    <RadixAvatar.Root
      className={cn(
        'inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle',
        className,
      )}
    >
      <RadixAvatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <RadixAvatar.Fallback
        className="leading-1 flex h-full w-full items-center justify-center bg-white font-medium"
        delayMs={600}
      >
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
