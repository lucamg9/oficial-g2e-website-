'use client'

/* ──────────────────────────────────────────────────────────────
   i18n — lightweight EN ⇄ ES layer for the one-page site.

   • English is the source language and the default.
   • The chosen language is remembered in localStorage ('g2e-lang')
     and reflected on <html lang>.
   • Components translate by wrapping their English copy in t():
       const t = useT()
       <h2>{t('Phase II')}</h2>
     t() looks the English string up in the Spanish dictionary and
     falls back to the original English when no entry exists — so
     partial coverage never breaks the page.
   ────────────────────────────────────────────────────────────── */

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Lang = 'en' | 'es'

type Ctx = { lang: Lang; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {} })

const STORAGE_KEY = 'g2e-lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start as 'en' to match SSR, then adopt the stored preference on mount.
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'es' || stored === 'en') setLangState(stored)
    } catch { /* ignore */ }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { window.localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** Returns a translator bound to the current language. */
export function useT() {
  const { lang } = useContext(LangContext)
  return useCallback(
    (en: string) => (lang === 'es' ? (ES[en] ?? en) : en),
    [lang],
  )
}

/* ── Spanish dictionary — keyed by the exact English string ──────────────── */
const ES: Record<string, string> = {
  /* Nav */
  'Technology': 'Tecnología',
  'Services': 'Servicios',
  'Demonstration Center': 'Centro de Demostración',
  'Presence': 'Presencia',
  'Get in touch': 'Contáctanos',
  'is in development': 'está en desarrollo',

  /* Section nav (floating) */
  'Hero': 'Inicio',
  'Who We Are': 'Quiénes somos',
  'How It Works': 'Cómo funciona',
  'Contact': 'Contacto',
  'Sections': 'Secciones',

  /* Hero */
  'Waste becomes': 'Los residuos se convierten en',
  'carbon.': 'carbono.',
  'We collect organic waste from Mexico City and transform it into hydrochar, a mineral grade carbon material that replaces mineral coal.':
    'Recolectamos residuos orgánicos de la Ciudad de México y los transformamos en hidrochar, un material de carbono de grado mineral que sustituye al carbón mineral.',
  'Discover the process': 'Descubre el proceso',
  "World's largest hydrothermal carbonization plant": 'La planta de carbonización hidrotermal más grande del mundo',
  'Mexico City': 'Ciudad de México',
  'Hydrochar': 'Hidrochar',
  'Mineral grade carbon': 'Carbono de grado mineral',
  'Process temp': 'Temp. del proceso',
  'CO₂ emissions': 'Emisiones de CO₂',
  'Replaces': 'Sustituye',
  'Zero': 'Cero',
  'Coal': 'Carbón',
  'Scroll to explore': 'Desplázate para explorar',

  /* Who we are */
  'Who we are': 'Quiénes somos',
  '01 · Carbon': '01 · Carbono',
  '02 · Hydrochar': '02 · Hidrochar',
  '03 · Agriculture': '03 · Agricultura',
  '04 · Impact': '04 · Impacto',
  'Circular economy,\nat scale.': 'Economía circular,\na gran escala.',
  'G2E is a pioneering Mexican technology firm dedicated to the circular economy. We capture urban organic waste, which traditionally generates greenhouse gases in landfills.':
    'G2E es una firma tecnológica mexicana pionera dedicada a la economía circular. Capturamos residuos orgánicos urbanos, que tradicionalmente generan gases de efecto invernadero en los rellenos sanitarios.',
  'Waste becomes\nhigh value material.': 'Los residuos se vuelven\nmaterial de alto valor.',
  'We convert organic waste into hydrochar, a sustainable replacement for mineral coal that regenerates agricultural soil and creates lasting carbon sequestration.':
    'Convertimos los residuos orgánicos en hidrochar, un sustituto sostenible del carbón mineral que regenera el suelo agrícola y crea un secuestro de carbono duradero.',
  'Barren land\nbecomes productive.': 'La tierra estéril\nse vuelve productiva.',
  'Hydrochar restores farmland and facilitates the decarbonization of the steel industry, turning what cities discard into a foundation for regenerative growth.':
    'El hidrochar restaura las tierras de cultivo y facilita la descarbonización de la industria del acero, convirtiendo lo que las ciudades desechan en una base para el crecimiento regenerativo.',
  'From laboratory\nto urban infrastructure.': 'Del laboratorio\na la infraestructura urbana.',
  "Collaborating with UNAM, the Mexican Government, and international stakeholders, we operate the world's largest hydrothermal carbonization plant dedicated to municipal organic waste.":
    'En colaboración con la UNAM, el Gobierno de México y aliados internacionales, operamos la planta de carbonización hidrotermal más grande del mundo dedicada a residuos orgánicos municipales.',
  'Contact our team': 'Contacta a nuestro equipo',
  'Our story': 'Nuestra historia',
  'Mexican Government': 'Gobierno de México',

  /* Our story / timeline */
  'Our Story': 'Nuestra Historia',
  'Seven stages of a': 'Siete etapas de un',
  'single, living system.': 'solo sistema vivo.',
  'From the first seed planted in rural Mexico to a continental scale decarbonization platform. Each milestone builds on the resilience of the one before it.':
    'Desde la primera semilla plantada en el México rural hasta una plataforma de descarbonización a escala continental. Cada hito se construye sobre la resiliencia del anterior.',
  'Stage': 'Etapa',
  // milestone fields
  'Origins': 'Orígenes',
  'Roots in rural Mexico': 'Raíces en el México rural',
  'NGO "Gente como Nosotros" is founded with a simple idea: create dignified jobs and improve life in isolated rural communities of Oaxaca.':
    'La ONG "Gente como Nosotros" se funda con una idea simple: crear empleos dignos y mejorar la vida en comunidades rurales aisladas de Oaxaca.',
  'Foundation': 'Fundación',
  'Origin': 'Origen',
  'Discovery': 'Descubrimiento',
  'Gasification & Biochar': 'Gasificación y Biochar',
  'We discover two technologies that change our direction. Real impact would only come from scaling them to industrial level.':
    'Descubrimos dos tecnologías que cambian nuestro rumbo. El verdadero impacto solo llegaría al escalarlas a nivel industrial.',
  'Pivot': 'Giro',
  'Two': 'Dos',
  'Key techs': 'Tecnologías clave',
  'Founding': 'Fundación',
  'G2E is Born': 'Nace G2E',
  'To bring gasification to industrial scale, we found G2E, convinced we could help decarbonize Mexican industry through waste.':
    'Para llevar la gasificación a escala industrial, fundamos G2E, convencidos de que podíamos ayudar a descarbonizar la industria mexicana a través de los residuos.',
  'Company': 'Empresa',
  'Founded': 'Fundada',
  'Research': 'Investigación',
  'Partnership with UNAM': 'Alianza con la UNAM',
  "We begin working with UNAM's Institute of Engineering, the technical foundation for everything that followed.":
    'Comenzamos a trabajar con el Instituto de Ingeniería de la UNAM, la base técnica de todo lo que vino después.',
  'Alliance': 'Alianza',
  'Backbone': 'Columna',
  'Infrastructure': 'Infraestructura',
  'With SAGARPA funding, we open the UNAM · SAGARPA · G2E Gasification Technologies Demonstration Center at UNAM\'s main campus.':
    'Con financiamiento de SAGARPA, abrimos el Centro de Demostración de Tecnologías de Gasificación UNAM · SAGARPA · G2E en el campus central de la UNAM.',
  'Build': 'Construcción',
  'Center': 'Centro',
  'Turning Point': 'Punto de inflexión',
  'The Invitation': 'La Invitación',
  "At the direct request of Dr. Claudia Sheinbaum, we partner with UNAM to decarbonize Mexico City's organic waste. The HTC Plant is born.":
    'A solicitud directa de la Dra. Claudia Sheinbaum, nos asociamos con la UNAM para descarbonizar los residuos orgánicos de la Ciudad de México. Nace la Planta de CHT.',
  'Citizens': 'Habitantes',
  'Construction Begins': 'Inicia la construcción',
  'Phase I construction starts at Bordo Poniente, the former landfill where over 1,000,000 m³ of organic matter release methane every day.':
    'Inicia la construcción de la Fase I en Bordo Poniente, el antiguo relleno sanitario donde más de 1,000,000 m³ de materia orgánica liberan metano cada día.',
  'Phase I': 'Fase I',
  'm³ / year': 'm³ / año',
  'Record': 'Récord',
  "World's Largest Plant": 'La planta más grande del mundo',
  'Phase I is completed. Our 3 t/hr reactor becomes the largest HTC plant in the world processing municipal organic waste.':
    'Se completa la Fase I. Nuestro reactor de 3 t/h se convierte en la planta de CHT más grande del mundo que procesa residuos orgánicos municipales.',
  'Global #1': '#1 mundial',
  'Worldwide': 'En el mundo',
  'Now': 'Ahora',
  'Operate & Scale': 'Operar y escalar',
  'Staged operation campaigns refine feedstock conditioning and process control. Phase II is formalized: 10 additional modules, USD 150 million investment.':
    'Las campañas de operación por etapas refinan el acondicionamiento del material y el control del proceso. Se formaliza la Fase II: 10 módulos adicionales, 150 millones de USD de inversión.',
  'Current': 'Actual',
  'Phase II': 'Fase II',
  'Replication at Scale': 'Replicación a escala',
  'Phase II launches. A continental decarbonization platform designed for partners who think in decades. Ten new modules, verifiable carbon credits.':
    'Arranca la Fase II. Una plataforma de descarbonización continental diseñada para socios que piensan en décadas. Diez módulos nuevos, créditos de carbono verificables.',
  'Next': 'Siguiente',
  'Modules': 'Módulos',

  /* How it works */
  'How it works': 'Cómo funciona',
  'Hydrothermal carbonization': 'Carbonización hidrotermal',
  'Collection': 'Recolección',
  'We collect organic waste from across Mexico City.': 'Recolectamos residuos orgánicos de toda la Ciudad de México.',
  'Intake': 'Recepción',
  'It arrives at the Bordo Poniente plant and enters the intake system.':
    'Llega a la planta de Bordo Poniente e ingresa al sistema de recepción.',
  'Slurry': 'Pasta',
  'Inside a sealed reactor, the waste becomes a homogeneous slurry.':
    'Dentro de un reactor sellado, los residuos se convierten en una pasta homogénea.',
  'Pressure & heat': 'Presión y calor',
  'The reactor climbs to 220°C under controlled pressure.': 'El reactor sube a 220°C bajo presión controlada.',
  'Hydrothermal reaction': 'Reacción hidrotermal',
  'Carbon bonds form as the organic matter transforms, with zero CO₂ emissions.':
    'Se forman enlaces de carbono mientras la materia orgánica se transforma, con cero emisiones de CO₂.',
  'Carbonization': 'Carbonización',
  'The reaction completes and hydrochar remains, a mineral grade carbon.':
    'La reacción se completa y queda el hidrochar, un carbono de grado mineral.',
  'Value at scale': 'Valor a escala',
  'Stable, measurable, replicable. Ready to replace coal and regenerate soil, at city scale.':
    'Estable, medible, replicable. Listo para sustituir al carbón y regenerar el suelo, a escala urbana.',

  /* Phase II */
  'Ten identical modules': 'Diez módulos idénticos',
  'One proven blueprint, faster and cheaper each build': 'Un modelo probado, más rápido y económico en cada construcción',
  'Replicable in any city': 'Replicable en cualquier ciudad',
  'Investment': 'Inversión',
  'New modules': 'Módulos nuevos',
  'Waste / year': 'Residuos / año',
  'Credits / year': 'Créditos / año',
  'Construction begins 2027 · Bordo Poniente, CDMX': 'La construcción inicia en 2027 · Bordo Poniente, CDMX',

  /* Contact */
  'We build environmental infrastructure at industrial scale. Investors, institutions, and partners who think in decades, we want to hear from you.':
    'Construimos infraestructura ambiental a escala industrial. Inversionistas, instituciones y socios que piensan en décadas, queremos saber de ustedes.',
  "Let's talk": 'Hablemos',
  'Location': 'Ubicación',
  'Get direction': 'Cómo llegar',
  'The PCH-CDMX plant · Bordo Poniente': 'La planta PCH-CDMX · Bordo Poniente',
  "Let's build something": 'Construyamos algo',
  'consequential.': 'trascendente.',
  'General': 'General',
  'Info': 'Información',
  'Name': 'Nombre',
  'Full name': 'Nombre completo',
  'Organization': 'Organización',
  'Company or institution': 'Empresa o institución',
  'Email': 'Correo',
  'Area of interest': 'Área de interés',
  'Off-take': 'Compra',
  'Government': 'Gobierno',
  'Press': 'Prensa',
  'Message': 'Mensaje',
  'Tell us about your project or interest.': 'Cuéntanos sobre tu proyecto o interés.',
  'Send message': 'Enviar mensaje',
  'Message received': 'Mensaje recibido',
  "We'll be in touch": 'Te contactaremos',
  'shortly.': 'pronto.',
  'For urgent enquiries write directly to contacto@g2e.mx':
    'Para asuntos urgentes escribe directamente a contacto@g2e.mx',

  /* Footer */
  'Work with us': 'Trabaja con nosotros',
  'Demonstration center': 'Centro de demostración',
  'Projects': 'Proyectos',
  'The process': 'El proceso',
  'Carbon credits': 'Créditos de carbono',
  'Soil regeneration': 'Regeneración del suelo',
  'Off-take partners': 'Socios de compra',
  'Transforming Waste · CDMX · Est. 2013': 'Transformando residuos · CDMX · Desde 2013',
  "From Mexico's waste": 'De los residuos de México',
  "to the world's industry.": 'a la industria del mundo.',
  'Transforming municipal organic waste into hydrochar, decarbonizing industry at scale.':
    'Transformando residuos orgánicos municipales en hidrochar, descarbonizando la industria a gran escala.',
  'Join the mission': 'Únete a la misión',
  'All rights reserved.': 'Todos los derechos reservados.',
}
