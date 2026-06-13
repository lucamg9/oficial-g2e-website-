import HeroSection       from '@/components/sections/HeroSection'
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
      <HeroSection />
      <WhoWeAreSection />

      {/* Dark → Stone Ivory: WhoWeAreSection → TimelineSection */}
      <div aria-hidden="true" style={{
        height:       '160px',
        background:   'linear-gradient(to bottom, #2E372A 0%, #F4F2ED 100%)',
        marginTop:    '-1px',
        marginBottom: '-1px',
      }} />

      <TimelineSection />
      <Phase2Section />

      {/* Stone Ivory → Dark: Phase2Section → HowItWorksSection */}
      <div aria-hidden="true" style={{
        height:       '160px',
        background:   'linear-gradient(to bottom, #F4F2ED 0%, #2E372A 100%)',
        marginTop:    '-1px',
        marginBottom: '-1px',
      }} />

      <HowItWorksSection />
      <ContactSection />
    </>
  )
}
