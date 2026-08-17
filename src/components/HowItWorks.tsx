import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'
import { cn } from '../lib/utils'

const SKELETON_SHELL =
  'flex flex-1 w-full h-full min-h-[7rem] rounded-xl bg-clay border border-cream/5 p-4'

// Ingredient tags appearing one by one.
function SkeletonIngredients() {
  const tags = ['tomatoes', 'onions', 'palm oil']

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-wrap content-center items-center gap-2')}
    >
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          variants={{
            initial: { opacity: 0.3, y: 4 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, delay: i * 0.12 }}
          className="font-dm text-xs rounded-full bg-palm-oil/20 text-cream px-3 py-1.5"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Suggested dishes sliding in from the left.
function SkeletonRecipes() {
  const dishes = ['Jollof Rice', 'Egusi Soup', 'Akara', 'Moi Moi', 'Suya']

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-1.5')}
    >
      {dishes.map((dish, i) => (
        <motion.div
          key={dish}
          variants={{
            initial: { opacity: 0.4, x: -8 },
            animate: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.25, delay: i * 0.08 }}
          className="flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-palm-oil shrink-0" />
          <span className="font-dm text-xs text-cream">{dish}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Cooking steps checking off one at a time.
function SkeletonChecklist() {
  const steps = ['Parboil the rice', 'Fry the pepper base', 'Steam 25 minutes']

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(SKELETON_SHELL, 'flex-col justify-center gap-2.5')}
    >
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <motion.span
            variants={{
              initial: { scale: 0.6, opacity: 0.25 },
              animate: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.25, delay: i * 0.15 }}
            className="h-4 w-4 rounded-full bg-palm-oil/20 flex items-center justify-center shrink-0"
          >
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#E8820C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.span>
          <span className="font-dm text-xs text-cream">{step}</span>
        </div>
      ))}
    </motion.div>
  )
}

const STEPS = [
  {
    number: '01',
    title: 'Tell us what you have',
    description:
      'Type the ingredients sitting in your kitchen right now. Tomatoes, half a bag of rice, that stockfish from last week. No shopping list required.',
    header: <SkeletonIngredients />,
  },
  {
    number: '02',
    title: 'Get Nigerian recipes',
    description:
      'Chowcipe suggests five dishes you can actually cook today, and it remembers what you ate this week so you are not eating jollof four days straight.',
    header: <SkeletonRecipes />,
  },
  {
    number: '03',
    title: 'Cook with confidence',
    description:
      'Every step comes with exact quantities, local ingredient names next to their common ones, and what the missing items should cost at the market.',
    header: <SkeletonChecklist />,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 pt-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-3">
          How it works
        </p>
        <h2 className="font-playfair italic text-cream text-3xl md:text-5xl mb-12">
          Three steps to dinner.
        </h2>

        <BentoGrid>
          {STEPS.map((step) => (
            <BentoGridItem
              key={step.number}
              title={step.title}
              description={step.description}
              header={step.header}
              icon={
                <span className="font-playfair italic text-palm-oil text-5xl leading-none">
                  {step.number}
                </span>
              }
              className="md:col-span-1"
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
