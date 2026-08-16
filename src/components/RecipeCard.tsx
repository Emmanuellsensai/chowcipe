import { useState } from 'react'
import { Recipe } from '../types'

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

// Checked in order — the first keyword found in the dish name wins.
// Specific dishes come before generic ingredients so "Ofada Rice" doesn't
// match the generic "rice" clip.
const VIDEO_KEYWORDS: [string, string][] = [
  ['jollof', 'jollof'],
  ['egusi', 'egusi'],
  ['ewa agoyin', 'ewa-agoyin'],
  ['suya', 'suya'],
  ['pounded yam', 'pounded-yam'],
  ['akara', 'akara'],
  ['banga', 'banga'],
  ['moi moi', 'moi-moi'],
  ['ofada', 'ofada'],
  ['pepper soup', 'pepper-soup'],
  ['plantain', 'plantain'],
  ['dodo', 'plantain'],
  ['ewa', 'ewa-agoyin'],
  ['beans', 'beans'],
  ['chicken', 'chicken'],
  ['rice', 'rice'],
]

function getLocalVideo(name: string): string | null {
  const dish = name.toLowerCase()
  for (const [keyword, slug] of VIDEO_KEYWORDS) {
    if (dish.includes(keyword)) return `/videos/${slug}.mp4`
  }
  return null
}

function getLocalPoster(name: string): string | null {
  const video = getLocalVideo(name)
  return video ? video.replace(/\.mp4$/, '-poster.jpg') : null
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const missingCount = recipe.missingIngredients?.length ?? 0
  const [videoFailed, setVideoFailed] = useState(false)
  const videoSrc = getLocalVideo(recipe.name)
  const posterSrc = getLocalPoster(recipe.name)

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="bg-clay-card rounded-2xl overflow-hidden cursor-pointer hover:ring-1 hover:ring-palm-oil/50 transition"
    >
      {videoSrc && !videoFailed ? (
        <video
          src={videoSrc}
          poster={posterSrc ?? undefined}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          className="h-48 w-full object-cover rounded-t-2xl"
        />
      ) : (
        <div className="h-48 w-full rounded-t-2xl bg-gradient-to-br from-palm-oil/40 to-buka-red/40 flex items-center justify-center">
          <span className="font-playfair text-4xl text-cream">
            {recipe.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="p-4">
        <p className="font-dm text-[11px] uppercase tracking-wide text-crayfish">{recipe.tribe}</p>
        <h3 className="font-playfair text-xl text-cream mt-1">{recipe.name}</h3>
        <p className="font-dm text-sm text-crayfish mt-2 leading-relaxed">{recipe.whyCook}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-dm text-xs text-crayfish mt-3">
          <span>{recipe.cookTime}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.servings}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.difficulty}</span>
        </div>

        <div className="mt-4">
          {missingCount > 0 ? (
            <span className="inline-block font-dm text-xs text-buka-red bg-buka-red/10 border border-buka-red/30 rounded-full px-3 py-1">
              {missingCount} missing ingredient{missingCount > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="inline-block font-dm text-xs text-palm-oil bg-palm-oil/10 border border-palm-oil/30 rounded-full px-3 py-1">
              You have everything
            </span>
          )}
        </div>

        <p className="font-dm text-sm text-palm-oil mt-4">See recipe →</p>
      </div>
    </article>
  )
}
