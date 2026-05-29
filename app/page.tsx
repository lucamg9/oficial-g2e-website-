import IntroSequence    from '@/components/sections/IntroSequence'
import HeroSection      from '@/components/sections/HeroSection'
import StorySequence    from '@/components/sections/StorySequence'
import WhoWeAreSection  from '@/components/sections/WhoWeAreSection'
import ProcessSection   from '@/components/sections/ProcessSection'
import ProductsSection  from '@/components/sections/ProductsSection'
import ScaleSection     from '@/components/sections/ScaleSection'
import ContactSection   from '@/components/sections/ContactSection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'

export default function HomePage() {
  return (
    <>
      {/* ── Cinematic scroll intro — 6 acts, 688 frames ─────────────── */}
      <IntroSequence />

      {/* ── Hero — company statement + glass stats ───────────────────── */}
      <HeroSection />

      {/* ── Story sequence — 4 chapters, 480 frames, scroll-driven ───── */}
      <StorySequence />

      {/* ── Deep-dive sections — in story chapter order ──────────────── */}
      {/* Chapter 1 → Who We Are  */}
      <WhoWeAreSection />
      {/* Chapter 2 → The Process  */}
      <ProcessSection />
      {/* Chapter 3 → The Products */}
      <ProductsSection />
      {/* Chapter 4 → The Vision   */}
      <ScaleSection />

      {/* ── Contact + Coming Soon ────────────────────────────────────── */}
      <ContactSection />
      <ComingSoonSection />
    </>
  )
}
