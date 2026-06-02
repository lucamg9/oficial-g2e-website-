'use client'

import { useState } from 'react'

/* ─── Expandable card definitions ─────────────────────────────────────── */
const CARDS = [
  {
    id:      'info',
    label:   'Info',
    icon:    '◎',
    summary: 'What we are and what we do.',
    body:    'G2E turns organic waste into hydrochar — a mineral-grade carbon material that replaces coal, regenerates farmland soil, and decarbonizes the steel industry. We operate the world\'s largest hydrothermal carbonization plant processing municipal organic waste at Bordo Poniente, Mexico City.',
  },
  {
    id:      'goals',
    label:   'Goals',
    icon:    '◈',
    summary: 'Where we are going.',
    body:    'Decarbonize Mexican industry and cities through scalable waste-to-value technology. Replace mineral coal. Regenerate farmland soil. Generate premium technology-based carbon credits. Phase II targets 10 new modules in 2027 and a long-term vision of 170 replicable plants worldwide.',
  },
  {
    id:      'values',
    label:   'Values',
    icon:    '◇',
    summary: 'What drives every decision.',
    body:    'Community roots, scientific rigor, and real-world impact. We built this from an NGO in Oaxaca — not a lab. Every decision is grounded in partnership, transparency, and the conviction that technology must reach the people who need it most — not just the cities that can afford it.',
  },
  {
    id:      'allies',
    label:   'Allies',
    icon:    '◉',
    summary: 'Who we work with.',
    body:    'UNAM Institute of Engineering · Gobierno de México · SEMARNAT · Government of Mexico City · COLPOS · CIMMYT · SADER · International clean-tech partners. Science, policy, and agriculture — aligned around one mission.',
  },
]

export default function WhoWeAreSection() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (id: string) => setOpen(prev => prev === id ? null : id)

  return (
    <section
      id="about"
      aria-label="Who we are"
      style={{
        background:     'var(--bg)',
        paddingTop:     'clamp(80px, 10vw, 140px)',
        paddingBottom:  'clamp(80px, 10vw, 140px)',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      <div className="g2e-container">
        <div
          style={{
            display:    'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:        'clamp(48px, 6vw, 96px)',
            alignItems: 'start',
          }}
        >

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color:         'var(--ink-muted)',
              }}>
                Who we are
              </span>
              <div style={{ height: '1px', width: '32px', background: 'var(--line-strong)' }} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(2.2rem, 4vw, 3.8rem)',
              lineHeight:    0.95,
              letterSpacing: '-0.03em',
              color:         'var(--ink)',
              marginBottom:  '28px',
            }}>
              We turn waste<br />
              <span style={{ color: 'var(--forest-mid)' }}>into value.</span>
            </h2>

            {/* Body */}
            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     'var(--text-lg)',
              lineHeight:   'var(--lh-loose)',
              color:        'var(--ink)',
              marginBottom: '16px',
              maxWidth:     '480px',
            }}>
              We&apos;re a Mexican technology company that takes what cities throw away — the organic waste that today releases greenhouse gases in landfills — and transforms it into hydrochar.
            </p>

            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     'var(--text-md)',
              lineHeight:   'var(--lh-loose)',
              color:        'var(--ink-muted)',
              marginBottom: '40px',
              maxWidth:     '460px',
            }}>
              We work alongside UNAM, the Mexican Government, and international partners so this technology doesn&apos;t stay in a lab — it reaches every city that needs it. Today we operate the world&apos;s largest hydrothermal carbonization plant processing municipal organic waste.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '10px',
                  fontFamily:     'var(--font-sans)',
                  fontSize:       '14px',
                  fontWeight:     500,
                  background:     'var(--bg-dark)',
                  color:          'var(--bone-100)',
                  padding:        '13px 22px',
                  borderRadius:   '999px',
                  textDecoration: 'none',
                  border:         'none',
                  transition:     'background 200ms var(--ease-expo)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--hc-700)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-dark)')}
              >
                Contact us
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                </svg>
              </a>

              <a
                href="#timeline"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  fontFamily:     'var(--font-sans)',
                  fontSize:       '14px',
                  fontWeight:     400,
                  color:          'var(--ink-muted)',
                  padding:        '12px 20px',
                  borderRadius:   '999px',
                  border:         '1px solid var(--line-strong)',
                  textDecoration: 'none',
                  transition:     'border-color 200ms, color 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--ink)'
                  e.currentTarget.style.color = 'var(--ink)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--line-strong)'
                  e.currentTarget.style.color = 'var(--ink-muted)'
                }}
              >
                Our story
              </a>
            </div>

          </div>

          {/* ── RIGHT COLUMN — 2×2 expandable cards ─────────────────── */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '12px',
            }}
          >
            {CARDS.map((card) => {
              const isOpen = open === card.id
              return (
                <button
                  key={card.id}
                  onClick={() => toggle(card.id)}
                  aria-expanded={isOpen}
                  style={{
                    all:            'unset',
                    display:        'flex',
                    flexDirection:  'column',
                    cursor:         'pointer',
                    background:     isOpen ? 'var(--bg-dark)' : 'rgba(20,19,15,0.04)',
                    border:         isOpen
                                      ? '1px solid var(--bg-dark)'
                                      : '1px solid rgba(20,19,15,0.10)',
                    borderRadius:   'var(--radius-2xl)',
                    padding:        '24px',
                    transition:     'background 280ms var(--ease-expo), border-color 280ms var(--ease-expo)',
                    textAlign:      'left',
                    minHeight:      '160px',
                  }}
                >
                  {/* Card header — always visible */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>

                    {/* Icon + expand indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize:   '20px',
                        lineHeight:  1,
                        color:       isOpen ? 'rgba(245,243,238,0.70)' : 'var(--forest-mid)',
                        transition:  'color 280ms',
                      }}>
                        {card.icon}
                      </span>
                      <div style={{
                        width:        '20px',
                        height:       '20px',
                        borderRadius: '50%',
                        border:       `1px solid ${isOpen ? 'rgba(245,243,238,0.20)' : 'rgba(20,19,15,0.16)'}`,
                        display:      'flex',
                        alignItems:   'center',
                        justifyContent: 'center',
                        flexShrink:   0,
                        transition:   'border-color 280ms, transform 280ms',
                        transform:    isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                          stroke={isOpen ? 'rgba(245,243,238,0.50)' : 'rgba(20,19,15,0.40)'}
                          strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <span style={{
                      fontFamily:    'var(--font-display)',
                      fontWeight:    700,
                      fontSize:      'clamp(1rem, 1.4vw, 1.15rem)',
                      letterSpacing: '-0.02em',
                      color:         isOpen ? '#FFFFFF' : 'var(--ink)',
                      lineHeight:    1.1,
                      transition:    'color 280ms',
                    }}>
                      {card.label}
                    </span>

                    {/* Summary — visible when closed */}
                    {!isOpen && (
                      <span style={{
                        fontFamily:  'var(--font-sans)',
                        fontSize:    'clamp(0.75rem, 1vw, 0.825rem)',
                        lineHeight:  1.5,
                        color:       'var(--ink-muted)',
                      }}>
                        {card.summary}
                      </span>
                    )}
                  </div>

                  {/* Expandable body */}
                  <div
                    style={{
                      overflow:   'hidden',
                      maxHeight:  isOpen ? '200px' : '0px',
                      opacity:    isOpen ? 1 : 0,
                      marginTop:  isOpen ? '16px' : '0px',
                      transition: 'max-height 380ms var(--ease-expo), opacity 280ms, margin-top 280ms',
                    }}
                  >
                    <div style={{ height: '1px', background: 'rgba(245,243,238,0.12)', marginBottom: '14px' }} />
                    <p style={{
                      fontFamily:  'var(--font-sans)',
                      fontSize:    'clamp(0.78rem, 1vw, 0.875rem)',
                      lineHeight:  1.65,
                      color:       'rgba(245,243,238,0.70)',
                      margin:      0,
                    }}>
                      {card.body}
                    </p>
                  </div>

                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
