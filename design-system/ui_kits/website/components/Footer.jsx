/* global React */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-display">
              g2e<span style={{ color: 'var(--bone-100)', opacity: 0.6 }}>.</span>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(242,239,231,0.7)', maxWidth: 320, lineHeight: 1.5 }}>
              Waste, transmuted. We turn municipal organic waste into hydrochar
              and deliver it to the industries that need a path off coal.
            </div>
          </div>
          <div>
            <div className="footer-tag">Process</div>
            <a className="footer-link" href="#">How HTC works</a>
            <a className="footer-link" href="#">Hydrochar spec</a>
            <a className="footer-link" href="#">Lifecycle analysis</a>
            <a className="footer-link" href="#">White papers</a>
          </div>
          <div>
            <div className="footer-tag">Company</div>
            <a className="footer-link" href="#">Plants</a>
            <a className="footer-link" href="#">Partners</a>
            <a className="footer-link" href="#">Press</a>
            <a className="footer-link" href="#">Careers</a>
          </div>
          <div>
            <div className="footer-tag">Contact</div>
            <a className="footer-link" href="#">hola@g2e.mx</a>
            <a className="footer-link" href="#">CDMX, México</a>
            <a className="footer-link" href="#">+52 55 0000 0000</a>
            <a className="footer-link" href="#" style={{ marginTop: 12, textDecoration: 'underline', textUnderlineOffset: 4 }}>Press kit ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 G2E · GREEN TO ENERGY S.A. DE C.V.</span>
          <span>EST. 2019 · CDMX</span>
          <span>ES · EN</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
