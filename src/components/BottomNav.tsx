export type NavTab = 'home' | 'recipes' | 'markets' | 'history'

interface BottomNavProps {
  active: NavTab;
  onChange: (tab: NavTab) => void;
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  )
}

function BowlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z" />
      <path d="M7 11a5 5 0 0 1 10 0" />
      <path d="M12 3v3" />
    </svg>
  )
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 12.5 12 21l-9-9V3h9l8.5 8.5a1.4 1.4 0 0 1 0 1Z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

const TABS: { key: NavTab; label: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'recipes', label: 'Recipes', Icon: BowlIcon },
  { key: 'markets', label: 'Markets', Icon: TagIcon },
  { key: 'history', label: 'History', Icon: ClockIcon },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="glass-nav md:hidden fixed bottom-0 left-0 right-0 z-50 pb-4 pt-2 px-2">
      <ul className="flex items-stretch justify-around">
        {TABS.map(({ key, label, Icon }) => {
          const isActive = active === key
          return (
            <li key={key} className="flex-1">
              <button
                onClick={() => onChange(key)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors ${
                  isActive ? 'text-palm-oil' : 'text-crayfish/50'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="font-dm text-[11px] tracking-wide">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
