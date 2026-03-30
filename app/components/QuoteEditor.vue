<template>
  <div class="flex flex-col h-full w-[90%] mx-auto">

    <!-- ── Rubrik + status ────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between px-5 py-3 border-b border-neutral-200 bg-white shrink-0">
      <div>
        <h2 class="text-base font-semibold text-neutral-800" style="font-family: 'Space Grotesk', sans-serif;">
          Offerteditor
        </h2>
        <p class="text-xs text-neutral-600 mt-0.5">
          Klicka på antal eller à-pris för att justera. Bocka ur rader för att utesluta dem.
        </p>
      </div>
      <div class="text-right">
        <div class="text-xs text-neutral-600">Att betala (inkl. moms)</div>
        <div class="text-xl font-bold text-neutral-800 tabular-nums">
          {{ formatCurrency(totals.totalIncVat) }} kr
        </div>
      </div>
    </div>

    <!-- ── Tabell ─────────────────────────────────────────────────────────── -->
    <div class="flex-1 overflow-y-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 z-10 bg-neutral-100 border-b border-neutral-200">
          <tr>
            <th class="w-8 px-2 py-2"></th>
            <th class="text-left px-3 py-2 font-medium text-neutral-800 text-xs uppercase tracking-wide">Aktivitet</th>
            <th class="text-right px-2 py-2 font-medium text-neutral-800 text-xs uppercase tracking-wide w-20">Antal</th>
            <th class="text-center px-2 py-2 font-medium text-neutral-800 text-xs uppercase tracking-wide w-12">Enhet</th>
            <th class="text-right px-2 py-2 font-medium text-neutral-800 text-xs uppercase tracking-wide w-24">À-pris</th>
            <th class="text-right px-3 py-2 font-medium text-neutral-800 text-xs uppercase tracking-wide w-28">Kostnad</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="category in categoryOrder" :key="category">
            <!-- Kategorirubrik -->
            <tr class="bg-slateSecondary-700">
              <td colspan="6" class="px-3 py-1.5">
                <span class="text-xs font-semibold text-white uppercase tracking-wider">
                  {{ category }}
                </span>
              </td>
            </tr>

            <!-- Rader inom kategorin -->
            <tr
              v-for="row in rowsByCategory[category]"
              :key="row.id"
              class="border-b border-neutral-100 transition-colors"
              :class="row.enabled ? 'hover:bg-neutral-50' : 'opacity-40 bg-neutral-50'"
            >
              <!-- Toggle -->
              <td class="px-2 py-2 text-center">
                <input
                  type="checkbox"
                  :checked="row.enabled"
                  @change="row.enabled = $event.target.checked"
                  class="rounded cursor-pointer accent-slateSecondary-600"
                />
              </td>

              <!-- Titel -->
              <td class="px-3 py-2 text-neutral-700 leading-snug">
                <input
                  v-if="row.editable"
                  type="text"
                  v-model="row.title"
                  :disabled="!row.enabled"
                  class="w-full border border-neutral-200 rounded px-1.5 py-0.5 text-sm focus:outline-none focus:border-slateSecondary-500 disabled:bg-transparent disabled:border-transparent disabled:text-neutral-600"
                  placeholder="Fyll i beskrivning"
                />
                <span v-else>{{ row.title }}</span>
              </td>

              <!-- Antal -->
              <td class="px-2 py-2 text-right">
                <input
                  type="number"
                  :value="row.qty"
                  @change="row.qty = parseFloat($event.target.value) || 0"
                  :disabled="!row.enabled"
                  min="0"
                  step="0.1"
                  class="w-full text-right border border-neutral-200 rounded px-1.5 py-0.5 text-sm tabular-nums focus:outline-none focus:border-slateSecondary-500 disabled:bg-transparent disabled:border-transparent disabled:text-neutral-600"
                />
              </td>

              <!-- Enhet -->
              <td class="px-2 py-2 text-center text-neutral-800 text-xs">
                <select
                  v-if="row.editable"
                  v-model="row.unit"
                  :disabled="!row.enabled"
                  class="border border-neutral-200 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-slateSecondary-500 disabled:bg-transparent disabled:border-transparent disabled:text-neutral-600"
                >
                  <option v-for="u in unitOptions" :key="u" :value="u">{{ u }}</option>
                </select>
                <span v-else>{{ row.unit }}</span>
              </td>

              <!-- À-pris -->
              <td class="px-2 py-2 text-right">
                <input
                  type="number"
                  :value="row.unitPrice"
                  @change="row.unitPrice = parseFloat($event.target.value) || 0"
                  :disabled="!row.enabled"
                  min="0"
                  class="w-full text-right border border-neutral-200 rounded px-1.5 py-0.5 text-sm tabular-nums focus:outline-none focus:border-slateSecondary-500 disabled:bg-transparent disabled:border-transparent disabled:text-neutral-600"
                />
              </td>

              <!-- Radtotal -->
              <td
                class="px-3 py-2 text-right font-medium tabular-nums"
                :class="row.enabled ? 'text-neutral-800' : 'text-neutral-600'"
              >
                {{ formatCurrency(row.qty * row.unitPrice) }}
              </td>
            </tr>

            <!-- Tom kategori -->
            <tr v-if="!rowsByCategory[category] || rowsByCategory[category].length === 0">
              <td colspan="6" class="px-3 py-1.5 text-xs text-neutral-600 italic border-b border-neutral-100">
                Inga rader i denna kategori.
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- ── Fri rad-knapp ─────────────────────────────────────────────── -->
      <div class="px-3 py-2 border-b border-neutral-100">
        <button
          class="text-xs text-slateSecondary-500 hover:text-slateSecondary-800 flex items-center gap-1 transition-colors"
          @click="addCustomRow"
        >
          <span class="text-base leading-none">+</span> Lägg till fri rad
        </button>
      </div>
    </div>

    <!-- ── Summering ──────────────────────────────────────────────────────── -->
    <div class="shrink-0 border-t border-neutral-200 bg-white px-5 py-4">
      <div class="flex justify-end">
        <div class="w-72 space-y-1.5 text-sm">
          <div class="flex justify-between text-neutral-600">
            <span>Summa exkl. moms</span>
            <span class="font-medium tabular-nums">{{ formatCurrency(totals.subtotalExVat) }} kr</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Moms (25 %)</span>
            <span class="font-medium tabular-nums">{{ formatCurrency(totals.vat) }} kr</span>
          </div>
          <div class="flex justify-between font-bold text-base border-t border-neutral-600 pt-2 mt-1">
            <span>Totalt inkl. moms</span>
            <span class="tabular-nums">{{ formatCurrency(totals.totalIncVat) }} kr</span>
          </div>
          <p class="text-xs text-neutral-600 pt-1">
            * ROT-avdrag beräknas i nästa steg vid utskick.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORY_ORDER, formatCurrency, calculateTotals } from '~/lib/drainageCalculator.js'

// ── Props ─────────────────────────────────────────────────────────────────────
// quoteRows är en reaktiv array från DrainageCalculator.vue.
// Mutationer på rad-objekt (row.qty, row.enabled etc.) är tillåtna
// eftersom de sprids via Vue:s reaktivitetssystem uppåt i trädet.
const props = defineProps({
  quoteRows: {
    type:     Array,
    required: true,
  },
})

const emit = defineEmits(['addCustomRow'])

// ── Beräknade totaler ────────────────────────────────────────────────────────
// calculateTotals är ren JS – Vue spårar reaktiva props.quoteRows[].qty / .enabled etc.
const totals = computed(() => calculateTotals(props.quoteRows))

// ── Gruppera rader per kategori ───────────────────────────────────────────────
const categoryOrder = CATEGORY_ORDER

const rowsByCategory = computed(() => {
  const map = {}
  for (const cat of categoryOrder) map[cat] = []
  for (const row of props.quoteRows) {
    if (map[row.category]) map[row.category].push(row)
    else map[row.category] = [row]
  }
  return map
})

// ── Enhetsalternativ för fri rad ─────────────────────────────────────────────
const unitOptions = ['st', 'm', 'm²', 'm³', 'ton', 'tim', 'pkt','rl']

// ── Lägg till fri rad ────────────────────────────────────────────────────────
// Emittas uppåt till föräldern som äger quoteRows-arrayen.
function addCustomRow() {
  emit('addCustomRow')
}
</script>

<style scoped>
/* Dölj pil-knappar i number inputs för renare utseende */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] { -moz-appearance: textfield; }
</style>
