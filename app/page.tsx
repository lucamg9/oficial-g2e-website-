import IntroSequence    from '@/components/sections/IntroSequence'
import HeroSection      from '@/components/sections/HeroSection'
import WhoWeAreSection  from '@/components/sections/WhoWeAreSection'
import ProcessSection   from '@/components/sections/ProcessSection'
import ProductsSection  from '@/components/sections/ProductsSection'
import ScaleSection     from '@/components/sections/ScaleSection'
import ContactSection   from '@/components/sections/ContactSection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <HeroSection />
      <WhoWeAreSection />
      <ProcessSection />
      <ProductsSection />
      <ScaleSection />
      <ContactSection />
      <ComingSoonSection />
    </>
  )
}
