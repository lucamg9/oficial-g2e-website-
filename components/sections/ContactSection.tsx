'use client'

import { useRef } from 'react'
import { useState } from 'react'
import { useReveal } from '@/lib/use-reveal'
import { useT } from '@/lib/i18n'

const INTERESTS = ['Off-take', 'Investment', 'Government', 'Research', 'Press']

export default function ContactSection() {
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent]         = useState(false)
  const t = useT()

  const headingRef  = useRef<HTMLParagraphElement>(null)
  const leftPanelRef  = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useReveal([
    {
      ref:      headingRef,
      from:     { opacity: 0, y: 60 },
      duration: 0.90,
      ease:     'power4.out',
    },
    {
      ref:      leftPanelRef,
      from:     { opacity: 0, x: -110, y: 40 },
      duration: 1.10,
      ease:     'power4.out',
      threshold:0.06,
    },
    {
      ref:      rightPanelRef,
      from:     { opacity: 0, x: 110, y: 40 },
      duration: 1.10,
      ease:     'power4.out',
      delay:    0.16,
      threshold:0.06,
    },
  ])

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )

  return (
    <section
      id="contact"
      style={{ background: 'var(--bg)', paddingBottom: 'var(--space-16)' }}
    >

      {/* ── Section bridge — dark → bone ─────────── */}
      <div
        aria-hidden="true"
        style={{
          height: '100px',
          background: 'linear-gradient(to bottom, var(--hydrochar-900) 0%, var(--bg) 100%)',
        }}
      />

      <div className="g2e-container">

        {/* ── Section label ─────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              color: 'var(--ink-muted)',
              flexShrink: 0,
            }}
          >
            [ 05 ]
          </span>
          <div style={{ height: '1px', flex: 1, background: 'var(--line)' }} />
        </div>
        <p
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {t('Get in touch')}
        </p>

        {/* ── Split layout ──────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6"
          style={{ alignItems: 'stretch' }}
        >

          {/* Left — Hydrochar panel with GIF 3 ─────── */}
          <div
            ref={leftPanelRef}
            style={{
              position: 'relative',
              background: 'var(--hydrochar-900)',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '32px',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            {/* Contact background photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/contact-bg.jpg"
              alt=""
              aria-hidden="true"
              style={{
                position:       'absolute',
                inset:          0,
                width:          '100%',
                height:         '100%',
                objectFit:      'cover',
                objectPosition: 'center top',
              }}
            />
            {/* Overlay — preserves text legibility */}
            <div
              aria-hidden="true"
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(to bottom, rgba(46,55,42,0.30) 0%, rgba(46,55,42,0.82) 55%)',
              }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  lineHeight: 'var(--lh-snug)',
                  letterSpacing: 'var(--ls-display)',
                  fontWeight: 400,
                  color: 'var(--bone-100)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {t("Let's build something")}<br />
                <em>{t('consequential.')}</em>
              </h2>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(242,239,231,0.12)',
                  marginBottom: 'var(--space-6)',
                }}
              />

              {/* Emails */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { label: 'General',  email: 'contacto@g2e.mx' },
                  { label: 'Info',     email: 'info@g2e.mx'     },
                ].map(({ label, email }) => (
                  <div key={email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: 'var(--ls-eyebrow)',
                        textTransform: 'uppercase',
                        color: 'rgba(242,239,231,0.35)',
                        width: '52px',
                        flexShrink: 0,
                      }}
                    >
                      {t(label)}
                    </span>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        color: 'var(--bone-100)',
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>

              {/* Location */}
              <p
                style={{
                  marginTop: 'var(--space-6)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: 'var(--ls-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'rgba(242,239,231,0.28)',
                }}
              >
                Bordo Poniente · Ciudad de México · México
              </p>
            </div>
          </div>

          {/* Right — Form on bone ────────────────── */}
          <div
            ref={rightPanelRef}
            style={{
              background: 'var(--bone-50)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-2xl)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {sent ? (
              /* ── Success state ── */
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6) 0',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xs)',
                    letterSpacing: 'var(--ls-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--moss-600)',
                  }}
                >
                  {t('Message received')}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    lineHeight: 'var(--lh-snug)',
                    letterSpacing: 'var(--ls-display)',
                    fontWeight: 400,
                    color: 'var(--ink)',
                  }}
                >
                  {t("We'll be in touch")}<br />
                  <em>{t('shortly.')}</em>
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--ink-muted)',
                    lineHeight: 'var(--lh-loose)',
                  }}
                >
                  {t('For urgent enquiries write directly to contacto@g2e.mx')}
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
              >
                {/* Row — Name + Org */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Name',         name: 'name',         type: 'text',  placeholder: 'Full name'      },
                    { label: 'Organization', name: 'organization',  type: 'text',  placeholder: 'Company or institution' },
                  ].map((field) => (
                    <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label
                        htmlFor={field.name}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: 'var(--ls-eyebrow)',
                          textTransform: 'uppercase',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {t(field.label)}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={t(field.placeholder)}
                        required={field.name === 'name'}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '15px',
                          padding: '10px 0',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid var(--line-strong)',
                          color: 'var(--ink)',
                          width: '100%',
                          outline: 'none',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: 'var(--ls-eyebrow)',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {t('Email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--line-strong)',
                      color: 'var(--ink)',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Interest pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: 'var(--ls-eyebrow)',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {t('Area of interest')}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {INTERESTS.map((item) => {
                      const active = selected.includes(item)
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item)}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            fontWeight: 500,
                            padding: '8px 14px',
                            borderRadius: '999px',
                            border: active
                              ? '1px solid var(--hydrochar-900)'
                              : '1px solid var(--line-strong)',
                            background: active ? 'var(--hydrochar-900)' : 'transparent',
                            color: active ? 'var(--bone-100)' : 'var(--ink)',
                            cursor: 'pointer',
                            transition: 'all 180ms var(--ease-expo)',
                          }}
                        >
                          {t(item)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: 'var(--ls-eyebrow)',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {t('Message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder={t('Tell us about your project or interest.')}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      padding: '10px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--line-strong)',
                      color: 'var(--ink)',
                      width: '100%',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                    background: 'var(--hydrochar-900)',
                    color: 'var(--bone-100)',
                    padding: '14px 22px 14px 26px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 200ms',
                  }}
                >
                  {t('Send message')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                  </svg>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
