import IntroSequence      from '@/components/sections/IntroSequence'
import WhoWeAreSection    from '@/components/sections/WhoWeAreSection'
import TimelineSection    from '@/components/sections/TimelineSection'
import HowItWorksSection  from '@/components/sections/HowItWorksSection'
import Phase2Section      from '@/components/sections/Phase2Section'
import ContactSection     from '@/components/sections/ContactSection'
import SectionNav         from '@/components/ui/SectionNav'

export default function HomePage() {
  return (
    <>
      <SectionNav />
      <IntroSequence />
      <WhoWeAreSection />

      {/* Dark → Cream: WhoWeAreSection → TimelineSection */}
      <div aria-hidden="true" style={{
        height:     '160px',
        background: 'linear-gradient(to bottom, #090C08 0%, #F6F2E8 100%)',
        marginTop:  '-1px',
        marginBottom: '-1px',
      }} />

      <TimelineSection />
      <Phase2Section />

      {/* Cream → Dark: Phase2Section → HowItWorksSection */}
      <div aria-hidden="true" style={{
        height:     '160px',
        background: 'linear-gradient(to bottom, #F6F2E8 0%, #0A0C0A 100%)',
        marginTop:  '-1px',
        marginBottom: '-1px',
      }} />

      <HowItWorksSection />
      <ContactSection />
    </>
  )
}
