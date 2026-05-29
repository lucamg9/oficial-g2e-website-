/* global React */
// G2E primitives — Button, Pill, Tag, IconChip, SectionMarker, Eyebrow.
// Composed across all sections.

const ArrowUpRight = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Plus = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
);

const Close = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

// Lucide-style icons used across the site
const Icons = {
  flask: <path d="M10 2v8L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45L14 10V2" />,
  flaskBar: <path d="M8.5 2h7M7 16h10" />,
  truck: (
    <g>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
    </g>
  ),
  factory: (
    <g>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" />
    </g>
  ),
  leaf: (
    <g>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </g>
  ),
  bolt: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  recycle: (
    <g>
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </g>
  ),
  mapPin: (
    <g>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </g>
  ),
  microscope: (
    <g>
      <path d="M6 18h8" /><path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </g>
  ),
};

const Icon = ({ name, size = 22, stroke = 1.5, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {Icons[name]}
  </svg>
);

const Button = ({ variant = 'primary', children, icon = 'arrow', onClick }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {children}
    {icon === 'arrow' && <ArrowUpRight />}
    {icon === 'plus' && <Plus />}
    {icon === 'none' && null}
  </button>
);

const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

const SectionMarker = ({ num, label }) => (
  <div className="section-marker">
    <span className="num">[ {num} ]</span>
    <span className="label">{label}</span>
    <span className="rule" />
  </div>
);

const Pill = ({ children, dark }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 14px',
    border: `1px solid ${dark ? 'rgba(242,239,231,0.22)' : 'var(--line-strong)'}`,
    color: dark ? 'var(--bone-100)' : 'var(--ink)',
    borderRadius: 999,
    fontSize: 13,
  }}>{children}</span>
);

Object.assign(window, {
  ArrowUpRight, Plus, Close, Icon,
  Button, Eyebrow, SectionMarker, Pill,
});
