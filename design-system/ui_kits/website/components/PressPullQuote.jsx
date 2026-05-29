/* global React */

function PressPullQuote() {
  return (
    <section className="section">
      <div className="container">
        <div className="pullquote">
          <div>
            <div className="pullquote-eyebrow">[ 06 ] &nbsp; IN THE PRESS</div>
            <div style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', color: 'rgba(242,239,231,0.6)' }}>NATURE · 2025</div>
          </div>
          <div>
            <p className="pullquote-text">
              "G2E's Mérida facility is the first plant in the world to demonstrate
              hydrothermal carbonization of municipal organic waste at <em>continental
              scale.</em>"
            </p>
            <div className="pullquote-attrib">
              — Nature, "Hydrochar at scale," September 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PressPullQuote });
