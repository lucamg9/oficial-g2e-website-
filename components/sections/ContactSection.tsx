'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useReveal } from '@/lib/use-reveal'
import { useT } from '@/lib/i18n'

/* ──────────────────────────────────────────────────────────────
   ContactSection — "Get in touch".

   Editorial, light (Stone Ivory) close to the page: an oversized
   GET IN TOUCH headline beside the real PCH-CDMX facility photo,
   then a labelled info column (emails + location, Orix-style ↳
   rows) paired with a refined contact form. A short bridge fades the
   dark How-It-Works section into this light one; the dark footer
   then reads cleanly against it.
   ────────────────────────────────────────────────────────────── */

const INTERESTS = ['Off-take', 'Investment', 'Government', 'Research', 'Press']

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Bordo+Poniente+Ciudad+de+Mexico'

const ink      = 'var(--forest)'
const inkMuted = 'rgba(46,55,42,0.70)'
const inkFaint = 'rgba(46,55,42,0.46)'
const line     = 'rgba(46,55,42,0.12)'

export default function ContactSection() {
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent]         = useState(false)
  const t = useT()

  const headRef  = useRef<HTMLDivElement>(null)
  const imgRef   = useRef<HTMLDivElement>(null)
  const infoRef  = useRef<HTMLDivElement>(null)
  const formRef  = useRef<HTMLDivElement>(null)

  useReveal([
    { ref: headRef, from: { opacity: 0, y: 48 }, duration: 0.95, ease: 'power4.out' },
    { ref: imgRef,  from: { opacity: 0, y: 40, scale: 0.98 }, duration: 1.05, ease: 'power4.out', delay: 0.1, threshold: 0.05 },
    { ref: infoRef, from: { opacity: 0, y: 40 }, duration: 0.95, ease: 'power4.out', delay: 0.12, threshold: 0.05 },
    { ref: formRef, from: { opacity: 0, y: 40 }, duration: 1.0,  ease: 'power4.out', delay: 0.18, threshold: 0.05 },
  ])

  const toggle = (item: string) =>
    setSelected(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]))

  /* Small labelled info row — the Orix-style "↳ LABEL" header + content. */
  const InfoRow = ({
    label, children, last = false,
  }: { label: string; children: React.ReactNode; last?: boolean }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 0.7fr) 1fr',
        gap: 'clamp(16px, 3vw, 40px)',
        alignItems: 'baseline',
        padding: '26px 0',
        borderTop: `1px solid ${line}`,
        ...(last ? { borderBottom: `1px solid ${line}` } : {}),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true" style={{ color: 'var(--moss)', fontSize: '15px', lineHeight: 1 }}>↳</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: ink,
        }}>
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )

  const FieldLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor} style={{
      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em',
      textTransform: 'uppercase', color: inkFaint,
    }}>
      {children}
    </label>
  )

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontSize: '15px', padding: '10px 0',
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(46,55,42,0.20)', color: ink, width: '100%', outline: 'none',
  }
  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = 'var(--moss)')
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = 'rgba(46,55,42,0.20)')

  return (
    <section
      id="contact"
      aria-label="Get in touch"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        paddingBottom: 'clamp(64px, 9vh, 120px)',
        overflow: 'clip',
      }}
    >
      {/* Bridge — fades the dark How-It-Works section into this light one. */}
      <div aria-hidden="true" style={{
        height: 'clamp(90px, 12vh, 150px)',
        background: 'linear-gradient(to bottom, #2E372A 0%, var(--bg) 100%)',
      }} />

      <div className="g2e-container" style={{ paddingTop: 'clamp(20px, 4vw, 56px)' }}>

        {/* ── Eyebrow ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(24px, 4vw, 44px)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--moss)' }}>
            [ 05 ]
          </span>
          <div style={{ height: '1px', flex: 1, maxWidth: '120px', background: line }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: inkFaint,
          }}>
            {t('Get in touch')}
          </span>
        </div>

        {/* ── Headline + facility image ───────────────────────── */}
        <div className="gt-hero">
          <div ref={headRef}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(3rem, 9.5vw, 9rem)', lineHeight: 0.92,
              letterSpacing: '-0.035em', textTransform: 'uppercase',
              color: ink, margin: 0,
            }}>
              {t('Get in touch')}
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontWeight: 400,
              fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', lineHeight: 1.65,
              color: inkMuted, maxWidth: '46ch', marginTop: 'clamp(24px, 3vw, 36px)',
            }}>
              {t('We build environmental infrastructure at industrial scale. Investors, institutions, and partners who think in decades, we want to hear from you.')}
            </p>
          </div>

          <div ref={imgRef} className="gt-image">
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '4 / 3',
              borderRadius: 'var(--radius-sm)', overflow: 'hidden',
              border: '1px solid var(--limestone)',
              boxShadow: '0 2px 8px rgba(46,55,42,0.06), 0 28px 56px -28px rgba(46,55,42,0.30)',
            }}>
              <Image
                src="/assets/phase2/facility.webp"
                alt="The G2E PCH-CDMX hydrothermal carbonization plant at Bordo Poniente, Mexico City."
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center', filter: 'saturate(0.94)' }}
              />
            </div>
            <span style={{
              display: 'block', marginTop: '12px',
              fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: inkFaint,
            }}>
              {t('The PCH-CDMX plant · Bordo Poniente')}
            </span>
          </div>
        </div>

        {/* ── Info column + form ──────────────────────────────── */}
        <div className="gt-body">

          {/* Left — labelled info rows */}
          <div ref={infoRef}>
            <InfoRow label={t("Let's talk")}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: t('General'), email: 'contacto@g2e.mx' },
                  { label: t('Info'),    email: 'info@g2e.mx'     },
                ].map(({ label, email }) => (
                  <div key={email} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: inkFaint,
                    }}>
                      {label}
                    </span>
                    <a href={`mailto:${email}`} style={{
                      fontFamily: 'var(--font-display)', fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
                      fontWeight: 500, letterSpacing: '-0.01em', color: ink, textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--moss)')}
                      onMouseLeave={e => (e.currentTarget.style.color = ink)}
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </InfoRow>

            <InfoRow label={t('Location')} last>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.6,
                  color: ink, margin: 0,
                }}>
                  Bordo Poniente,<br />Ciudad de México, México
                </p>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px', width: 'fit-content',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--moss)', textDecoration: 'none',
                }}>
                  {t('Get direction')}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </InfoRow>
          </div>

          {/* Right — refined form */}
          <div ref={formRef}>
            {sent ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'center', gap: '16px', minHeight: '320px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--moss)',
                }}>
                  {t('Message received')}
                </span>
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1,
                  letterSpacing: '-0.02em', color: ink, margin: 0,
                }}>
                  {t("We'll be in touch")} <em style={{ color: 'var(--moss)', fontStyle: 'normal' }}>{t('shortly.')}</em>
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.7, color: inkMuted }}>
                  {t('For urgent enquiries write directly to contacto@g2e.mx')}
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px, 3vw, 28px)' }}
              >
                <div className="gt-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(18px, 3vw, 28px)' }}>
                  {[
                    { label: t('Name'),         name: 'name',         type: 'text', placeholder: t('Full name') },
                    { label: t('Organization'), name: 'organization', type: 'text', placeholder: t('Company or institution') },
                  ].map(field => (
                    <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                      <input id={field.name} name={field.name} type={field.type} placeholder={field.placeholder}
                        required={field.name === 'name'} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <FieldLabel htmlFor="email">{t('Email')}</FieldLabel>
                  <input id="email" name="email" type="email" placeholder="you@company.com" required
                    style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <FieldLabel htmlFor="">{t('Area of interest')}</FieldLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {INTERESTS.map(item => {
                      const active = selected.includes(item)
                      return (
                        <button key={item} type="button" onClick={() => toggle(item)}
                          style={{
                            fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
                            padding: '8px 15px', borderRadius: '999px', cursor: 'pointer',
                            border: `1px solid ${active ? 'var(--forest)' : 'rgba(46,55,42,0.20)'}`,
                            background: active ? 'var(--forest)' : 'transparent',
                            color: active ? 'var(--fog-white)' : inkMuted,
                            transition: 'all 180ms var(--ease-expo)',
                          }}>
                          {t(item)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <FieldLabel htmlFor="message">{t('Message')}</FieldLabel>
                  <textarea id="message" name="message" rows={3}
                    placeholder={t('Tell us about your project or interest.')}
                    style={{ ...inputStyle, resize: 'none' }} onFocus={focusOn} onBlur={focusOff} />
                </div>

                <button type="submit" style={{
                  alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '10px',
                  fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                  background: 'var(--forest)', color: 'var(--fog-white)', padding: '15px 26px',
                  borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                  boxShadow: '0 10px 24px -10px rgba(46,55,42,0.45)',
                  transition: 'background 200ms var(--ease-expo), transform 200ms var(--ease-expo)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--deep-moss)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--forest)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {t('Send message')}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Responsive layout ───────────────────────────────── */}
      <style>{`
        .gt-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: end;
          margin-bottom: clamp(48px, 7vw, 88px);
        }
        .gt-image { max-width: 460px; }
        .gt-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 72px);
        }
        @media (min-width: 1024px) {
          .gt-hero  { grid-template-columns: 1.5fr 0.8fr; }
          .gt-body  { grid-template-columns: 0.85fr 1.15fr; align-items: start; }
        }
        @media (max-width: 560px) {
          .gt-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
