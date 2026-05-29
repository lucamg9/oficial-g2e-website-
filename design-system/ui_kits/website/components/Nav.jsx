/* global React */
const { useState, useEffect } = React;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-brand">
          <span className="nav-disc">g</span>
          <span className="nav-word">g2e</span>
        </a>
        <nav className="nav-links">
          <a className="nav-link active" href="#process">Process</a>
          <a className="nav-link" href="#plants">Plants</a>
          <a className="nav-link" href="#partners">Partners</a>
          <a className="nav-link" href="#science">Science</a>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
            color: 'var(--ink-muted)',
          }}>ES · EN</span>
          <Button variant="dark" icon="arrow">Contact</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav });
