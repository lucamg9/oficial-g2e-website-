import IntroSequence    from '@/components/sections/IntroSequence'
import WhoWeAreSection  from '@/components/sections/WhoWeAreSection'
import TimelineSection  from '@/components/sections/TimelineSection'
import ContactSection   from '@/components/sections/ContactSection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <WhoWeAreSection />
      <TimelineSection />
      <ContactSection />
      <ComingSoonSection />
    </>
  )
}
