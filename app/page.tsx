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

      {/* Dark → Cream: WhoWeAreSection → TimelineSection */}
      <div aria-hidden="true" style={{
        height:     '160px',
        background: 'linear-gradient(to bottom, #090C08 0%, #F6F2E8 100%)',
        marginTop:  '-1px',
        marginBottom: '-1px',
      }} />

      <TimelineSection />

      {/* Cream → Dark: TimelineSection → HowItWorksSection */}
      <div aria-hidden="true" style={{
        height:     '160px',
        background: 'linear-gradient(to bottom, #F6F2E8 0%, #0A0C0A 100%)',
        marginTop:  '-1px',
        marginBottom: '-1px',
      }} />

      <HowItWorksSection />

      {/* Dark → Cream: HowItWorksSection → Phase2Section */}
      <div aria-hidden="true" style={{
        height:     '160px',
        background: 'linear-gradient(to bottom, #0A0C0A 0%, #F6F2E8 100%)',
        marginTop:  '-1px',
        marginBottom: '-1px',
      }} />

      <Phase2Section />
      <ContactSection />
    </>
  )
}
