import { useEffect, useState } from 'react'

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface NavbarProps {
  onStart?: () => void;
  ctaLabel?: string;
  items?: NavItem[];
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Market Prices', href: '#features' },
  { label: 'About', href: '#about' },
]

export default function Navbar({ onStart, ctaLabel = 'Start cooking', items = DEFAULT_ITEMS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-12 lg:px-20 py-4 bg-clay/80 backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? 'border-b border-cream/10' : 'border-b border-transparent'
      }`}
    >
      <button
        onClick={onStart}
        className="font-playfair text-2xl text-palm-oil tracking-tight"
        aria-label="Chowcipe home"
      >
        Chowcipe
      </button>

      <nav className="flex items-center gap-8">
        {items.map((item) =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              className="font-dm text-sm text-cream/70 hover:text-cream transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`font-dm text-sm transition-colors ${
                item.active ? 'text-palm-oil' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {item.label}
            </button>
          )
        )}
        <button
          onClick={onStart}
          className="font-dm text-sm font-semibold bg-palm-oil text-clay rounded-full px-6 py-2.5 hover:bg-palm-oil/90 transition-colors"
        >
          {ctaLabel}
        </button>
      </nav>
    </header>
  )
}
