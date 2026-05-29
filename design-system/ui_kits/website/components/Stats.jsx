/* global React, SectionMarker */

function Stats() {
  const data = [
    { num: '1.2M', label: 'tonnes of organic waste processed annually' },
    { num: '78%', label: 'reduction in CO₂e vs landfill baseline' },
    { num: '99.4%', label: 'plant uptime, trailing 12 months' },
    { num: '4', label: 'signed off‑take agreements with state utilities' },
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionMarker num="04" label="BY THE NUMBERS" />
        <div className="stats">
          {data.map(d => (
            <div className="stat" key={d.label}>
              <div className="stat-num">{d.num}</div>
              <div className="stat-label">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Stats });
