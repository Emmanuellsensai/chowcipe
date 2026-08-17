import { useState } from 'react'
import { Recipe } from '../types'
import { matchDishes, isKnownDish, NIGERIAN_DISHES } from '../data/nigerianDishes'

/**
 * Build a tightly constrained prompt that:
 *  1. Lists the exact dishes the user's ingredients match
 *  2. Lets the AI pick 5 from that list (not invent new ones)
 *  3. Falls back to a broader but still constrained set if <5 match
 *  4. Demands exact quantities and Nigerian-specific instructions
 */
function buildPrompt(ingredients: string[], recentMeals: string[]): string {
  const matched = matchDishes(ingredients)
  const matchedNames = matched.map((d) => d.name)

  // If we have fewer than 8 direct matches, pad with popular dishes
  // that could plausibly use at least one of the user's ingredients
  let candidateNames = [...matchedNames]
  if (candidateNames.length < 8) {
    const fallbacks = NIGERIAN_DISHES
      .filter((d) => !candidateNames.includes(d.name))
      .slice(0, 20)
      .map((d) => d.name)
    candidateNames = [...candidateNames, ...fallbacks].slice(0, 25)
  }

  const recentClause = recentMeals.length > 0
    ? `The user recently ate: ${recentMeals.join(', ')}. Deprioritise these dishes to encourage variety, but you may still include one if nothing else fits well.`
    : ''

  return `You are a Nigerian home cook and food historian. You know every dish from Yoruba, Igbo, Hausa, Delta, Edo, Efik, Ibibio, Calabar, Tiv, and general Nigerian cooking. You NEVER invent dishes that do not exist in real Nigerian food culture.

The user has these ingredients at home: ${ingredients.join(', ')}.

${recentClause}

CANDIDATE DISHES (pick from this list first):
${candidateNames.join(', ')}

CRITICAL: Every candidate dish above has been pre-filtered so the user has its essential ingredients. Do NOT suggest any dish whose primary ingredient the user does not have. For example, do not suggest any rice dish if the user has no rice, do not suggest any beans dish if the user has no beans, do not suggest any yam dish if the user has no yam. The user's ingredients are the hard constraint.

RULES:
1. Suggest exactly 5 dishes. Pick from the candidate list above whenever possible. If a dish from the list is a poor fit for the ingredients, skip it.
2. You may suggest a dish NOT on the list ONLY if it is a widely known, authentic Nigerian dish that genuinely exists and the user's ingredients strongly support it. Do NOT invent fusion dishes, do NOT combine two dishes into one (no "Egusi Yam Porridge"), and do NOT create Western dishes with Nigerian names.
3. Every dish must be something a Nigerian grandmother, a buka, or a named ethnic cuisine would recognise.
4. For each dish, list ONLY the user's ingredients that are actually used in that dish under availableIngredients. Do not list ingredients the user has but the dish does not use.
5. For missingIngredients, list everything else the dish needs with the local Nigerian name, the common English name, the exact quantity needed for the servings, and an estimated cost in Naira at a Lagos market in 2026.
6. For every cooking step, include EXACT quantities: tablespoons, teaspoons, cups, pieces, grams, litres, or Nigerian market units (paint bucket, cigarette cup, mudu, derica, wraps). NEVER say "add some", "a little", "pepper to taste", or "season to taste" without a starting quantity.
7. Steps must be detailed enough for a university student cooking for the first time. Include water quantities, heat levels (low/medium/high), and timing.
8. cookTime should be realistic. Do not say 15 minutes for a dish that takes 45.
9. difficulty: Easy (under 30 min, few steps), Medium (30-60 min or multiple components), Hard (over 60 min or requires special technique).
10. tribe must be the actual ethnic origin. Use "General Nigerian" only for dishes genuinely eaten across all regions.
11. tips should be a specific, practical Nigerian kitchen tip, not generic advice.

Respond ONLY with a valid JSON array. No markdown, no explanation, no backticks. Raw JSON:

[
  {
    "name": "Exact traditional dish name",
    "tribe": "Yoruba / Igbo / Hausa / Delta / Edo / Efik/Ibibio / Calabar / General Nigerian",
    "cookTime": "45 minutes",
    "difficulty": "Easy",
    "availableIngredients": ["only ingredients the user has AND this dish uses"],
    "missingIngredients": [
      {
        "local": "Ede",
        "common": "Cocoyam",
        "quantity": "500g (about 3 medium tubers)",
        "estimatedCost": "N400 to N600 per wrap"
      }
    ],
    "whyCook": "One sentence explaining why this dish is a good match for what the user has",
    "steps": [
      "Step 1: Detailed instruction with exact quantities and timing",
      "Step 2: Next instruction with heat level and water amount"
    ],
    "tips": "One specific Nigerian kitchen tip",
    "servings": "4 to 6 people"
  }
]`
}

/**
 * Validate and clean AI-generated recipes:
 *  - Remove any dish whose name is not a known Nigerian dish
 *  - Remove duplicates
 *  - Ensure required fields exist
 */
function validateRecipes(raw: Recipe[], userIngredients: string[]): Recipe[] {
  const seen = new Set<string>()
  const validated: Recipe[] = []

  for (const recipe of raw) {
    // Skip if missing required fields
    if (!recipe.name || !recipe.steps || recipe.steps.length === 0) continue

    // Skip duplicates
    const key = recipe.name.toLowerCase().trim()
    if (seen.has(key)) continue
    seen.add(key)

    // Check against known dish registry
    if (!isKnownDish(recipe.name)) {
      console.warn(`[Chowcipe] Filtered out unknown dish: "${recipe.name}"`)
      continue
    }

    // Sanitise availableIngredients: only keep ones the user actually entered
    const lowerUserIngredients = userIngredients.map((i) => i.toLowerCase())
    recipe.availableIngredients = (recipe.availableIngredients || []).filter((ai) =>
      lowerUserIngredients.some(
        (ui) => ui.includes(ai.toLowerCase()) || ai.toLowerCase().includes(ui)
      )
    )

    // Default missing fields
    if (!recipe.difficulty) recipe.difficulty = 'Medium'
    if (!recipe.tribe) recipe.tribe = 'General Nigerian'
    if (!recipe.servings) recipe.servings = '4 to 6 people'
    if (!recipe.cookTime) recipe.cookTime = '30 to 45 minutes'

    validated.push(recipe)
  }

  return validated
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRecipes = async (ingredients: string[], recentMeals: string[]) => {
    setLoading(true)
    setError('')
    setRecipes([])

    const cacheKey = 'chowcipe_recipes_' + [...ingredients].sort().join(',')

    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const parsed = JSON.parse(cached) as Recipe[]
        // Re-validate cached recipes too (registry may have updated)
        const valid = validateRecipes(parsed, ingredients)
        if (valid.length >= 3) {
          setRecipes(valid)
          setLoading(false)
          return
        }
        // If too many got filtered, re-fetch
        localStorage.removeItem(cacheKey)
      }
    } catch {}

    const prompt = buildPrompt(ingredients, recentMeals)

    try {
      const isDev = import.meta.env.DEV

      let responseData

      if (isDev) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 8000,
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
          }
        )
        responseData = await res.json()
      } else {
        const res = await fetch('/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        })
        responseData = await res.json()
      }

      if (responseData.error) throw new Error(responseData.error.message)
      const text = responseData.candidates[0].content.parts[0].text
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed: Recipe[] = JSON.parse(clean)

      // Validate against the dish registry
      const validated = validateRecipes(parsed, ingredients)

      if (validated.length === 0) {
        setError('Could not find matching Nigerian dishes for those ingredients. Try adding more items.')
      } else {
        setRecipes(validated)
        try {
          localStorage.setItem(cacheKey, JSON.stringify(validated))
          localStorage.setItem('chowcipe_last_recipes', JSON.stringify(validated))
        } catch {}
      }
    } catch {
      setError('Could not load recipes. Please try again.')
    }
    setLoading(false)
  }

  return { recipes, loading, error, fetchRecipes }
}
