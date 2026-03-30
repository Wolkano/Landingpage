/**
 * drainageCalculator.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Beräkningsmotor för dräneringsofferter.
 * Helt frikopplad från Vue – kan enhetstestas separat.
 *
 * Kalkylbladets referenspunkter (Google Sheets):
 *   A4  = djup  (depth)
 *   B4  = längd (length)
 *   L4  = bortforsling (removeExcavatedMass) → "JA" / "NEJ"
 */

// ─── PRISLISTA (SEK exkl. moms) ───────────────────────────────────────────────
// Ändra enbart i detta objekt – berörs inte av beräkningslogiken.

export const PRICE_LIST = {
  maskinflytt:         { label: 'Flytt av maskiner och verktyg',               unit: 'st',  unitPrice: 2900  },
  framkorning:         { label: 'Framkörningsavgift',                           unit: 'st',  unitPrice: 450   },
  gravning:            { label: 'Grävning vid husgrunden',                      unit: 'm',   unitPrice: 1250  },
  forbehandling:       { label: 'Förbehandling av grundmur',                    unit: 'm²',  unitPrice: 210   },
  dranringsror:        { label: 'Anläggning dräneringsrör DSA 110',             unit: 'm',   unitPrice: 499   },
  inspektionsror:      { label: 'Inspektionsrör till dränering',                unit: 'st',  unitPrice: 1190  },
  isolering100:        { label: 'Montering isoleringsskiva 100 mm',             unit: 'm²',  unitPrice: 510   },
  isolering200:        { label: 'Tilläggsisolering isoleringsskiva 200 mm',     unit: 'm²',  unitPrice: 379   },
  kantlist:            { label: 'Montering kantlist',                           unit: 'm²',  unitPrice: 289   },
  bojar:               { label: 'Böjar till dräneringsröret',                   unit: 'st',  unitPrice: 169   },
  dagvattenror:        { label: 'Anläggning av dagvattenrör',                   unit: 'm',   unitPrice: 256   },
  stuprorsanslutning:  { label: 'Anslutning av stuprör till dagvattenledning',  unit: 'st',  unitPrice: 399   },
  dagvattenkopplingar: { label: 'Diverse kopplingar till dagvattenledning',     unit: 'st',  unitPrice: 670   },
  dagvattenbrunn:      { label: 'Dagvattenbrunn med sandfång och vattenlås',    unit: 'st',  unitPrice: 4100  },
  dranagebrunn:        { label: 'Dräneringsbrunn 600 mm 3M inkl. pump',         unit: 'st',  unitPrice: 17200 },
  aterfyllnad:         { label: 'Återfyllnad med befintliga schaktmassor',      unit: 'm',   unitPrice: 329   },
  stadning:            { label: 'Städning och bortforsling av byggavfall',      unit: 'st',  unitPrice: 2247  },
  bortforsling:        { label: 'Bortforsling av schaktmassor (container)',     unit: 'st',  unitPrice: 4990  },
  lastning:            { label: 'Lastning av containrar',                       unit: 'st',  unitPrice: 1940  },
  finplanering:        { label: 'Finplanering – arbetskostnad per kvm',         unit: 'm²',  unitPrice: 178   },
  barlager:            { label: 'Bärlager 0–30',                               unit: 'ton', unitPrice: 390   },
  fraktkostnad:        { label: 'Fraktkostnader',                               unit: 'st',  unitPrice: 1780  },
}

// ─── BERÄKNINGSKONSTANTER ─────────────────────────────────────────────────────
// Faktorer härledda från kalkylbladet. Justera utan att röra beräkningslogiken.

export const CONSTANTS = {
  // Schaktgeometri
  TRENCH_WIDTH_M: 0.9,       // antagen schaktbredd i meter
  M3_PER_CONTAINER: 16,      // m³ schaktmassor per container (16 m³ ≈ standard 10-tons container)

  // Isolering – faktorer relativt grundmur-arean (length × depth)
  // Verifierat mot kalkylblad: 35m × 2.14m = 75 m² grundmur →
  //   isolering100 = 85 m²  (85/75 ≈ 1.13)
  //   isolering200 = 48 m²  (48/75 ≈ 0.64)
  //   kantlist     = 42 m²  (42/35 = 1.20 per löpmeter)
  ISOLERING_100_FACTOR: 1.14, // 100 mm skiva: överlapp + spill
  ISOLERING_200_FACTOR: 0.64, // 200 mm dubbel skiva: undre ~64% av väggen
  KANTLIST_FACTOR:      1.20, // kantlist m² = length × depth × 1.20

  // Finplanering
  FINPLANERING_FACTOR:   2.5,  // m² per löpmeter (arbetsyta runt schaktet)
  BARLAGER_TON_PER_M2:   0.32, // ton bärlager per m² finplanering

  // Standardantal – justeras per projekt vid behov. ARRAY för Framkörning?? Inställningar i QuoteEditor?
  DEFAULT_FRAMKORNING:          10,
  DEFAULT_INSPEKTIONSROR:        2,
  DEFAULT_BOJAR:                 4,
  DEFAULT_STUPRORSANSLUTNING:    4,
  DEFAULT_DAGVATTENKOPPLINGAR:   4,

  VAT_RATE: 0.25,
}

// ─── KATEGORIER ───────────────────────────────────────────────────────────────
export const CATEGORIES = {
  ETABLERING:   'Maskinflytt och etablering',
  SCHAKT:       'Schakt',
  DRANERING:    'Dränering och grundisolering',
  DAGVATTEN:    'Omläggning av dagvattenledning',
  BRUNNAR:      'Anläggning av brunnar',
  ATERFYLLNING: 'Återfyllning och städning',
  BORTFORSLING: 'Bortforsling av schaktmassor',
  FINPLANERING: 'Finplanering',
}

// Ordningen som sektionerna ska visas i QuoteEditor
export const CATEGORY_ORDER = [
  CATEGORIES.ETABLERING,
  CATEGORIES.SCHAKT,
  CATEGORIES.DRANERING,
  CATEGORIES.DAGVATTEN,
  CATEGORIES.BRUNNAR,
  CATEGORIES.ATERFYLLNING,
  CATEGORIES.BORTFORSLING,
  CATEGORIES.FINPLANERING,
]

// ─── BRUNNSTYPER ──────────────────────────────────────────────────────────────
export const WELL_TYPES = [
  { value: 'bada',      label: 'Dräneringsbrunn + dagvattenbrunn' },
  { value: 'dranering', label: 'Dräneringsbrunn 600 mm med pump' },
  { value: 'dagvatten', label: 'Dagvattenbrunn med sandfång' },
  { value: 'ingen',     label: 'Ingen brunn' },
]

// ─── INTERN RADFABRIK ─────────────────────────────────────────────────────────
// Skapar ett offertradsobjekt. ID-räknaren skickas in för att undvika global state.

function makeRow(idCounter, key, qty, options = {}) {
  const base = PRICE_LIST[key]
  if (!base) throw new Error(`Okänd prisliste-nyckel: "${key}"`)

  const resolvedQty = Math.round(Math.max(0, qty) * 10) / 10
  const enabled = options.enabled !== undefined ? options.enabled : resolvedQty > 0

  return {
    id: ++idCounter.value,
    key,
    title: base.label,
    qty: resolvedQty,
    unit: base.unit,
    unitPrice: base.unitPrice,
    enabled,
    editable: true,
    category: options.category ?? '',
  }
}

// ─── BERÄKNINGSFUNKTIONER ─────────────────────────────────────────────────────

/**
 * Bygger standardrader utifrån schaktdjup och schaktlängd.
 * Anm: kantlist räknas i m² (stämmer med kalkylbladet, även om enheten är ovanlig).
 */
export function buildBaseRows(input, idCounter) {
  const { depth, length } = input
  const wallArea     = length * depth
  const isolering100 = wallArea * CONSTANTS.ISOLERING_100_FACTOR
  const isolering200 = wallArea * CONSTANTS.ISOLERING_200_FACTOR
  const kantlistArea = wallArea * CONSTANTS.KANTLIST_FACTOR

  const r = (key, qty, opts) => makeRow(idCounter, key, qty, opts)

  return [
    r('maskinflytt',        1,                                    { category: CATEGORIES.ETABLERING   }),
    r('framkorning',        CONSTANTS.DEFAULT_FRAMKORNING,        { category: CATEGORIES.ETABLERING   }),
    r('gravning',           length,                               { category: CATEGORIES.SCHAKT        }),
    r('forbehandling',      wallArea,                             { category: CATEGORIES.DRANERING    }),
    r('dranringsror',       length,                               { category: CATEGORIES.DRANERING    }),
    r('inspektionsror',     CONSTANTS.DEFAULT_INSPEKTIONSROR,     { category: CATEGORIES.DRANERING    }),
    r('isolering100',       isolering100,                         { category: CATEGORIES.DRANERING    }),
    r('isolering200',       isolering200,                         { category: CATEGORIES.DRANERING    }),
    r('kantlist',           kantlistArea,                         { category: CATEGORIES.DRANERING    }),
    r('bojar',              CONSTANTS.DEFAULT_BOJAR,              { category: CATEGORIES.DRANERING    }),
    r('dagvattenror',       length,                               { category: CATEGORIES.DAGVATTEN    }),
    r('stuprorsanslutning', CONSTANTS.DEFAULT_STUPRORSANSLUTNING, { category: CATEGORIES.DAGVATTEN    }),
    r('dagvattenkopplingar',CONSTANTS.DEFAULT_DAGVATTENKOPPLINGAR,{ category: CATEGORIES.DAGVATTEN    }),
    r('aterfyllnad',        length,                               { category: CATEGORIES.ATERFYLLNING }),
    r('stadning',           1,                                    { category: CATEGORIES.ATERFYLLNING }),
  ]
}

/**
 * Bortforsling av schaktmassor (speglar L4 i kalkylbladet).
 * JA  → beräknat antal containrar, rader aktiverade.
 * NEJ → qty 0, rader inaktiverade men synliga i offerteditorn för manuell aktivering.
 */
export function applyExcavationRemovalRule(input, idCounter) {
  const { depth, length, removeExcavatedMass } = input
  const volume = (depth + 0.1) * length * CONSTANTS.TRENCH_WIDTH_M;
  const containers = Math.ceil(volume / CONSTANTS.M3_PER_CONTAINER)
  const qty        = removeExcavatedMass ? containers : 0

  const r = (key) => makeRow(idCounter, key, qty, {
    category: CATEGORIES.BORTFORSLING,
    enabled:  removeExcavatedMass,
  })

  return [r('bortforsling'), r('lastning')]
}

/**
 * Brunnrader utifrån vald brunnstyp.
 */
export function applyWellTypeAdjustments(wellType, idCounter) {
  const r = (key) => makeRow(idCounter, key, 1, { category: CATEGORIES.BRUNNAR })
  const rows = []
  if (wellType === 'dranering' || wellType === 'bada') rows.push(r('dranagebrunn'))
  if (wellType === 'dagvatten' || wellType === 'bada') rows.push(r('dagvattenbrunn'))
  return rows
}

/**
 * Finplaneringrader utifrån schaktlängd.
 */
export function buildFinplaneringRows(input, idCounter) {
  const { length } = input
  const area = Math.round(length * CONSTANTS.FINPLANERING_FACTOR)
  const ton  = Math.round(area  * CONSTANTS.BARLAGER_TON_PER_M2)
  const r    = (key, qty) => makeRow(idCounter, key, qty, { category: CATEGORIES.FINPLANERING })

  return [
    r('finplanering', area),
    r('barlager',     ton),
    r('fraktkostnad', 1),
  ]
}

/**
 * Beräknar totalsummor från en lista offert-rader.
 * Vue anropar denna direkt i computed() – håll ren från UI-beroenden.
 */
export function calculateTotals(rows) {
  const subtotalExVat = rows
    .filter(r => r.enabled)
    .reduce((sum, r) => sum + r.qty * r.unitPrice, 0)

  const vat         = subtotalExVat * CONSTANTS.VAT_RATE
  const totalIncVat = subtotalExVat + vat

  return {
    subtotalExVat,
    vat,
    totalIncVat,
    customerTotal: totalIncVat, // ROT hanteras i ett separat steg
  }
}

/**
 * Huvud-ingångspunkt – genererar komplett offertmodell från input.
 * @param  {object} input  { depth, length, wellType, removeExcavatedMass }
 * @returns {{ input, quoteRows, totals }}
 */
export function calculateQuote(input) {
  const idCounter = { value: 0 } // lokal räknare, undviker global state

  const rows = [
    ...buildBaseRows(input, idCounter),
    ...applyWellTypeAdjustments(input.wellType, idCounter),
    ...applyExcavationRemovalRule(input, idCounter),
    ...buildFinplaneringRows(input, idCounter),
  ]

  return {
    input,
    quoteRows: rows,
    totals: calculateTotals(rows),
  }
}

/**
 * Bygger en payload för framtida e-postutskick eller API-integration.
 * Mockas tills vidare; byt ut send()-anropet mot riktig implementation.
 */
export function buildQuotePayload({ input, quoteRows, totals, contact = {}, notes = '' }) {
  return {
    meta: {
      createdAt: new Date().toISOString(),
      version:   '1.0',
    },
    contact: {
      name:    contact.name    ?? '',
      email:   contact.email   ?? '',
      phone:   contact.phone   ?? '',
      address: contact.address ?? '',
    },
    project: {
      depth:               input.depth,
      length:              input.length,
      wellType:            input.wellType,
      removeExcavatedMass: input.removeExcavatedMass,
      notes,
    },
    rows: quoteRows
      .filter(r => r.enabled)
      .map(r => ({
        title:     r.title,
        qty:       r.qty,
        unit:      r.unit,
        unitPrice: r.unitPrice,
        lineTotal: r.qty * r.unitPrice,
        category:  r.category,
      })),
    totals,
  }
}

/** Mockad sändning – ersätt med faktisk e-post/API-integration. */
export async function sendQuoteMock(payload) {
  console.log('[DrainageCalculator] Offert payload:', JSON.stringify(payload, null, 2))
  await new Promise(resolve => setTimeout(resolve, 600))
  return { success: true, message: 'Offerten skickades (mock).' }
}

// ─── FORMATTERING ─────────────────────────────────────────────────────────────

export function formatCurrency(value) {
  return new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value ?? 0))
}

// ─── EXEMPELDATA ──────────────────────────────────────────────────────────────
// Testfall baserade på verkliga projekt. Används för att verifiera kalkylmotorn.

export const EXAMPLE_INPUTS = [
  {
    id:    'ex1',
    label: 'Ex 1 – 2.2 m × 35 m (med bortforsling)',
    input: { depth: 2.2, length: 35, wellType: 'bada',      removeExcavatedMass: true  },
  },
  {
    id:    'ex2',
    label: 'Ex 2 – 1.9 m × 34 m (med bortforsling)',
    input: { depth: 1.9, length: 34, wellType: 'dranering', removeExcavatedMass: true  },
  },
  {
    id:    'ex3',
    label: 'Ex 3 – 2.5 m × 20 m (utan bortforsling)',
    input: { depth: 2.5, length: 20, wellType: 'dranering', removeExcavatedMass: false },
  },
  {
    id:    'ex4',
    label: 'Ex 4 – 1.8 m × 30 m (utan bortforsling)',
    input: { depth: 1.8, length: 30, wellType: 'dagvatten', removeExcavatedMass: false },
  },
]
