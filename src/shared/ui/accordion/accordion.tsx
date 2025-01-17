import * as RadixAccordion from '@radix-ui/react-accordion'
import {
  AccordionContentProps,
  AccordionSingleProps,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import { cn } from '@shared/lib/tw-merge'

export const Accordion = ({
  type,
  className,
  children,
}: AccordionSingleProps) => {
  return (
    <RadixAccordion.Root type={type} className={className} collapsible>
      <RadixAccordion.Item value="item-1">{children}</RadixAccordion.Item>
    </RadixAccordion.Root>
  )
}

const Trigger = ({ className, children }: AccordionTriggerProps) => {
  return (
    <RadixAccordion.Header className="w-full" asChild>
      <RadixAccordion.Trigger className={className}>
        {children}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
}

const Content = ({ className, children }: AccordionContentProps) => {
  return (
    <RadixAccordion.Content
      className={cn(
        'data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
        className,
      )}
    >
      {children}
    </RadixAccordion.Content>
  )
}

Accordion.Trigger = Trigger
Accordion.Content = Content
