import { useMemo, useRef, useState } from 'react'
import { SAMPLE_INGREDIENTS } from '../data/dishes'

interface IngredientInputProps {
  tags: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function IngredientInput({ tags, onAdd, onRemove }: IngredientInputProps) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase()
    if (!query) return []
    return SAMPLE_INGREDIENTS.filter(
      (item) => item.includes(query) && !tags.includes(item)
    ).slice(0, 6)
  }, [value, tags])

  const commit = (raw: string) => {
    const clean = raw.trim().toLowerCase().replace(/,+$/, '')
    if (!clean) return
    if (!tags.includes(clean)) onAdd(clean)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit(value)
      return
    }
    if (e.key === 'Backspace' && !value && tags.length > 0) {
      onRemove(tags[tags.length - 1])
    }
  }

  return (
    <div className="relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className="bg-clay-card rounded-2xl border border-cream/10 p-4 cursor-text"
      >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 bg-clay border border-palm-oil/30 text-cream rounded-full pl-3 pr-2 py-1.5 font-dm text-sm"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(tag)
                }}
                className="text-crayfish hover:text-buka-red transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 120)}
            placeholder={tags.length ? 'Add another ingredient' : 'tomatoes, onions, palm oil...'}
            className="flex-1 min-w-[12rem] bg-transparent font-dm text-cream text-sm outline-none placeholder:text-crayfish py-1.5"
          />
        </div>
      </div>

      {focused && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden bg-clay-card border border-cream/10 rounded-xl">
          {suggestions.map((item) => (
            <li key={item}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  commit(item)
                  inputRef.current?.focus()
                }}
                className="w-full text-left font-dm text-sm text-cream px-4 py-2.5 hover:bg-clay transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
