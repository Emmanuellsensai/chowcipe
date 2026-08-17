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
    // No bg-clay here: the body paints the base colour, and an opaque wrapper
    // would hide the ambient orbs the glass cards blur against.
    <div className="relative min-h-screen">
      {/* Ambient glow for glass blur */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-palm-oil/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-buka-red/[0.05] blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-palm-oil/[0.04] blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar onStart={onStart} />
        <Hero onStart={onStart} />
        <HowItWorks />
        <Features />
        <BottomCTA onStart={onStart} />
      <footer className="px-6 py-10 md:px-12 lg:px-20 border-t border-cream/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-dm font-semibold text-palm-oil text-xl">Chowcipe</span>
          <p className="font-dm text-xs text-crayfish">
            Built for WEMA Hackaholics 7.0. Cook what you already have.
          </p>
        </div>
      </footer>
      </div>
    </div>
  )
}
