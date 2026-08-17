import { useEffect, useState } from 'react'
import { DISHES, Dish } from '../data/dishes'

interface HeroProps {
  onStart?: () => void;
}

function DishImage({ dish, active, eager }: { dish: Dish; active: boolean; eager: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!active}
      style={{ background: dish.fallbackColor }}
    >
      <img
        src={dish.imageSrc}
        alt={dish.name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

// Only the active dish gets a <video>. Ten autoplaying videos would mean ten
// concurrent downloads on first paint; this keeps at most one in flight, layered
// over the poster image so there is never a blank frame while it buffers.
function ActiveVideo({ dish }: { dish: Dish }) {
  const [ready, setReady] = useState(false)

  return (
    <video
      key={dish.id}
      src={dish.videoSrc}
      poster={dish.imageSrc}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}

function DishThumb({
  dish,
  isActive,
  onSelect,
}: {
  dish: Dish;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false)

  const ring = isActive ? 'border-cream opacity-100' : 'border-transparent opacity-60'

  return (
    <button
      onClick={onSelect}
      aria-label={`Show ${dish.name}`}
      aria-pressed={isActive}
      className="flex flex-col items-center gap-1.5 shrink-0"
    >
      <span
        className={`h-1 w-1 rounded-full bg-cream transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {imageFailed ? (
        <div
          style={{ background: dish.fallbackColor }}
          className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm text-white transition-all duration-300 ${ring}`}
        >
          {dish.name.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={dish.imageSrc}
          alt={dish.name}
          onError={() => setImageFailed(true)}
          style={{ background: dish.fallbackColor }}
          className={`h-10 w-10 rounded-full object-cover border-2 transition-all duration-300 ${ring}`}
        />
      )}
    </button>
  )
}

export default function Hero({ onStart }: HeroProps) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % DISHES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [isPaused])

  const activeDish = DISHES[active]

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {DISHES.map((dish, i) => (
        <DishImage key={dish.id} dish={dish} active={i === active} eager={i === 0} />
      ))}

      <ActiveVideo dish={activeDish} />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-12 md:px-12 md:pb-10 lg:px-20">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-4">
            AI-Powered Nigerian Meal Planner
          </p>
          <h1 className="font-playfair italic text-cream text-4xl md:text-6xl lg:text-8xl leading-tight">
            Cook what you
            <br />
            already have.
          </h1>
          <p className="font-dm text-base md:text-lg text-cream/70 mt-4">
            Tell Chowcipe what is in your kitchen.
          </p>
          <button
            onClick={onStart}
            className="mt-8 font-dm font-semibold bg-palm-oil text-clay rounded-full px-8 py-3 hover:bg-palm-oil/90 transition-colors"
          >
            Start cooking
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div key={activeDish.name} className="animate-fadeUp">
              <h2 className="font-dm font-semibold text-cream text-2xl md:text-4xl">
                {activeDish.name}
              </h2>
              <p className="font-dm text-xs uppercase tracking-wide text-crayfish mt-1">
                {activeDish.tribe}
              </p>
              <p className="font-dm text-sm text-cream/60 mt-1 hidden md:block">
                {activeDish.tagline}
              </p>
            </div>

            <span className="hidden md:block font-dm text-xs uppercase tracking-widest text-crayfish">
              Scroll to explore
            </span>
          </div>

          <div className="flex flex-nowrap items-center justify-center gap-3 overflow-x-auto md:overflow-visible [scrollbar-width:none]">
            {DISHES.map((dish, i) => (
              <DishThumb
                key={dish.id}
                dish={dish}
                isActive={i === active}
                onSelect={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
