/* global React, SectionMarker, Icon */

function Process() {
  const steps = [
    { num: '01', icon: 'truck', title: 'Collect', body: 'Municipal organic waste — what your city already picks up, diverted from landfill.' },
    { num: '02', icon: 'flask', title: 'React', body: 'Hydrothermal carbonization: water, heat, pressure. No combustion. 4–6 hours.' },
    { num: '03', icon: 'factory', title: 'Refine', body: 'Hydrochar pellets. Carbon‑dense, stable, transportable. Spec‑graded per off‑taker.' },
    { num: '04', icon: 'bolt', title: 'Replace', body: 'Drop‑in for mineral coal in power generation, steel, and soil regeneration.' },
  ];

  return (
    <section className="section" id="process">
      <div className="container">
        <SectionMarker num="02" label="THE PROCESS" />
        <h2 className="section-title">
          Four steps from your bin to the grid, <em>without combustion.</em>
        </h2>

        <div className="process" style={{ marginTop: 'var(--space-7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div className="eyebrow">HYDROTHERMAL CARBONIZATION · HTC</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
              200 °C · 20 bar · 4–6 h
            </div>
          </div>
          <div className="process-steps">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="process-step">
                  <div className="process-num">[ {s.num} ]</div>
                  <div className="process-icon"><Icon name={s.icon} /></div>
                  <div className="process-title">{s.title}</div>
                  <div className="process-body">{s.body}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Process });
