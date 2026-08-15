import { useState, useEffect } from 'react'
import { MealHistory } from '../types'

export function useMealHistory() {
  const [history, setHistory] = useState<MealHistory[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chowcipe_history')
      if (saved) setHistory(JSON.parse(saved))
    } catch {}
  }, [])

  const addMeal = (name: string) => {
    const entry: MealHistory = { name, date: new Date().toLocaleDateString('en-NG') }
    const updated = [entry, ...history].slice(0, 30)
    setHistory(updated)
    try { localStorage.setItem('chowcipe_history', JSON.stringify(updated)) } catch {}
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('chowcipe_history')
  }

  return { history, addMeal, clearHistory }
}
