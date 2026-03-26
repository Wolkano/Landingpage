<template>
  <div class="min-h-screen bg-neutral-100">
    <!-- Toolbar -->
    <div class="sticky top-0 z-20 bg-white border-b border-neutral-200 px-5 py-3 flex justify-between items-center shadow-sm">
      <h1 class="text-lg font-bold text-neutral-800">Offertverktyg — Byggproffs Skåne</h1>
      <div class="flex gap-2">
        <button
          class="text-sm border border-neutral-300 rounded px-3 py-1.5 hover:bg-neutral-50 flex items-center gap-1.5"
          @click="printProposal"
        >
          🖨️ Skriv ut offert
        </button>
      </div>
    </div>

    <!-- Two-panel layout -->
    <div class="flex h-[calc(100vh-53px)]">

      <!-- ─── LEFT: Input Panel ─────────────────────────────────────────── -->
      <div class="w-[420px] shrink-0 overflow-y-auto border-r border-neutral-200 bg-neutral-50 p-4 space-y-3">

        <!-- Project Info -->
        <div class="bg-white rounded-lg border border-neutral-200 p-4">
          <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Projektinformation</h2>
          <div class="space-y-2">
            <div>
              <label class="text-xs text-neutral-500 block mb-0.5">Kundens namn</label>
              <input v-model="project.customerName" placeholder="För- och efternamn" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label class="text-xs text-neutral-500 block mb-0.5">Kundens adress</label>
              <input v-model="project.customerAddress" placeholder="Gatuadress, postnummer, ort" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label class="text-xs text-neutral-500 block mb-0.5">Arbetsadress (om annan)</label>
              <input v-model="project.projectAddress" placeholder="Projektets adress" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-xs text-neutral-500 block mb-0.5">Offertdatum</label>
                <input v-model="project.date" type="date" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label class="text-xs text-neutral-500 block mb-0.5">Giltig till</label>
                <input v-model="project.validUntil" type="date" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            <div>
              <label class="text-xs text-neutral-500 block mb-0.5">Vår referens</label>
              <input v-model="project.ourRef" class="w-full border border-neutral-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400" />
            </div>
          </div>
        </div>

        <!-- ROT + Labor settings -->
        <div class="bg-white rounded-lg border border-neutral-200 p-4">
          <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Beräkningsinställningar</h2>
          <div class="space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="includeROT" class="rounded" />
              <span class="text-sm">Inkludera ROT-avdrag (30%)</span>
            </label>
            <div v-if="includeROT">
              <label class="text-xs text-neutral-500 block mb-0.5">Andel ROT-berättigat arbete (%)</label>
              <div class="flex items-center gap-2">
                <input type="range" v-model.number="laborRatioPct" min="0" max="100" step="1" class="flex-1" />
                <span class="text-sm font-medium w-10 text-right">{{ laborRatioPct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sections -->
        <div
          v-for="section in sections"
          :key="section.id"
          class="bg-white rounded-lg border border-neutral-200 overflow-hidden"
        >
          <!-- Section header -->
          <label class="flex items-center gap-2.5 p-3 bg-neutral-50 border-b border-neutral-200 cursor-pointer select-none">
            <input type="checkbox" v-model="section.enabled" class="rounded shrink-0" />
            <span class="text-sm font-medium flex-1">{{ section.id }}. {{ section.name }}</span>
            <span
              class="text-xs font-semibold tabular-nums"
              :class="section.enabled ? 'text-neutral-700' : 'text-neutral-300'"
            >
              {{ formatCurrency(sectionTotal(section)) }} kr
            </span>
          </label>

          <!-- Items -->
          <div v-if="section.enabled" class="divide-y divide-neutral-100">
            <div v-for="item in section.items" :key="item.id" class="px-3 py-2 flex items-center gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-neutral-700 leading-tight">{{ item.description }}</p>
                <p class="text-xs text-neutral-400 mt-0.5">{{ formatCurrency(item.unitPrice) }} kr/{{ item.unit }}</p>
              </div>
              <input
                type="number"
                v-model.number="item.qty"
                :min="0"
                class="w-16 border border-neutral-200 rounded px-1.5 py-1 text-xs text-right focus:outline-none focus:border-blue-400"
              />
              <span class="text-xs text-neutral-400 w-5 shrink-0">{{ item.unit }}</span>
              <span class="text-xs font-semibold text-neutral-700 w-20 text-right tabular-nums">
                {{ formatCurrency(item.qty * item.unitPrice) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Totals summary in left panel -->
        <div class="bg-white rounded-lg border border-neutral-200 p-4">
          <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Sammanfattning</h2>
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between">
              <span class="text-neutral-600">Summa exkl. moms</span>
              <span class="font-medium tabular-nums">{{ formatCurrency(grandTotal) }} kr</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-600">Moms (25%)</span>
              <span class="font-medium tabular-nums">{{ formatCurrency(vat) }} kr</span>
            </div>
            <div class="flex justify-between font-semibold border-t border-neutral-200 pt-1.5 mt-1">
              <span>Summa inkl. moms</span>
              <span class="tabular-nums">{{ formatCurrency(totalInclVat) }} kr</span>
            </div>
            <template v-if="includeROT">
              <div class="flex justify-between text-neutral-500 text-xs">
                <span>ROT-berättigat arbete</span>
                <span class="tabular-nums">{{ formatCurrency(rotEligible) }} kr</span>
              </div>
              <div class="flex justify-between text-green-700 font-medium">
                <span>ROT-avdrag (30%)</span>
                <span class="tabular-nums">−{{ formatCurrency(rotDeduction) }} kr</span>
              </div>
              <div class="flex justify-between font-bold text-base border-t-2 border-neutral-800 pt-1.5 mt-1">
                <span>Att betala</span>
                <span class="tabular-nums">{{ formatCurrency(finalAmount) }} kr</span>
              </div>
            </template>
          </div>
        </div>

      </div><!-- end left panel -->

      <!-- ─── RIGHT: Proposal Preview ───────────────────────────────────── -->
      <div class="flex-1 overflow-y-auto bg-neutral-300 p-8">
        <div
          id="proposal-document"
          class="bg-white shadow-2xl max-w-[820px] mx-auto print:shadow-none print:max-w-full"
          style="padding: 56px 64px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        >
          <!-- Document header -->
          <div class="flex justify-between items-start mb-10">
            <div>
              <div class="text-3xl font-bold text-neutral-800 tracking-tight">Byggproffs Skåne</div>
              <div
                contenteditable="true"
                class="text-sm text-neutral-400 mt-1 outline-none border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors min-w-[200px]"
                @blur="e => project.companyTagline = (e.target as HTMLElement).innerText"
              >{{ project.companyTagline }}</div>
            </div>
            <div class="text-right">
              <div class="text-4xl font-extralight text-neutral-300 uppercase tracking-widest">Offert</div>
              <div class="text-sm text-neutral-500 mt-2">
                Datum:
                <span class="font-medium text-neutral-700">{{ formatDate(project.date) }}</span>
              </div>
              <div v-if="project.validUntil" class="text-sm text-neutral-500">
                Giltig till:
                <span class="font-medium text-neutral-700">{{ formatDate(project.validUntil) }}</span>
              </div>
              <div class="text-sm text-neutral-500 mt-1">
                Vår ref:
                <span
                  contenteditable="true"
                  class="font-medium text-neutral-700 outline-none border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
                  @blur="e => project.ourRef = (e.target as HTMLElement).innerText"
                >{{ project.ourRef }}</span>
              </div>
            </div>
          </div>

          <!-- Customer / Project info grid -->
          <div class="grid grid-cols-2 gap-6 mb-8 p-5 bg-neutral-50 rounded-lg border border-neutral-100">
            <div>
              <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Kund</p>
              <div
                contenteditable="true"
                class="text-sm text-neutral-700 leading-relaxed outline-none min-h-[48px] border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
                @blur="e => project.customerName = (e.target as HTMLElement).innerText"
              >{{ project.customerName || 'Kundens namn' }}</div>
              <div
                contenteditable="true"
                class="text-sm text-neutral-500 leading-relaxed outline-none mt-1 border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
                @blur="e => project.customerAddress = (e.target as HTMLElement).innerText"
              >{{ project.customerAddress || 'Gatuadress, Postnummer Ort' }}</div>
            </div>
            <div>
              <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Arbetsadress</p>
              <div
                contenteditable="true"
                class="text-sm text-neutral-700 leading-relaxed outline-none min-h-[48px] border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
                @blur="e => project.projectAddress = (e.target as HTMLElement).innerText"
              >{{ project.projectAddress || 'Projektets adress' }}</div>
            </div>
          </div>

          <!-- Intro text (fully editable) -->
          <div class="mb-8">
            <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Offertbeskrivning</p>
            <textarea
              v-model="project.introText"
              rows="3"
              class="w-full text-sm text-neutral-600 leading-relaxed resize-none border-0 outline-none bg-transparent border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
              placeholder="Beskrivning av projektet och uppdraget..."
            />
          </div>

          <!-- Section tables -->
          <div v-for="section in enabledSections" :key="section.id" class="mb-7">
            <!-- Section heading (editable) -->
            <div class="flex items-center gap-2 mb-0">
              <div class="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-t text-sm font-semibold">
                <span class="text-neutral-400 mr-2">{{ section.id }}.</span>
                <span
                  contenteditable="true"
                  class="outline-none border-b border-transparent hover:border-white/30 focus:border-white transition-colors"
                  @blur="e => section.name = (e.target as HTMLElement).innerText"
                >{{ section.name }}</span>
              </div>
            </div>
            <table class="w-full text-sm border border-neutral-200 border-t-0">
              <thead>
                <tr class="bg-neutral-50 text-xs text-neutral-500 border-b border-neutral-200">
                  <th class="text-left px-3 py-2 font-medium">Aktivitet</th>
                  <th class="text-right px-3 py-2 font-medium w-16">Mängd</th>
                  <th class="text-center px-2 py-2 font-medium w-12">Enhet</th>
                  <th class="text-right px-3 py-2 font-medium w-24">À-pris exkl.</th>
                  <th class="text-right px-3 py-2 font-medium w-28">Kostnad exkl.</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                <tr
                  v-for="item in section.items.filter(i => i.qty > 0)"
                  :key="item.id"
                  class="hover:bg-neutral-50/50 transition-colors"
                >
                  <td class="px-3 py-2">
                    <span
                      contenteditable="true"
                      class="outline-none border-b border-transparent hover:border-blue-200 focus:border-blue-400 transition-colors"
                      @blur="e => item.description = (e.target as HTMLElement).innerText"
                    >{{ item.description }}</span>
                  </td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ item.qty }}</td>
                  <td class="px-2 py-2 text-center text-neutral-400 text-xs">{{ item.unit }}</td>
                  <td class="px-3 py-2 text-right tabular-nums text-neutral-500">{{ formatCurrency(item.unitPrice) }}</td>
                  <td class="px-3 py-2 text-right tabular-nums font-medium">{{ formatCurrency(item.qty * item.unitPrice) }}</td>
                </tr>
                <tr v-if="section.items.filter(i => i.qty > 0).length === 0">
                  <td colspan="5" class="px-3 py-2 text-xs text-neutral-400 italic">Inga poster med angiven mängd</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-neutral-50 border-t border-neutral-200">
                  <td colspan="4" class="px-3 py-2 text-sm font-semibold text-neutral-600">Delsumma exkl. moms</td>
                  <td class="px-3 py-2 text-right font-bold tabular-nums">{{ formatCurrency(sectionTotal(section)) }} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Financial summary -->
          <div class="mt-10 flex justify-end">
            <div class="w-72">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Summa exkl. moms</span>
                  <span class="font-medium tabular-nums">{{ formatCurrency(grandTotal) }} kr</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Moms 25%</span>
                  <span class="font-medium tabular-nums">{{ formatCurrency(vat) }} kr</span>
                </div>
                <div class="flex justify-between text-base font-bold border-t border-neutral-300 pt-2 mt-1">
                  <span>Summa inkl. moms</span>
                  <span class="tabular-nums">{{ formatCurrency(totalInclVat) }} kr</span>
                </div>
                <template v-if="includeROT">
                  <div class="flex justify-between text-sm text-neutral-500 pt-2">
                    <span>Varav ROT-berättigat arbete</span>
                    <span class="tabular-nums">{{ formatCurrency(rotEligible) }} kr</span>
                  </div>
                  <div class="flex justify-between text-sm font-medium text-green-700">
                    <span>ROT-avdrag 30%</span>
                    <span class="tabular-nums">−{{ formatCurrency(rotDeduction) }} kr</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold border-t-2 border-neutral-800 pt-2 mt-1">
                    <span>Summa att betala</span>
                    <span class="tabular-nums">{{ formatCurrency(finalAmount) }} kr</span>
                  </div>
                  <p class="text-xs text-neutral-400 mt-1">
                    *ROT-avdrag ansöks av Byggproffs Skåne och dras direkt från fakturabeloppet.
                  </p>
                </template>
              </div>
            </div>
          </div>

          <!-- Terms / Notes (editable) -->
          <div class="mt-10 pt-6 border-t border-neutral-200">
            <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Villkor och noteringar</p>
            <textarea
              v-model="project.notes"
              rows="5"
              class="w-full text-sm text-neutral-600 leading-relaxed resize-none border-0 outline-none bg-transparent"
            />
          </div>

          <!-- Signature area -->
          <div class="mt-10 grid grid-cols-2 gap-10">
            <div>
              <div class="border-b-2 border-neutral-300 h-14 mb-2"></div>
              <p class="text-xs text-neutral-400">Datum och underskrift — Byggproffs Skåne</p>
            </div>
            <div>
              <div class="border-b-2 border-neutral-300 h-14 mb-2"></div>
              <p class="text-xs text-neutral-400">Datum och underskrift — Kund</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-10 pt-4 border-t border-neutral-100 text-xs text-neutral-300 flex justify-between">
            <span>Byggproffs Skåne AB</span>
            <span>Offert genererad {{ formatDate(project.date) }}</span>
          </div>

        </div><!-- end proposal document -->
      </div><!-- end right panel -->

    </div><!-- end two-panel -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// ── Project info ──────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0]
const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

const project = reactive({
  customerName: '',
  customerAddress: '',
  projectAddress: '',
  date: today,
  validUntil: thirtyDays,
  ourRef: 'Byggproffs Skåne',
  companyTagline: 'Professionella byggtjänster i Skåne',
  introText: 'Vi tackar för förfrågan och lämnar härmed följande offert på begärda arbeten. Priset inkluderar allt material, maskinhyra och arbetskostnad enligt specifikationen nedan.',
  notes: `• Offerten gäller i 30 dagar från offertdatum.
• Betalningsvillkor: 30 dagar netto efter fakturadatum.
• Eventuella tilläggsarbeten faktureras separat efter skriftligt godkännande.
• Byggproffs Skåne innehar F-skattsedel och är anslutna till kollektivavtal.
• Vid ROT-avdrag krävs att beställaren är folkbokförd på fastigheten.`,
})

// ── Calculation settings ───────────────────────────────────────────────────────
const includeROT = ref(true)
const laborRatioPct = ref(70)

// ── Sections & items ───────────────────────────────────────────────────────────
let itemId = 0
const mkItem = (description: string, qty: number, unit: string, unitPrice: number) =>
  ({ id: ++itemId, description, qty, unit, unitPrice })

const sections = reactive([
  {
    id: 1,
    name: 'Maskinflytt och etablering',
    enabled: true,
    items: [
      mkItem('Flytt av maskiner och verktyg', 1, 'st', 2900),
      mkItem('Framkörningsavgift', 10, 'st', 450),
    ],
  },
  {
    id: 2,
    name: 'Schakt',
    enabled: true,
    items: [
      mkItem('Grävning vid husgrunden', 35, 'm', 1250),
    ],
  },
  {
    id: 3,
    name: 'Dränering och grundisolering',
    enabled: true,
    items: [
      mkItem('Förbehandling av grundmur', 75, 'm2', 210),
      mkItem('Anläggning dräneringsrör DSA 110', 35, 'm', 499),
      mkItem('Inspektionsrör till dränering', 2, 'st', 1190),
      mkItem('Montering isoleringsskiva 100 mm', 85, 'm2', 510),
      mkItem('Tilläggsisolering isoleringsskiva 200 mm', 48, 'm2', 379),
      mkItem('Montering kantlist', 42, 'm2', 289),
      mkItem('Böjar till dräneringsröret', 4, 'st', 169),
    ],
  },
  {
    id: 4,
    name: 'Omläggning av dagvattenledning',
    enabled: true,
    items: [
      mkItem('Anläggning av dagvattenrör', 35, 'm', 256),
      mkItem('Anslutning av stuprör till dagvattenledningen', 4, 'st', 399),
      mkItem('Diverse kopplingar till dagvattenledning', 4, 'st', 670),
    ],
  },
  {
    id: 5,
    name: 'Omläggning av avloppsledning',
    enabled: false,
    items: [
      mkItem('Grävning för avloppsledning', 0, 'm', 890),
      mkItem('Anläggning av 110 mm avloppsrör', 0, 'm', 534),
      mkItem('Spolbrunn till avloppsledning', 0, 'st', 2100),
      mkItem('Återfyllnad med befintliga schaktmassor', 0, 'm', 290),
    ],
  },
  {
    id: 6,
    name: 'Omläggning av inkommande kallvattenrör',
    enabled: false,
    items: [
      mkItem('Grävning för kallvattenservis 1–1,6 m', 0, 'm', 620),
      mkItem('32 mm PEM-rör till kallvatten', 0, 'm', 569),
      mkItem('Montering av vattenmätarekonsol', 0, 'st', 5489),
      mkItem('Återfyllnad med befintliga schaktmassor', 0, 'm', 290),
    ],
  },
  {
    id: 7,
    name: 'Anläggning av brunnar',
    enabled: true,
    items: [
      mkItem('Dagvattenbrunn med sandfång och vattenlås', 1, 'st', 4100),
      mkItem('Dräneringsbrunn 600 mm 3M inkl. pump', 1, 'st', 17200),
    ],
  },
  {
    id: 8,
    name: 'Värmepumpen',
    enabled: false,
    items: [
      mkItem('Av- och påkoppling av värmepump', 0, 'st', 12000),
      mkItem('Betongplatta under värmepumpen', 0, 'st', 5400),
      mkItem('Golvbrunn gjutjärn utomhus', 0, 'st', 1500),
    ],
  },
  {
    id: 9,
    name: 'Återfyllning och städning',
    enabled: true,
    items: [
      mkItem('Återfyllnad med befintliga schaktmassor', 35, 'm', 329),
      mkItem('Städning och bortforsling av byggavfall', 1, 'st', 2247),
    ],
  },
  {
    id: 10,
    name: 'Bortforsling av schaktmassor',
    enabled: true,
    items: [
      mkItem('Bortforsling av schaktmassor', 4, 'st', 4990),
      mkItem('Lastning av containrar', 4, 'st', 1940),
    ],
  },
  {
    id: 11,
    name: 'Finplanering',
    enabled: true,
    items: [
      mkItem('Finplanering — arbetskostnad per kvm', 88, 'm2', 178),
      mkItem('Bärlager 0–30', 28, 'ton', 390),
      mkItem('Matjord', 0, 'ton', 412),
      mkItem('Fraktkostnader', 1, 'st', 1780),
    ],
  },
])

// ── Helpers ───────────────────────────────────────────────────────────────────
function sectionTotal(section: typeof sections[0]): number {
  if (!section.enabled) return 0
  return section.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return ''
  try {
    return new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

// ── Computed totals ───────────────────────────────────────────────────────────
const enabledSections = computed(() => sections.filter(s => s.enabled))

const grandTotal = computed(() =>
  sections.reduce((sum, s) => sum + sectionTotal(s), 0)
)

const vat = computed(() => grandTotal.value * 0.25)
const totalInclVat = computed(() => grandTotal.value * 1.25)

const rotEligible = computed(() =>
  totalInclVat.value * (laborRatioPct.value / 100)
)

const rotDeduction = computed(() => rotEligible.value * 0.30)

const finalAmount = computed(() =>
  includeROT.value ? totalInclVat.value - rotDeduction.value : totalInclVat.value
)

// ── Print ─────────────────────────────────────────────────────────────────────
function printProposal() {
  window.print()
}
</script>

<style>
@media print {
  body > * { display: none !important; }
  #proposal-document {
    display: block !important;
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    padding: 32px 48px;
  }
}
</style>
