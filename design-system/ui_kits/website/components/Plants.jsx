/* global React, SectionMarker, PhotoFrame, Button, Icon */
const { useState } = React;

const PLANTS = [
  {
    id: 'merida',
    status: 'operating',
    eyebrow: 'YUC. · MX',
    title: 'Mérida',
    capacity: '450,000 t/yr',
    online: '2024',
    body: 'The world\'s largest hydrothermal carbonization plant for municipal organic waste. Operates in partnership with the Yucatán state government.',
    feature: true,
  },
  {
    id: 'monterrey',
    status: 'permitting',
    eyebrow: 'NL · MX',
    title: 'Monterrey',
    capacity: '320,000 t/yr',
    online: '2027 (target)',
    body: 'Industrial corridor siting; off‑take in principle with two steel mills.',
  },
  {
    id: 'guadalajara',
    status: 'permitting',
    eyebrow: 'JAL · MX',
    title: 'Guadalajara',
    capacity: '280,000 t/yr',
    online: '2027 (target)',
    body: 'Municipal MOU signed Q3 2025. Environmental impact review under way.',
  },
];

function PlantCard({ plant, onOpen }) {
  return (
    <div className={`plant-card ${plant.feature ? 'featured' : 'compact'}`} onClick={() => onOpen(plant)}>
      <PhotoFrame tag={`[ PLACEHOLDER · ${plant.title.toUpperCase()} ]`} style={{ width: '100%', height: '100%' }}>
        <div className="plant-overlay">
          <div className={`plant-status ${plant.status === 'permitting' ? 'permitting' : ''}`}>
            <span className="dot" />
            {plant.status === 'operating' ? 'OPERATING' : 'PERMITTING'}
          </div>
          <div className="plant-text">
            <div className="plant-eyebrow">{plant.eyebrow}</div>
            <div className="plant-title">{plant.title}</div>
            <div className="plant-meta">{plant.capacity} · ONLINE {plant.online}</div>
          </div>
        </div>
      </PhotoFrame>
    </div>
  );
}

function PlantDetail({ plant, onClose }) {
  if (!plant) return null;
  return (
    <div className={`overlay ${plant ? 'open' : ''}`} onClick={onClose}>
      <div className="overlay-card" onClick={e => e.stopPropagation()}>
        <PhotoFrame tag="[ PLACEHOLDER ]" caption={`${plant.title.toUpperCase()} · ${plant.eyebrow}`} status={plant.status} style={{ borderRadius: 0, height: '100%' }} />
        <div className="overlay-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className={`plant-status ${plant.status === 'permitting' ? 'permitting' : ''}`} style={{ position: 'static', color: 'var(--ink)', background: 'rgba(17,20,15,0.06)', borderColor: 'transparent' }}>
              <span className="dot" style={{ background: plant.status === 'operating' ? 'var(--moss-600)' : 'var(--ink-muted)', boxShadow: 'none' }} />
              {plant.status === 'operating' ? 'OPERATING' : 'PERMITTING'}
            </div>
            <button className="overlay-close" onClick={onClose} aria-label="Close">
              <Close />
            </button>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
            {plant.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink)' }}>{plant.body}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>CAPACITY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1 }}>{plant.capacity}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>ONLINE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1 }}>{plant.online}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <Button variant="dark">Plant brief (PDF)</Button>
            <Button variant="outline" icon="none">Visit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plants() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="plants">
      <div className="container">
        <SectionMarker num="03" label="OUR PLANTS" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-7)', alignItems: 'end', marginBottom: 'var(--space-7)' }}>
          <h2 className="section-title">
            Three facilities, <em>one continent of waste.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.55, maxWidth: 380 }}>
            Each plant is co‑located with a major municipal waste stream and a heavy
            industrial off‑taker. Click any card for site detail.
          </p>
        </div>

        <div className="plants">
          <PlantCard plant={PLANTS[0]} onOpen={setOpen} />
          <PlantCard plant={PLANTS[1]} onOpen={setOpen} />
          <PlantCard plant={PLANTS[2]} onOpen={setOpen} />
        </div>
      </div>
      <PlantDetail plant={open} onClose={() => setOpen(null)} />
    </section>
  );
}

Object.assign(window, { Plants });
