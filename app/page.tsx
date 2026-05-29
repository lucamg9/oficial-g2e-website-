import IntroSequence    from '@/components/sections/IntroSequence'
import HeroSection      from '@/components/sections/HeroSection'
import StorySequence    from '@/components/sections/StorySequence'
import ContactSection   from '@/components/sections/ContactSection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <HeroSection />
      <StorySequence />
      <ContactSection />
      <ComingSoonSection />
    </>
  )
}
