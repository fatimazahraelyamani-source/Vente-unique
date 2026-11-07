<script setup>
import { computed, ref } from 'vue'
import MeasurementInput from './MeasurementInput.vue'
import { parseMeasure } from '../utils/measure'

const props = defineProps({ space: { type: Object, required: true } })
const emit = defineEmits(['see-compact'])

// Les saisies vivent ici : elles survivent au changement d'onglet (v-show côté parent).
const width = ref('')
const depth = ref('')

const TIGHT_MARGIN_CM = 10
const fw = computed(() => props.space.footprint.width)
const fd = computed(() => props.space.footprint.depth)
const w = computed(() => parseMeasure(width.value).value)
const d = computed(() => parseMeasure(depth.value).value)
const ready = computed(() => w.value !== null && d.value !== null)

// Pas de rotation dans l'interface : on compare uniquement l'orientation affichée.
const status = computed(() => {
  if (!ready.value) return 'initial'
  const mw = w.value - fw.value
  const md = d.value - fd.value
  if (mw < 0 || md < 0) return 'insufficient'
  if (Math.min(mw, md) < TIGHT_MARGIN_CM) return 'tight'
  return 'compatible'
})

// Preserve the exact Figma bed silhouette (the supplied drawing is schematic,
// not a physical-scale plan). Compare the available space to the bed on each
// axis using the same ratios as the numerical compatibility calculation.
const viewport = { width: 482, height: 350, padding: 40 }
const artwork = { width: 156.432, height: 181.18 }
const zone = computed(() => ({
  width: w.value === null ? 300 : w.value / fw.value * artwork.width,
  height: d.value === null ? 230 : d.value / fd.value * artwork.height,
}))
// Zoom the entire drawing uniformly only when it would exceed the frame.
const scale = computed(() => Math.min(
  1,
  (viewport.width - 2 * viewport.padding) / Math.max(zone.value.width, artwork.width),
  (viewport.height - 2 * viewport.padding) / Math.max(zone.value.height, artwork.height),
))
const bounds = (width, height) => ({
  x: (viewport.width - width * scale.value) / 2,
  y: (viewport.height - height * scale.value) / 2,
  width: width * scale.value,
  height: height * scale.value,
})
const zoneRect = computed(() => bounds(zone.value.width, zone.value.height))
const bedRect = computed(() => bounds(artwork.width, artwork.height))
const ariaLabel = computed(() => ready.value
  ? `Schéma de dessus : meuble de ${fw.value} par ${fd.value} cm dans une zone de ${w.value} par ${d.value} cm.`
  : `Vue de dessus : meuble de ${fw.value} par ${fd.value} cm. Saisissez les dimensions disponibles pour comparer.`)
</script>

<template>
  <div class="space">
    <section>
      <h3 class="title">{{ space.title }}</h3>
      <p class="intro">{{ space.intro }}</p>
    </section>

    <div class="stage">
      <svg viewBox="0 0 482 350" role="img" :aria-label="ariaLabel" width="100%">
        <rect class="available-space" v-bind="zoneRect" rx="10"
              fill="#e3e3e3" stroke="#564345" stroke-opacity="0.501961"
              stroke-width="1" stroke-dasharray="12 12" />
        <svg class="bed" v-bind="bedRect" viewBox="1732.284 483.068 156.432 181.18"
             preserveAspectRatio="xMidYMid meet" aria-hidden="true">
<path d="M1884.21 483.284H1736.79C1734.42 483.284 1732.5 485.203 1732.5 487.57V659.746C1732.5 662.113 1734.42 664.032 1736.79 664.032H1884.21C1886.58 664.032 1888.5 662.113 1888.5 659.746V487.57C1888.5 485.203 1886.58 483.284 1884.21 483.284Z" fill="#D9D9D9" stroke-width="0.431538" stroke="#7A7575" />

<path d="M1884.91 483.284H1736.09C1734.11 483.284 1732.5 484.872 1732.5 486.831V489.668C1732.5 491.627 1734.11 493.215 1736.09 493.215H1884.91C1886.89 493.215 1888.5 491.627 1888.5 489.668V486.831C1888.5 484.872 1886.89 483.284 1884.91 483.284Z" fill="#D9D9D9" stroke-width="0.431538" stroke="#7A7575" />

<path d="M1878.08 498.181H1742.92C1739.93 498.181 1737.5 500.642 1737.5 503.678V653.57C1737.5 656.606 1739.93 659.067 1742.92 659.067H1878.08C1881.07 659.067 1883.5 656.606 1883.5 653.57V503.678C1883.5 500.642 1881.07 498.181 1878.08 498.181Z" fill="#F5F5F5" stroke-width="0.431538" stroke="#D7D5D8" />

<path d="M1739.62 532.429C1739.39 527.905 1741.9 525.524 1747.18 525.286H1875.92C1880.47 525.286 1882.99 527.905 1883.47 533.143L1886.35 554.214C1886.59 557.548 1885.15 559.214 1882.03 559.214C1877.96 558.262 1874.96 557.071 1873.04 555.643H1750.41C1746.58 557.548 1742.62 558.5 1738.55 558.5C1735.67 558.024 1734.83 555.643 1736.03 551.357L1739.62 532.429Z" fill="#F5F5F5" stroke-width="0.431538" stroke="#D7D5D8" />

<path d="M1746.49 489.571C1755.12 491 1760.87 493.143 1773.46 492.786C1786.77 492.429 1795.04 489.929 1805.47 489.929C1802.23 501 1802.59 515.643 1806.18 527.786C1792.16 524.929 1784.61 526.357 1775.26 527.429C1761.95 527.071 1754.4 525.286 1745.41 527.786C1748.65 514.929 1749.01 503.857 1746.49 489.571Z" fill="#F5F5F5" stroke-width="0.431538" stroke="#D7D5D8" />

<path d="M1815.18 489.929C1824.53 491 1831.36 493.143 1844.66 492.786C1857.25 492.429 1866.6 489.929 1875.59 489.571C1872.35 503.143 1872.71 514.214 1875.95 527.786C1864.08 525.286 1857.61 526 1845.38 527.071C1833.16 527.071 1824.53 524.929 1814.46 527.429C1818.05 514.929 1818.05 502.071 1815.18 489.929Z" fill="#F5F5F5" stroke-width="0.431538" stroke="#D7D5D8" />

        </svg>
        <text class="bed-label" x="241" y="197" text-anchor="middle"
              fill="#130c0c" font-size="14" font-weight="600">{{ fd }} x {{ fw }}</text>
      </svg>
    </div>

    <div class="inputs">
      <MeasurementInput v-model="width" label="Largeur disponible (cm)" />
      <MeasurementInput v-model="depth" label="Profondeur disponible (cm)" />
    </div>

    <div class="result" :class="{ 'has-result': status !== 'initial' }" role="status" aria-live="polite">
      <template v-if="status === 'compatible'">
        <p class="r-title success">Les dimensions semblent convenir !</p>
        <p class="r-text">Le meuble tient dans la zone indiquée, mais pensez à l’espace nécessaire pour circuler et aux éventuels obstacles.</p>
      </template>
      <template v-else-if="status === 'tight'">
        <p class="r-title warning">Ça semble rentrer !</p>
        <p class="r-text">Pensez aussi à garder de la place pour circuler et vérifiez les éventuels obstacles.</p>
      </template>
      <template v-else-if="status === 'insufficient'">
        <p class="r-title error">Oups, il manque un peu de place.</p>
        <p class="r-text">{{ space.itemLabel }} semble trop grand pour l’espace indiqué. Vous pouvez explorer des modèles plus compacts.</p>
        <button type="button" class="cta" @click="emit('see-compact')">Voir des modèles plus compacts</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.space { display: flex; flex-direction: column; gap: 24px; }
.title { font-size: 14px; font-weight: 500; }
.intro { margin-top: 6px; font-size: 13px; color: var(--c-muted); }
.stage { background: rgba(197, 185, 187, 0.141176); border-radius: var(--r-card); overflow: hidden; }
.stage > svg { display: block; width: 100%; }
.bed-label { pointer-events: none; }
.inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding: 0 5px; align-items: start; }
.result { display: none; }
.result.has-result { display: block; padding: 16px 8px 8px; }
.r-title { font-size: 14px; font-weight: 500; }
.r-title.success { color: var(--c-success); }
.r-title.warning { color: var(--c-warning); }
.r-title.error { color: var(--c-error); }
.r-text { margin-top: 6px; font-size: 13px; color: var(--c-muted); }
.cta { display: block; margin: 14px auto 0; height: 36px; padding: 0 16px; font-size: 12px; background: #fff; border: 1px solid #8c8c8c; border-radius: 999px; cursor: pointer; }
.cta:hover { border-color: var(--c-text); }
@media (max-width: 340px) { .inputs { grid-template-columns: 1fr; } }
</style>
