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
    // Nested frame, after Raycast: a translucent, warm-tinted outer shell with a
    // half-pixel top highlight, wrapping a solid inner card with a smaller
    // radius. The gap between the two radii is what reads as a gradient border.
    <div
      className={cn(
        'group/bento row-span-1 h-full rounded-[19px] p-[3px] transition duration-300',
        'bg-clay/40 backdrop-blur-[2px]',
        'bg-[radial-gradient(85%_50%_at_51%_5%,rgba(232,130,12,0.12)_0%,rgba(250,240,220,0.05)_46%,rgba(250,240,220,0)_100%)]',
        'shadow-[0_0_40px_20px_rgba(232,130,12,0.03),inset_0_0.5px_0_0_rgba(250,240,220,0.30)]',
        'hover:shadow-[0_0_50px_24px_rgba(232,130,12,0.07),inset_0_0.5px_0_0_rgba(250,240,220,0.45)]',
        className
      )}
    >
      <div
        className={cn(
          'flex h-full flex-col space-y-4 rounded-[16px] bg-clay-card p-4 transition duration-300',
          'shadow-[0_0_2px_0_rgba(250,240,220,0.19),inset_0_0.5px_0_0_rgba(250,240,220,0.10)]',
          'group-hover/bento:shadow-[0_0_2px_0_rgba(232,130,12,0.35),inset_0_0.5px_0_0_rgba(250,240,220,0.18)]'
        )}
      >
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {icon && <div className="flex items-center gap-2 text-crayfish">{icon}</div>}
          <div className="font-dm font-semibold text-cream text-lg mb-2 mt-2">{title}</div>
          <div className="font-dm text-crayfish text-sm">{description}</div>
        </div>
      </div>
    </div>
  )
}
