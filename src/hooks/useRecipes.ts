import { useState } from 'react'
import { Recipe } from '../types'

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
        setRecipes(JSON.parse(cached))
        setLoading(false)
        return
      }
    } catch {}

    const prompt = `You are an expert Nigerian food chef and nutritionist. The user has these ingredients at home: ${ingredients.join(', ')}.

${recentMeals.length > 0 ? `They have recently eaten: ${recentMeals.join(', ')}. Avoid suggesting these if possible to encourage variety.` : ''}

Suggest exactly 5 Nigerian dishes they can make. For every single cooking step, include EXACT quantities using standard measurements: tablespoons, teaspoons, cups, pieces, grams, or Nigerian market units like paint bucket, cigarette cup, or wraps. Never say "add some" or "add pepper" without a quantity.

Respond ONLY with a valid JSON array. No markdown, no explanation, no backticks. Raw JSON only:

[
  {
    "name": "Dish name",
    "tribe": "Yoruba / Igbo / Hausa / Delta / General Nigerian",
    "cookTime": "45 minutes",
    "difficulty": "Easy",
    "availableIngredients": ["ingredient1"],
    "missingIngredients": [
      {
        "local": "Ede",
        "common": "Cocoyam",
        "quantity": "500g (about 3 medium pieces)",
        "estimatedCost": "approximately N400 to N600 per wrap"
      }
    ],
    "whyCook": "One sentence on why this is perfect today",
    "steps": [
      "Step 1: Wash 2 cups of beans thoroughly, then soak in cold water for 2 hours or overnight to reduce bloating and cut cooking time",
      "Step 2: Drain the soaked beans and blend coarsely with 1 medium onion and 3 scotch bonnet peppers using minimal water"
    ],
    "tips": "One specific Nigerian kitchen tip with exact details",
    "servings": "4 to 6 people"
  }
]`

    try {
      const isDev = import.meta.env.DEV

      let responseData

      if (isDev) {
        // Call Gemini directly in development (no serverless functions under `npm run dev`)
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8000,
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
          }
        )
        responseData = await res.json()
      } else {
        // Use serverless proxy in production to protect the key
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
      setRecipes(parsed)
      try {
        localStorage.setItem(cacheKey, JSON.stringify(parsed))
        localStorage.setItem('chowcipe_last_recipes', JSON.stringify(parsed))
      } catch {}
    } catch {
      setError('Could not load recipes. Please try again.')
    }
    setLoading(false)
  }

  return { recipes, loading, error, fetchRecipes }
}
