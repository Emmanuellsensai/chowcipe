import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import BottomCTA from '../components/BottomCTA'

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-clay">
      <Navbar onStart={onStart} />
      <Hero onStart={onStart} />
      <HowItWorks />
      <Features />
      <BottomCTA onStart={onStart} />
      <footer className="bg-clay px-6 py-10 md:px-12 lg:px-20 border-t border-cream/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-dm font-semibold text-palm-oil text-xl">Chowcipe</span>
          <p className="font-dm text-xs text-crayfish">
            Built for WEMA Hackaholics 7.0. Cook what you already have.
          </p>
        </div>
      </footer>
    </div>
  )
}
