import { useEffect, useRef, useState } from 'react'
import { DISHES, Dish } from '../data/dishes'
import { usePexelsVideo } from '../hooks/usePexelsVideo'

interface HeroProps {
  onStart?: () => void;
}

function DishVideo({ dish, active }: { dish: Dish; active: boolean }) {
  const { videoUrl, posterUrl, loading } = usePexelsVideo(dish.pexelsQuery, dish.fallbackVideoId)
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (active) {
      const play = el.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    } else {
      el.pause()
    }
  }, [active, videoUrl])

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!active}
    >
      <div className="absolute inset-0" style={{ background: dish.fallbackColor }} />
      {!loading && videoUrl && (
        <video
          ref={ref}
          src={videoUrl}
          poster={posterUrl ?? undefined}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}

function DishThumb({ dish, active, onSelect }: { dish: Dish; active: boolean; onSelect: () => void }) {
  const { posterUrl } = usePexelsVideo(dish.pexelsQuery, dish.fallbackVideoId)

  return (
    <button
      onClick={onSelect}
      aria-label={`Show ${dish.name}`}
      aria-pressed={active}
      className="flex flex-col items-center gap-1.5 shrink-0"
    >
      <span
        className={`h-1 w-1 rounded-full bg-cream transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={dish.name}
          className={`h-10 w-10 md:h-14 md:w-14 rounded-full object-cover border-2 transition-all duration-300 ${
            active ? 'border-cream opacity-100' : 'border-transparent opacity-50'
          }`}
        />
      ) : (
        <span
          style={{ background: dish.fallbackColor }}
          className={`h-10 w-10 md:h-14 md:w-14 rounded-full border-2 transition-all duration-300 ${
            active ? 'border-cream opacity-100' : 'border-transparent opacity-50'
          }`}
        />
      )}
    </button>
  )
}

export default function Hero({ onStart }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % DISHES.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const activeDish = DISHES[index]

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {DISHES.map((dish, i) => (
        <DishVideo key={dish.id} dish={dish} active={i === index} />
      ))}

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-12 md:px-12 md:pb-10 lg:px-20">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-dm text-xs uppercase tracking-widest text-crayfish mb-4">
            AI-Powered Nigerian Meal Planner
          </p>
          <h1 className="font-playfair italic text-cream text-4xl md:text-6xl lg:text-8xl leading-tight">
            Nigerian food,
            <br />
            decided.
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

        <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6">
          <div key={activeDish.name} className="animate-fadeUp">
            <h2 className="font-playfair font-normal text-cream text-2xl md:text-4xl">
              {activeDish.name}
            </h2>
            <p className="font-dm text-xs uppercase tracking-wide text-crayfish mt-1">
              {activeDish.tribe}
            </p>
            <p className="font-dm text-sm text-cream/60 mt-1 hidden md:block">
              {activeDish.tagline}
            </p>
          </div>

          <div className="flex flex-row gap-2 md:gap-3 overflow-x-auto md:justify-center [scrollbar-width:none]">
            {DISHES.map((dish, i) => (
              <DishThumb
                key={dish.id}
                dish={dish}
                active={i === index}
                onSelect={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="hidden md:flex justify-end">
            <span className="font-dm text-xs uppercase tracking-widest text-crayfish">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
