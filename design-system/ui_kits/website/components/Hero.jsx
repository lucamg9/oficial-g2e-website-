/* global React, PhotoFrame, Button, Eyebrow */

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <Eyebrow>[ 01 ] &nbsp; FROM LANDFILL TO MEGAWATT</Eyebrow>
            <h1 className="hero-headline">
              Waste,<br /><em>transmuted.</em>
            </h1>
            <p className="hero-dek">
              We process the organic waste your city already collects, and
              return it as <strong style={{ fontWeight: 500 }}>hydrochar</strong> —
              a drop‑in replacement for mineral coal, a soil amendment for
              depleted farmland, and a decarbonization input for steel.
            </p>
            <div className="hero-actions">
              <Button variant="primary">Read the white paper</Button>
              <Button variant="outline">Tour the Mérida plant</Button>
            </div>
            <div className="hero-meta">
              <span>EST. 2019 · CDMX</span>
              <span>PARTNERS · UNAM · SEMARNAT · IDB</span>
            </div>
          </div>
          <PhotoFrame
            tag="[ PLACEHOLDER PHOTO ]"
            caption="Mérida · Plant 01"
            status="operating"
            style={{ height: 540 }}
          />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
