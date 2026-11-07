<script setup>
import { computed, nextTick, ref, useId } from 'vue'
import { ChevronDown, ChevronUp, ClipboardCheck, Ruler, Truck, Wrench } from 'lucide-vue-next'
import DeliveryInfo from './DeliveryInfo.vue'
import SpaceCheck from './SpaceCheck.vue'
import AssemblyInfo from './AssemblyInfo.vue'

const props = defineProps({ product: { type: Object, required: true } })
const emit = defineEmits(['see-compact', 'see-delivery'])

const guide = computed(() => props.product.installationGuide)
const uid = useId()
const panelId = `${uid}-panel`

const open = ref(false) // replié par défaut
const active = ref('delivery')
const tabs = [
  { id: 'delivery', label: 'Livraison', icon: Truck },
  { id: 'space', label: 'Mon espace', icon: Ruler },
  { id: 'assembly', label: 'Montage', icon: Wrench },
]
const tabEls = ref({})
const tabId = (id) => `${uid}-tab-${id}`
const tabPanelId = (id) => `${uid}-tabpanel-${id}`

async function select(id, focus = false) {
  active.value = id
  if (focus) { await nextTick(); tabEls.value[id]?.focus() }
}
function onKeydown(e) {
  const i = tabs.findIndex((t) => t.id === active.value)
  let n = null
  if (e.key === 'ArrowRight') n = (i + 1) % tabs.length
  else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length
  else if (e.key === 'Home') n = 0
  else if (e.key === 'End') n = tabs.length - 1
  if (n === null) return
  e.preventDefault()
  select(tabs[n].id, true)
}
</script>

<template>
  <section class="guide">
    <h2 class="heading">
      <button type="button" class="header" :aria-expanded="open" :aria-controls="panelId" @click="open = !open">
        <ClipboardCheck class="lead" :size="18" :stroke-width="1.75" aria-hidden="true" />
        <span class="texts">
          <span class="h-title">{{ guide.title }}</span>
          <span class="h-sub">{{ guide.subtitle }}</span>
        </span>
        <component :is="open ? ChevronUp : ChevronDown" class="chev" :size="18" :stroke-width="2" aria-hidden="true" />
      </button>
    </h2>

    <!-- v-show : l'état des onglets (mesures saisies) est conservé -->
    <div v-show="open" :id="panelId" class="body" role="region" :aria-label="guide.title">
      <div class="tabs" role="tablist" aria-label="Informations d'installation" @keydown="onKeydown">
        <button
          v-for="t in tabs" :key="t.id" :id="tabId(t.id)"
          :ref="(el) => (tabEls[t.id] = el)"
          type="button" role="tab" class="tab"
          :class="{ 'is-selected': active === t.id }"
          :aria-selected="active === t.id"
          :aria-controls="tabPanelId(t.id)"
          :tabindex="active === t.id ? 0 : -1"
          @click="select(t.id)"
        >
          <component :is="t.icon" :size="18" :stroke-width="1.75" aria-hidden="true" />
          <span>{{ t.label }}</span>
        </button>
      </div>

      <hr class="divider" />

      <div v-show="active === 'delivery'" :id="tabPanelId('delivery')" role="tabpanel" :aria-labelledby="tabId('delivery')" tabindex="0">
        <DeliveryInfo :delivery="guide.delivery" />
      </div>
      <div v-show="active === 'space'" :id="tabPanelId('space')" role="tabpanel" :aria-labelledby="tabId('space')" tabindex="0">
        <SpaceCheck :space="guide.space" @see-compact="emit('see-compact')" />
      </div>
      <div v-show="active === 'assembly'" :id="tabPanelId('assembly')" role="tabpanel" :aria-labelledby="tabId('assembly')" tabindex="0">
        <AssemblyInfo :assembly="guide.assembly" @see-delivery="emit('see-delivery')" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.guide { background: #fff; border: 1px solid var(--c-border); border-radius: var(--r-card); }
.guide:hover { border-color: var(--c-border-strong); }
.heading { font-size: inherit; font-weight: inherit; }
.header { display: flex; align-items: flex-start; gap: 16px; width: 100%; padding: 18px 20px; text-align: left; background: none; border: 0; border-radius: var(--r-card); cursor: pointer; }
.lead { flex: none; margin-top: 1px; }
.texts { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.h-title { font-size: 14px; font-weight: 500; }
.h-sub { font-size: 12px; color: var(--c-muted); }
.chev { flex: none; margin-top: 1px; }
.body { padding: 0 20px 20px; }
.tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.tab { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 14px 12px; font-size: 13px; background: #fff; border: 1px solid var(--c-border); border-radius: var(--r-tile); cursor: pointer; text-align: left; }
.tab:hover { border-color: #6f6f6f; }
/* L'état sélectionné est défini après :hover et reste identique au survol */
.tab.is-selected, .tab.is-selected:hover { background: var(--c-surface); border-color: var(--c-border-strong); box-shadow: 0 0 0 .5px var(--c-border-strong); }
.divider { border: 0; border-top: 1px solid var(--c-divider); margin: 18px 0 20px; }
[role='tabpanel']:focus-visible { outline-offset: 6px; border-radius: 8px; }
@media (max-width: 380px) { .header { padding: 16px; } .body { padding: 0 16px 16px; } .tab { padding: 12px 8px; font-size: 12px; } }
</style>
