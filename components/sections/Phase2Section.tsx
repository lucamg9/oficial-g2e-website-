'use client'

/* Phase II — featured layout (adapted from the Levento Vision reference):
   top hairline + the G2E mark · "Phase II" title on the left · the real
   plant photo shown full and uncropped in the centre · a few key points on
   the right · and a layered base — a green backdrop with dark soil in front,
   the photo emerging from the soil like the sprout in the logo. */

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

const FIGURES = [
  { v: '$150M',     l: 'Investment' },
  { v: '×10',       l: 'New modules' },
  { v: '263,000 t', l: 'Waste / year' },
  { v: '~1.04M',    l: 'Credits / year' },
]

const KEY_POINTS = [
  'Ten identical modules',
  'One proven blueprint, faster and cheaper each build',
  'Replicable in any city',
]

export default function Phase2Section() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useT()

  return (
    <section
      ref={sectionRef}
      id="phase2"
      aria-label="Phase II · 2027 vision"
      style={{
        position:      'relative',
        background:    'var(--stone-ivory)',
        minHeight:     '100vh',
        display:       'flex',
        flexDirection: 'column',
        overflow:      'clip',
      }}
    >
      {/* ── Top hairline + centred G2E mark ───────────────────────────── */}
      <div style={{ position: 'relative', height: '1px', background: 'var(--limestone)', marginTop: 'clamp(40px, 6vw, 72px)' }}>
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'var(--stone-ivory)', padding: '0 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/phase2/logo.png"
            alt="G2E"
            style={{ height: 'clamp(46px, 5vw, 60px)', width: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Feature stage ─────────────────────────────────────────────── */}
      <div
        className="g2e-container phase2-grid"
        style={{ position: 'relative', zIndex: 1, flex: 1 }}
      >
        {/* Left — title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}
        >
          <span className="g2e-eyebrow">2025 · 2027</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', lineHeight: 1,
            letterSpacing: '-0.03em', color: 'var(--forest)', margin: 0, whiteSpace: 'nowrap',
          }}>
            {t('Phase II')}
          </h2>
        </motion.div>

        {/* Centre — the real plant, full & uncropped, emerging from the soil */}
        <motion.div
          className="phase2-photo"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 1.0, ease, delay: 0.05 }}
          style={{ alignSelf: 'end', justifySelf: 'center', width: '100%', maxWidth: '720px', marginBottom: 'clamp(-70px, -8vh, -44px)' }}
        >
          <div
            style={{
              position: 'relative', width: '100%', aspectRatio: '4 / 3',
              borderRadius: '8px', overflow: 'hidden',
              border: '1px solid var(--limestone)',
              boxShadow: '0 2px 8px rgba(46,55,42,0.06), 0 30px 60px -24px rgba(46,55,42,0.34)',
            }}
          >
            <Image
              src="/assets/phase2/facility.webp"
              alt="The G2E hydrothermal carbonization plant at Bordo Poniente, Mexico City, the world's largest dedicated to municipal organic waste."
              fill
              sizes="(max-width: 1024px) 90vw, 720px"
              style={{ objectFit: 'cover', objectPosition: 'center', filter: 'saturate(0.84) contrast(1.02)' }}
            />
            {/* Light palette-harmonising wash. */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(46,55,42,0.06) 0%, rgba(46,55,42,0.02) 50%, rgba(20,17,11,0.30) 100%)',
            }} />
          </div>
        </motion.div>

        {/* Right — key points only */}
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {KEY_POINTS.map((k) => (
            <li key={k} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--moss)', flexShrink: 0, marginTop: '8px' }} />
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: 400,
                fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)', lineHeight: 1.5,
                color: 'var(--fg-secondary)',
              }}>
                {t(k)}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ── Real 3D soil foreground — in front of the photo ──────────── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2,
          height: 'clamp(150px, 19vh, 240px)',
          display: 'flex', alignItems: 'flex-end',
        }}
      >
        {/* Photoreal 3D soil pile, transparent above its natural ridge so the
            plant photo rises out of it; spans full width. Squashed a touch
            vertically (origin bottom) so it stays compact and leaves room
            for the figures. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/phase2/soil.webp"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 'auto', display: 'block', zIndex: 0, pointerEvents: 'none', transform: 'scaleY(0.7)', transformOrigin: 'bottom' }}
        />
        {/* Left→right lighting — soil lit from the left, so its right side
            falls into shadow. Masked by the soil's own shape (multiply) so
            only the soil darkens, not the canvas above the ridge. */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, bottom: 0, width: '100%', aspectRatio: '2400 / 1344',
          zIndex: 1, pointerEvents: 'none', mixBlendMode: 'multiply',
          transform: 'scaleY(0.7)', transformOrigin: 'bottom',
          background: 'linear-gradient(90deg, rgba(20,16,10,0) 0%, rgba(8,6,3,0) 32%, rgba(6,4,2,0.42) 74%, rgba(4,3,1,0.62) 100%)',
          WebkitMaskImage: 'url(/assets/phase2/soil.webp)', maskImage: 'url(/assets/phase2/soil.webp)',
          WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        }} />
        {/* Base darkening so the white figures stand out on the soil */}
        <div aria-hidden="true" className="phase2-figbase" style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '72%', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(180deg, transparent 0%, rgba(6,4,2,0.55) 38%, rgba(4,3,1,0.90) 72%, rgba(2,2,1,0.96) 100%)',
        }} />

        <div
          className="g2e-container phase2-figpanel"
          style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: 'clamp(22px, 3vw, 36px)' }}
        >
          <div className="phase2-figgrid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(14px, 3vw, 40px)',
          }}>
            {FIGURES.map((f) => (
              <div key={f.l} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: 1,
                  letterSpacing: '-0.03em', color: 'var(--fog-white)',
                }}>
                  {f.v}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '10.5px',
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--moss)',
                }}>
                  {t(f.l)}
                </span>
              </div>
            ))}
          </div>
          <span className="phase2-cap" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '10.5px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.5)',
          }}>
            {t('Construction begins 2027 · Bordo Poniente, CDMX')}
          </span>
        </div>
      </div>

      {/* ── Responsive layout ─────────────────────────────────────────── */}
      <style>{`
        .phase2-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 48px);
          padding-top: clamp(52px, 7vw, 88px);
          padding-bottom: clamp(150px, 20vh, 260px);
          justify-items: center;
          text-align: center;
        }
        .phase2-grid h2 { white-space: nowrap; }
        .phase2-grid ul li { text-align: left; }
        /* On phones/tablets the key points sit between the photo and the soil
           band, so the photo's negative overlap would collide with them. */
        @media (max-width: 1023px) {
          .phase2-photo   { margin-bottom: 0 !important; }
          .phase2-grid    { padding-top: clamp(60px, 11vw, 96px); padding-bottom: clamp(230px, 32vh, 280px); }
          /* The figures get their own solid dark panel so every figure sits on
             dark (no more white-on-white top row), with a soft top edge that
             blends out of the soil above. */
          .phase2-figpanel {
            background: linear-gradient(180deg, rgba(10,8,5,0) 0%, rgba(8,6,4,0.97) 7%, rgba(3,2,1,0.99) 100%) !important;
            padding-top: 34px !important;
            padding-bottom: clamp(28px, 6vw, 40px) !important;
            gap: 20px !important;
          }
          .phase2-figgrid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px 18px !important;
          }
          .phase2-cap {
            padding-top: 16px !important;
            border-top: 1px solid rgba(250,250,247,0.14);
          }
        }
        @media (min-width: 1024px) {
          .phase2-grid {
            grid-template-columns: minmax(200px, 0.8fr) minmax(420px, 720px) minmax(200px, 0.9fr);
            align-items: center;
            justify-items: stretch;
            text-align: left;
            gap: clamp(28px, 3vw, 56px);
            padding-bottom: clamp(170px, 22vh, 290px);
          }
        }
      `}</style>
    </section>
  )
}
