import { motion } from 'framer-motion'
import {
  IconBook,
  IconRefresh,
  IconRuler,
  IconShoppingCart,
} from '@tabler/icons-react'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'
import { cn } from '../lib/utils'

const SKELETON_SHELL =
  'flex flex-1 w-full h-full min-h-[7rem] rounded-xl bg-clay border border-cream/5 p-4'

// Meal history pills that shuffle left and right on hover.
function SkeletonVariety() {
  const rows = [
    { label: 'Jollof Rice', tone: 'bg-palm-oil/20 text-cream', x: 12 },
    { label: 'Egusi Soup', tone: 'bg-cream/10 text-crayfish', x: -12 },
    { label: 'Ewa Agoyin', tone: 'bg-palm-oil/20 text-cream', x: 8 },
  ]

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-2')}
    >
      {rows.map((row) => (
        <motion.div
          key={row.label}
          variants={{ initial: { x: 0 }, animate: { x: row.x } }}
          transition={{ duration: 0.25 }}
          className={cn(
            'font-dm text-xs rounded-full px-3 py-1.5 w-fit',
            row.tone
          )}
        >
          {row.label}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Local name on the left, common name on the right, joined by a bar that
// draws itself on hover.
function SkeletonLocalNames() {
  const pairs = [
    ['Ede', 'Cocoyam'],
    ['Ofor', 'Thickener'],
    ['Ata rodo', 'Scotch bonnet'],
  ]

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-3')}
    >
      {pairs.map(([local, common]) => (
        <div key={local} className="flex items-center gap-3">
          <span className="font-dm text-xs text-crayfish w-20 shrink-0">{local}</span>
          <motion.span
            variants={{ initial: { width: 8 }, animate: { width: 40 } }}
            transition={{ duration: 0.3 }}
            className="h-px bg-palm-oil/60 shrink-0"
          />
          <span className="font-dm text-xs text-cream">{common}</span>
        </div>
      ))}
    </motion.div>
  )
}

// Market rows whose price bars grow on hover.
function SkeletonMarket() {
  const rows = [
    { market: 'Mile 12, Lagos', price: 'N4,500', width: '80%' },
    { market: 'Bodija, Ibadan', price: 'N2,200', width: '55%' },
    { market: 'Eke Awka', price: 'N1,800', width: '40%' },
  ]

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-3')}
    >
      {rows.map((row) => (
        <div key={row.market} className="flex items-center gap-3">
          <span className="font-dm text-xs text-crayfish w-28 shrink-0">{row.market}</span>
          <div className="flex-1 h-1.5 rounded-full bg-cream/5 overflow-hidden">
            <motion.div
              variants={{ initial: { width: 0 }, animate: { width: row.width } }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-palm-oil/60"
            />
          </div>
          <span className="font-dm text-xs text-palm-oil shrink-0">{row.price}</span>
        </div>
      ))}
    </motion.div>
  )
}

// Measured ingredient lines that fade in one after another.
function SkeletonQuantity() {
  const lines = ['2 tbsp palm oil', '1 cup egusi', '3 scotch bonnet']

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-2')}
    >
      {lines.map((line, i) => (
        <motion.p
          key={line}
          variants={{
            initial: { opacity: 0.35, x: 0 },
            animate: { opacity: 1, x: 6 },
          }}
          transition={{ duration: 0.25, delay: i * 0.1 }}
          className="font-dm text-xs text-cream"
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}

const FEATURES = [
  {
    title: 'Variety tracking',
    description:
      'Chowcipe keeps a light record of what you have cooked recently and steers suggestions away from the same three dishes on repeat.',
    header: <SkeletonVariety />,
    icon: <IconRefresh className="h-4 w-4 text-palm-oil" />,
    className: 'md:col-span-1',
  },
  {
    title: 'Local ingredient names',
    description:
      'Ede is Cocoyam. Ofor is a thickener. Every unfamiliar item comes with its local name and its common English name side by side.',
    header: <SkeletonLocalNames />,
    icon: <IconBook className="h-4 w-4 text-palm-oil" />,
    className: 'md:col-span-2',
  },
  {
    title: 'Market prices',
    description:
      'Community-sourced prices per market, from Mile 12 in Lagos to Sabongari in Kano, so you know what a wrap of egusi should really cost.',
    header: <SkeletonMarket />,
    icon: <IconShoppingCart className="h-4 w-4 text-palm-oil" />,
    className: 'md:col-span-2',
  },
  {
    title: 'Exact quantities',
    description:
      'Teaspoons, cups, grams and Nigerian units like paint buckets and cigarette cups. Never another recipe that just says add some pepper.',
    header: <SkeletonQuantity />,
    icon: <IconRuler className="h-4 w-4 text-palm-oil" />,
    className: 'md:col-span-1',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-clay px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-3">
          What you get
        </p>
        <h2 className="font-playfair italic text-cream text-3xl md:text-5xl mb-12">
          It knows how we cook.
        </h2>

        <BentoGrid>
          {FEATURES.map((feature) => (
            <BentoGridItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
