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
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const text = data.candidates[0].content.parts[0].text
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed: Recipe[] = JSON.parse(clean)
      setRecipes(parsed)
    } catch {
      setError('Could not load recipes. Please try again.')
    }
    setLoading(false)
  }

  return { recipes, loading, error, fetchRecipes }
}
