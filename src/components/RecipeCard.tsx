import { Recipe } from '../types'

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const DIFFICULTY_GRADIENT: Record<Recipe['difficulty'], string> = {
  Easy: 'linear-gradient(135deg, #E8820C 0%, #8B4A00 100%)',
  Medium: 'linear-gradient(135deg, #C0392B 0%, #5C1A12 100%)',
  Hard: 'linear-gradient(135deg, #3B1F00 0%, #1C1006 100%)',
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const missingCount = recipe.missingIngredients?.length ?? 0

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
      <div className="h-40 relative">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: DIFFICULTY_GRADIENT[recipe.difficulty] ?? DIFFICULTY_GRADIENT.Medium }}
          />
        )}
      </div>

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
