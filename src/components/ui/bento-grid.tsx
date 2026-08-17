import React from 'react'
import { cn } from '../../lib/utils'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // minmax rather than a fixed 18rem: rows keep a uniform floor but grow
        // when a card's content (e.g. the 5xl step numbers) needs more room,
        // instead of spilling out the bottom of the card.
        'grid md:auto-rows-[minmax(18rem,auto)] grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    // A single frosted surface. The old nested outer-shell/inner-card frame is
    // gone: glass already carries the depth, so a second layer just muddied it.
    <div
      className={cn(
        'glass-card group/bento row-span-1 h-full',
        'flex flex-col space-y-4 p-4 transition duration-300',
        'hover:border-palm-oil/25',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon && <div className="flex items-center gap-2 text-crayfish">{icon}</div>}
        <div className="font-dm font-semibold text-cream text-lg mb-2 mt-2">{title}</div>
        <div className="font-dm text-crayfish text-sm">{description}</div>
      </div>
    </div>
  )
}
