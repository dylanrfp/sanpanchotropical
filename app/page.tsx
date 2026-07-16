import ScrollCanvas from '@/components/ScrollCanvas'

export default function Home() {
  return (
    <main className="min-h-screen bg-base-light">
      <ScrollCanvas />
      
      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-base-light/90 border-t border-sand-accent/20 z-50 flex justify-center backdrop-blur-md">
        <button className="w-full max-w-md bg-ocean-teal hover:bg-base-dark text-base-light font-sans font-semibold py-3.5 rounded-full transition-colors text-xs tracking-widest shadow-lg">
          BOOK NOW
        </button>
      </div>
    </main>
  )
}
