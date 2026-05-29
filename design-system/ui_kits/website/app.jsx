/* global React, ReactDOM,
   Nav, Hero, Process, Plants, Stats, Partners, PressPullQuote, CTAPanel, Footer, ArrowUpRight */

const { useState, useEffect } = React;

function ContactFab() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`contact-fab ${visible ? 'visible' : ''}`} href="#contact">
      Get in touch
      <ArrowUpRight />
    </a>
  );
}

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Process />
      <Plants />
      <Stats />
      <Partners />
      <PressPullQuote />
      <CTAPanel />
      <Footer />
      <ContactFab />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
