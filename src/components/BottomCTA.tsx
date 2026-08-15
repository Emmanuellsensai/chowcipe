interface BottomCTAProps {
  onStart?: () => void;
}

export default function BottomCTA({ onStart }: BottomCTAProps) {
  return (
    <section id="about" className="bg-palm-oil px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-playfair italic text-clay text-3xl md:text-5xl lg:text-6xl leading-tight">
          What is in your kitchen today?
        </h2>
        <p className="font-dm text-base md:text-lg text-clay/70 mt-4">
          Chowcipe turns whatever you already have into a Nigerian meal worth sitting down for.
        </p>
        <button
          onClick={onStart}
          className="mt-8 font-dm font-semibold bg-clay text-cream rounded-full px-8 py-3 hover:bg-clay/90 transition-colors"
        >
          Start cooking now
        </button>
      </div>
    </section>
  )
}
