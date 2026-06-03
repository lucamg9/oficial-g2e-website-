import IntroSequence      from '@/components/sections/IntroSequence'
import WhoWeAreSection    from '@/components/sections/WhoWeAreSection'
import TimelineSection    from '@/components/sections/TimelineSection'
import HowItWorksSection  from '@/components/sections/HowItWorksSection'
import Phase2Section      from '@/components/sections/Phase2Section'
import ContactSection     from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <WhoWeAreSection />
      <TimelineSection />
      <HowItWorksSection />
      <Phase2Section />
      <ContactSection />
    </>
  )
}
