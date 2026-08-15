const FEATURES = [
  {
    icon: '🔁',
    title: 'Variety tracking',
    description:
      'Chowcipe keeps a light record of what you have cooked recently and steers suggestions away from the same three dishes on repeat.',
  },
  {
    icon: '🌿',
    title: 'Local ingredient names',
    description:
      'Ede is Cocoyam. Ofor is a thickener. Every unfamiliar item comes with its local name and its common English name side by side.',
  },
  {
    icon: '🏷️',
    title: 'Market prices',
    description:
      'Community-sourced prices per market, from Mile 12 in Lagos to Sabongari in Kano, so you know what a wrap of egusi should really cost.',
  },
  {
    icon: '🥄',
    title: 'Exact quantities',
    description:
      'Teaspoons, cups, grams and Nigerian units like paint buckets and cigarette cups. Never another recipe that just says add some pepper.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-clay px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-dm text-xs uppercase tracking-widest text-crayfish mb-3">
          Why Chowcipe
        </p>
        <h2 className="font-playfair italic text-cream text-3xl md:text-5xl mb-12">
          Built for the Nigerian kitchen.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-clay-card rounded-2xl p-6">
              <span className="text-3xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="font-playfair text-cream text-xl mt-4 mb-2">{feature.title}</h3>
              <p className="font-dm text-sm leading-relaxed text-crayfish">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
