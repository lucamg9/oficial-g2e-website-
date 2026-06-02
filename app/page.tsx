import IntroSequence    from '@/components/sections/IntroSequence'
import StorySequence    from '@/components/sections/StorySequence'
import TimelineSection  from '@/components/sections/TimelineSection'
import ContactSection   from '@/components/sections/ContactSection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <StorySequence />
      <TimelineSection />
      <ContactSection />
      <ComingSoonSection />
    </>
  )
}
