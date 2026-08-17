import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import BottomNav, { NavTab } from '../components/BottomNav'
import IngredientInput from '../components/IngredientInput'
import RecipeCard from '../components/RecipeCard'
import { useRecipes } from '../hooks/useRecipes'
import { useMealHistory } from '../hooks/useMealHistory'
import { MARKETS, SAMPLE_INGREDIENTS } from '../data/dishes'
import { PriceEntry, Recipe } from '../types'

type View = 'home' | 'recipes' | 'detail' | 'markets' | 'history'

const PRICES_KEY = 'chowcipe_prices'

const SEED_PRICES: PriceEntry[] = [
  { id: 1, item: 'Tomatoes', price: '4500', quantity: '1 basket', market: 'Mile 12, Lagos', date: '12/08/2026' },
  { id: 2, item: 'Palm oil', price: '2200', quantity: '1 bottle (75cl)', market: 'Bodija Market, Ibadan', date: '11/08/2026' },
  { id: 3, item: 'Egusi', price: '1800', quantity: '1 cigarette cup', market: 'Eke Awka Market, Anambra', date: '10/08/2026' },
  { id: 4, item: 'Crayfish', price: '1500', quantity: '1 cigarette cup', market: 'Oyingbo Market, Lagos', date: '09/08/2026' },
]

interface AppPageProps {
  onExit?: () => void;
}

export default function AppPage({ onExit }: AppPageProps) {
  const [view, setView] = useState<View>('home')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [selected, setSelected] = useState<Recipe | null>(null)
  const [prices, setPrices] = useState<PriceEntry[]>([])
  const [form, setForm] = useState({ item: '', price: '', quantity: '', market: MARKETS[0] })
  const [formNote, setFormNote] = useState('')

  const { recipes, loading, error, fetchRecipes } = useRecipes()
  const { history, addMeal, clearHistory } = useMealHistory()

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PRICES_KEY)
      setPrices(saved ? JSON.parse(saved) : SEED_PRICES)
    } catch {
      setPrices(SEED_PRICES)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  const recentMeals = useMemo(() => history.slice(0, 8).map((m) => m.name), [history])

  const addIngredient = (value: string) => setIngredients((prev) => [...prev, value])
  const removeIngredient = (value: string) =>
    setIngredients((prev) => prev.filter((item) => item !== value))

  const handleFind = async () => {
    if (ingredients.length === 0) return
    setView('recipes')
    await fetchRecipes(ingredients, recentMeals)
  }

  const openRecipe = (recipe: Recipe) => {
    setSelected(recipe)
    setView('detail')
  }

  const savePrices = (next: PriceEntry[]) => {
    setPrices(next)
    try {
      localStorage.setItem(PRICES_KEY, JSON.stringify(next))
    } catch {}
  }

  const submitPrice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.item.trim() || !form.price.trim() || !form.quantity.trim()) {
      setFormNote('Fill in the item, the price and the quantity.')
      return
    }
    const entry: PriceEntry = {
      id: Date.now(),
      item: form.item.trim(),
      price: form.price.trim(),
      quantity: form.quantity.trim(),
      market: form.market,
      date: new Date().toLocaleDateString('en-NG'),
    }
    savePrices([entry, ...prices])
    setForm({ item: '', price: '', quantity: '', market: MARKETS[0] })
    setFormNote('Thank you. Your price is now part of the community list.')
  }

  const navTab: NavTab = view === 'detail' ? 'recipes' : (view as NavTab)

  const goTab = (tab: NavTab) => setView(tab)

  return (
    // No bg-clay here: the body paints the base colour, and an opaque wrapper
    // would hide the ambient orbs the glass cards blur against.
    <div className="relative min-h-screen pb-28 md:pb-16">
      {/* Ambient glow for glass blur */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[15%] w-[55vw] h-[55vw] rounded-full bg-palm-oil/[0.06] blur-[130px]" />
        <div className="absolute top-[60%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-buka-red/[0.04] blur-[110px]" />
        <div className="absolute -bottom-[10%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-crayfish/[0.05] blur-[120px]" />
      </div>

      <Navbar
        onStart={() => setView('home')}
        ctaLabel="New search"
        items={[
          { label: 'Home', onClick: () => setView('home'), active: view === 'home' },
          { label: 'Recipes', onClick: () => setView('recipes'), active: view === 'recipes' || view === 'detail' },
          { label: 'Markets', onClick: () => setView('markets'), active: view === 'markets' },
          { label: 'History', onClick: () => setView('history'), active: view === 'history' },
          ...(onExit ? [{ label: 'Landing', onClick: onExit }] : []),
        ]}
      />

      <main className="relative z-10 px-5 pt-8 md:px-12 md:pt-28 lg:px-20 mx-auto max-w-6xl">
        {view === 'home' && (
          <section className="animate-fadeIn">
            <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-3">
              Your kitchen
            </p>
            <h1 className="font-playfair italic text-cream text-3xl md:text-5xl leading-tight">
              What do you have at home?
            </h1>
            <p className="font-dm text-sm md:text-base text-crayfish mt-3 max-w-xl">
              Add every ingredient you can see. Press enter or comma after each one. Chowcipe will
              work out five Nigerian dishes you can cook with them.
            </p>

            <div className="mt-8">
              <IngredientInput
                tags={ingredients}
                onAdd={addIngredient}
                onRemove={removeIngredient}
              />
            </div>

            <div className="mt-5">
              <p className="font-dm text-xs uppercase tracking-wide text-crayfish mb-3">
                Quick add
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_INGREDIENTS.slice(0, 12)
                  .filter((item) => !ingredients.includes(item))
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => addIngredient(item)}
                      className="glass-subtle font-dm text-xs text-crayfish rounded-full px-4 py-2 hover:border-palm-oil/50 hover:text-cream transition-colors"
                    >
                      + {item}
                    </button>
                  ))}
              </div>
            </div>

            <button
              onClick={handleFind}
              disabled={ingredients.length === 0 || loading}
              className="mt-8 w-full md:w-auto font-dm font-semibold bg-palm-oil text-clay rounded-full px-8 py-3.5 hover:bg-palm-oil/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Thinking...' : 'Find recipes'}
            </button>

            {recentMeals.length > 0 && (
              <p className="font-dm text-xs text-crayfish mt-4">
                Avoiding your recent meals: {recentMeals.join(', ')}
              </p>
            )}
          </section>
        )}

        {view === 'recipes' && (
          <section className="animate-fadeIn">
            <button
              onClick={() => setView('home')}
              className="font-dm text-sm text-crayfish hover:text-cream transition-colors"
            >
              ← Change ingredients
            </button>
            <h1 className="font-playfair italic text-cream text-3xl md:text-5xl mt-4">
              What you can cook
            </h1>
            <p className="font-dm text-sm text-crayfish mt-2">
              Based on: {ingredients.join(', ') || 'no ingredients yet'}
            </p>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="glass-card overflow-hidden animate-pulse">
                    <div className="h-40 bg-cream/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 w-1/3 bg-cream/5 rounded" />
                      <div className="h-5 w-2/3 bg-cream/10 rounded" />
                      <div className="h-3 w-full bg-cream/5 rounded" />
                      <div className="h-3 w-4/5 bg-cream/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="glass-card mt-8 border-buka-red/40 p-6">
                <p className="font-dm text-sm text-cream">{error}</p>
                <button
                  onClick={handleFind}
                  className="mt-4 font-dm text-sm font-semibold bg-palm-oil text-clay rounded-full px-6 py-2.5 hover:bg-palm-oil/90 transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && recipes.length === 0 && (
              <div className="glass-card mt-8 p-6">
                <p className="font-dm text-sm text-crayfish">
                  No recipes yet. Add your ingredients and tap Find recipes.
                </p>
                <button
                  onClick={() => setView('home')}
                  className="mt-4 font-dm text-sm font-semibold bg-palm-oil text-clay rounded-full px-6 py-2.5 hover:bg-palm-oil/90 transition-colors"
                >
                  Add ingredients
                </button>
              </div>
            )}

            {!loading && recipes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.name}
                    recipe={recipe}
                    onClick={() => openRecipe(recipe)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {view === 'detail' && selected && (
          <section className="animate-fadeIn max-w-3xl">
            <button
              onClick={() => setView('recipes')}
              className="font-dm text-sm text-crayfish hover:text-cream transition-colors"
            >
              ← Back to recipes
            </button>

            <p className="font-dm text-xs uppercase tracking-wide text-crayfish mt-5">
              {selected.tribe}
            </p>
            <h1 className="font-playfair italic text-cream text-3xl md:text-5xl mt-1">
              {selected.name}
            </h1>
            <p className="font-dm text-sm text-crayfish mt-3">{selected.whyCook}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 font-dm text-xs text-crayfish mt-4">
              <span className="border border-cream/10 rounded-full px-3 py-1.5">
                {selected.cookTime}
              </span>
              <span className="border border-cream/10 rounded-full px-3 py-1.5">
                {selected.servings}
              </span>
              <span className="border border-cream/10 rounded-full px-3 py-1.5">
                {selected.difficulty}
              </span>
            </div>

            <h2 className="font-dm font-semibold text-cream text-2xl mt-10 mb-4">You already have</h2>
            <div className="flex flex-wrap gap-2">
              {selected.availableIngredients?.length ? (
                selected.availableIngredients.map((item) => (
                  <span
                    key={item}
                    className="glass-subtle font-dm text-sm text-cream border-palm-oil/30 rounded-full px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="font-dm text-sm text-crayfish">Nothing listed for this dish.</span>
              )}
            </div>

            <h2 className="font-dm font-semibold text-cream text-2xl mt-10 mb-4">
              What you still need to buy
            </h2>
            {selected.missingIngredients?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selected.missingIngredients.map((item) => (
                  <div
                    key={`${item.local}-${item.common}`}
                    className="glass-card border-palm-oil/20 p-4"
                  >
                    <p className="font-dm font-semibold text-lg text-cream">{item.local}</p>
                    <p className="font-dm text-xs uppercase tracking-wide text-palm-oil mt-0.5">
                      {item.common}
                    </p>
                    <p className="font-dm text-sm text-crayfish mt-3">{item.quantity}</p>
                    <p className="font-dm text-sm text-cream/80 mt-1">{item.estimatedCost}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-dm text-sm text-crayfish">
                Nothing. You have everything this dish needs.
              </p>
            )}

            <h2 className="font-dm font-semibold text-cream text-2xl mt-10 mb-4">How to cook it</h2>
            <ol className="space-y-4">
              {selected.steps?.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-palm-oil text-clay font-dm text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="font-dm text-sm md:text-base text-cream/85 leading-relaxed pt-1.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {selected.tips && (
              <div className="glass-card mt-10 p-5">
                <p className="font-dm text-xs uppercase tracking-wide text-palm-oil mb-2">
                  Kitchen tip
                </p>
                <p className="font-dm text-sm text-cream/85 leading-relaxed">{selected.tips}</p>
              </div>
            )}

            <button
              onClick={() => {
                addMeal(selected.name)
                setView('history')
              }}
              className="mt-8 w-full md:w-auto font-dm font-semibold bg-palm-oil text-clay rounded-full px-8 py-3.5 hover:bg-palm-oil/90 transition-colors"
            >
              I cooked this
            </button>
          </section>
        )}

        {view === 'detail' && !selected && (
          <section className="animate-fadeIn">
            <p className="font-dm text-sm text-crayfish">No recipe selected.</p>
            <button
              onClick={() => setView('recipes')}
              className="mt-4 font-dm text-sm font-semibold bg-palm-oil text-clay rounded-full px-6 py-2.5"
            >
              Back to recipes
            </button>
          </section>
        )}

        {view === 'markets' && (
          <section className="animate-fadeIn max-w-3xl">
            <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-3">
              Market prices
            </p>
            <h1 className="font-playfair italic text-cream text-3xl md:text-5xl">
              What things cost today
            </h1>
            <p className="font-dm text-sm text-crayfish mt-3">
              Prices are community-sourced. Add what you paid so the next person plans better.
            </p>

            <form
              onSubmit={submitPrice}
              className="glass-card-strong mt-8 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label className="flex flex-col gap-2">
                <span className="font-dm text-xs uppercase tracking-wide text-crayfish">Item</span>
                <input
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  placeholder="Tomatoes"
                  className="bg-clay/30 border border-cream/10 rounded-xl px-4 py-2.5 font-dm text-sm text-cream outline-none placeholder:text-crayfish focus:border-palm-oil/50"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-dm text-xs uppercase tracking-wide text-crayfish">
                  Price (Naira)
                </span>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  inputMode="numeric"
                  placeholder="4500"
                  className="bg-clay/30 border border-cream/10 rounded-xl px-4 py-2.5 font-dm text-sm text-cream outline-none placeholder:text-crayfish focus:border-palm-oil/50"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-dm text-xs uppercase tracking-wide text-crayfish">
                  Quantity
                </span>
                <input
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="1 basket / 1 paint bucket"
                  className="bg-clay/30 border border-cream/10 rounded-xl px-4 py-2.5 font-dm text-sm text-cream outline-none placeholder:text-crayfish focus:border-palm-oil/50"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-dm text-xs uppercase tracking-wide text-crayfish">Market</span>
                <select
                  value={form.market}
                  onChange={(e) => setForm({ ...form, market: e.target.value })}
                  className="bg-clay/30 border border-cream/10 rounded-xl px-4 py-2.5 font-dm text-sm text-cream outline-none focus:border-palm-oil/50"
                >
                  {MARKETS.map((market) => (
                    <option key={market} value={market} className="bg-clay">
                      {market}
                    </option>
                  ))}
                </select>
              </label>

              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="submit"
                  className="font-dm font-semibold bg-palm-oil text-clay rounded-full px-8 py-3 hover:bg-palm-oil/90 transition-colors"
                >
                  Submit price
                </button>
                {formNote && <p className="font-dm text-xs text-crayfish">{formNote}</p>}
              </div>
            </form>

            <h2 className="font-dm font-semibold text-cream text-2xl mt-10 mb-4">
              Community submissions
            </h2>
            <ul className="space-y-3">
              {prices.map((entry) => (
                <li
                  key={entry.id}
                  className="glass-subtle p-4 flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-dm font-semibold text-lg text-cream">{entry.item}</p>
                    <p className="font-dm text-xs text-crayfish mt-1">
                      {entry.quantity} · {entry.market}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-dm text-base text-palm-oil">N{entry.price}</p>
                    <p className="font-dm text-xs text-crayfish mt-1">{entry.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {view === 'history' && (
          <section className="animate-fadeIn max-w-3xl">
            <p className="font-playfair text-xs uppercase tracking-widest text-crayfish mb-3">
              Meal history
            </p>
            <h1 className="font-playfair italic text-cream text-3xl md:text-5xl">
              What you have been eating
            </h1>
            <p className="font-dm text-sm text-crayfish mt-3">
              Chowcipe uses this list to keep your suggestions varied.
            </p>

            {history.length === 0 ? (
              <div className="glass-card mt-8 p-6">
                <p className="font-dm text-sm text-crayfish">
                  Nothing logged yet. Open a recipe and tap I cooked this.
                </p>
              </div>
            ) : (
              <>
                <ul className="mt-8 space-y-3">
                  {history.map((meal, i) => (
                    <li
                      key={`${meal.name}-${meal.date}-${i}`}
                      className="glass-subtle p-4 flex items-center justify-between gap-4"
                    >
                      <span className="font-dm font-semibold text-lg text-cream">{meal.name}</span>
                      <span className="font-dm text-xs text-crayfish">{meal.date}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={clearHistory}
                  className="mt-6 font-dm text-sm text-buka-red border border-buka-red/40 rounded-full px-6 py-2.5 hover:bg-buka-red/10 transition-colors"
                >
                  Clear history
                </button>
              </>
            )}
          </section>
        )}
      </main>

      <BottomNav active={navTab} onChange={goTab} />
    </div>
  )
}
