<script setup>
import { computed, ref } from 'vue'
import MeasurementInput from './MeasurementInput.vue'
import { parseMeasure } from '../utils/measure'

const props = defineProps({ space: { type: Object, required: true } })
const emit = defineEmits(['see-compact'])

// Les saisies vivent ici : elles survivent au changement d'onglet (v-show côté parent).
const width = ref('')
const depth = ref('')

const TIGHT_MARGIN_CM = 10 // marge < 10 cm sur un côté => résultat "incertain"
const VW = 400, VH = 260, PAD = 40

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

// Même échelle pour la zone et le meuble.
const zone = computed(() => ready.value ? { w: w.value, d: d.value } : { w: fw.value + 40, d: fd.value + 40 })
const scale = computed(() => Math.min(
  (VW - 2 * PAD) / Math.max(zone.value.w, fw.value),
  (VH - 2 * PAD) / Math.max(zone.value.d, fd.value),
))
const rect = (cw, cd) => ({ x: (VW - cw * scale.value) / 2, y: (VH - cd * scale.value) / 2, w: cw * scale.value, h: cd * scale.value })
const zoneRect = computed(() => rect(zone.value.w, zone.value.d))
const itemRect = computed(() => rect(fw.value, fd.value))
const showLabel = computed(() => itemRect.value.w > 70 && itemRect.value.h > 30)
const ariaLabel = computed(() => ready.value
  ? `Vue de dessus : meuble de ${fw.value} par ${fd.value} cm dans une zone de ${w.value} par ${d.value} cm.`
  : `Vue de dessus : meuble de ${fw.value} par ${fd.value} cm.`)
</script>

<template>
  <div class="space">
    <section>
      <h3 class="title">{{ space.title }}</h3>
      <p class="intro">{{ space.intro }}</p>
    </section>

    <div class="stage">
      <svg :viewBox="`0 0 ${VW} ${VH}`" role="img" :aria-label="ariaLabel" width="100%">
        <rect :x="zoneRect.x" :y="zoneRect.y" :width="zoneRect.w" :height="zoneRect.h"
              fill="#dedcdc" :stroke="status === 'insufficient' ? '#e5160f' : '#8f8f8f'"
              stroke-width="1.2" stroke-dasharray="5 4" />
        <!-- Illustration vue de dessus (lit) ; autres catégories : rectangle générique -->
        <svg :x="itemRect.x" :y="itemRect.y" :width="itemRect.w" :height="itemRect.h"
             viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="98" rx="2" fill="#f4f3f3" stroke="#8f8f8f" stroke-width="1.2" vector-effect="non-scaling-stroke" />
          <template v-if="space.illustration === 'bed'">
            <rect x="1" y="1" width="98" height="5" rx="2" fill="#d8d6d6" stroke="#8f8f8f" stroke-width="1" vector-effect="non-scaling-stroke" />
            <rect x="7" y="9" width="40" height="17" rx="5" fill="#fff" stroke="#b5b5b5" stroke-width="1" vector-effect="non-scaling-stroke" />
            <rect x="53" y="9" width="40" height="17" rx="5" fill="#fff" stroke="#b5b5b5" stroke-width="1" vector-effect="non-scaling-stroke" />
            <path d="M2 34 Q50 40 98 34" fill="none" stroke="#c4c2c2" stroke-width="1" vector-effect="non-scaling-stroke" />
          </template>
        </svg>
        <text v-if="showLabel" :x="VW / 2" :y="VH / 2 + 4" text-anchor="middle" font-size="12" font-weight="500" fill="#1a1a1a" font-family="inherit">
          {{ fw }} x {{ fd }}
        </text>
      </svg>
    </div>

    <div class="inputs">
      <MeasurementInput v-model="width" label="Largeur disponible (cm)" />
      <MeasurementInput v-model="depth" label="Profondeur disponible (cm)" />
    </div>

    <div class="result" role="status" aria-live="polite">
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
.space { display: flex; flex-direction: column; gap: 20px; }
.title { font-size: 13px; font-weight: 500; }
.intro { margin-top: 8px; font-size: 11.5px; color: var(--c-muted); }
.stage { background: var(--c-surface); border-radius: var(--r-card); padding: 4px; }
.stage svg { display: block; max-height: 300px; }
.inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.result { padding: 0 4px; }
.r-title { font-size: 13px; font-weight: 500; }
.r-title.success { color: var(--c-success); }
.r-title.warning { color: var(--c-warning); }
.r-title.error { color: var(--c-error); }
.r-text { margin-top: 8px; font-size: 11.5px; color: var(--c-muted); }
.cta { display: block; margin: 14px auto 0; height: 36px; padding: 0 16px; font-size: 12px; background: #fff; border: 1px solid #8c8c8c; border-radius: 999px; cursor: pointer; }
.cta:hover { border-color: var(--c-text); }
@media (max-width: 340px) { .inputs { grid-template-columns: 1fr; } }
</style>
