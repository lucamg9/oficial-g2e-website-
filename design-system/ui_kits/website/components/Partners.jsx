/* global React, SectionMarker */

const PARTNERS = [
  'UNAM',
  'SEMARNAT',
  'IDB Invest',
  'CFE',
  'AHMSA',
  'Pemex',
  'BANOBRAS',
  'TEC de Monterrey',
  'World Bank',
  'EU Climate',
  'Ternium',
  'ArcelorMittal',
];

function Partners() {
  return (
    <section className="section" id="partners">
      <div className="container">
        <SectionMarker num="05" label="PARTNERS & OFF‑TAKERS" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-7)', alignItems: 'end', marginBottom: 'var(--space-7)' }}>
          <h2 className="section-title">
            Built with public science, deployed with public capital, <em>off‑taken by industry.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.55, maxWidth: 380 }}>
            G2E is not a research project. It is operating infrastructure, financed by
            named institutions and shipping product to named customers.
          </p>
        </div>
        <div className="partners">
          {PARTNERS.map(p => (
            <div className="partner" key={p}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Partners });
