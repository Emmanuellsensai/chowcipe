const STEPS = [
  {
    number: '01',
    title: 'Tell us what you have',
    description:
      'Type the ingredients sitting in your kitchen right now. Tomatoes, half a bag of rice, that stockfish from last week. No shopping list required.',
  },
  {
    number: '02',
    title: 'Get Nigerian recipes',
    description:
      'Chowcipe suggests five dishes you can actually cook today, and it remembers what you ate this week so you are not eating jollof four days straight.',
  },
  {
    number: '03',
    title: 'Cook with confidence',
    description:
      'Every step comes with exact quantities, local ingredient names next to their common ones, and what the missing items should cost at the market.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-clay px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-dm text-xs uppercase tracking-widest text-crayfish mb-3">
          How it works
        </p>
        <h2 className="font-playfair italic text-cream text-3xl md:text-5xl mb-14">
          Three steps to dinner.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 ${
                i > 0 ? 'border-t border-cream/10 md:border-t-0 md:border-l md:border-cream/10' : ''
              }`}
            >
              <p className="font-playfair italic text-palm-oil text-5xl md:text-6xl leading-none mb-5">
                {step.number}
              </p>
              <h3 className="font-playfair text-cream text-xl md:text-2xl mb-3">{step.title}</h3>
              <p className="font-dm text-sm leading-relaxed text-crayfish">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
