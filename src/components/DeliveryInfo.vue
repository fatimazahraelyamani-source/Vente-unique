<script setup>
import { Package } from 'lucide-vue-next'
import DeliveryIllustration from './DeliveryIllustration.vue'
defineProps({ delivery: { type: Object, required: true } })
</script>

<template>
  <div class="delivery">
    <section>
      <h3 class="title">{{ delivery.title }}</h3>
      <p class="intro">{{ delivery.intro }}</p>
      <div class="parcel">
        <Package :size="18" :stroke-width="1.75" aria-hidden="true" />
        <dl class="parcel-data">
          <div>
            <dt>Colis le plus grand</dt>
            <dd>{{ delivery.largestParcel }}</dd>
          </div>
          <div>
            <dt>Poids max</dt>
            <dd>{{ delivery.maxWeight }}</dd>
          </div>
        </dl>
      </div>
      <p class="note">{{ delivery.note }}</p>
    </section>

    <hr class="divider" />

    <section>
      <h3 class="title">{{ delivery.checksTitle }}</h3>
      <ul class="checks">
        <li v-for="c in delivery.checks" :key="c.id" class="check">
          <div class="tile"><DeliveryIllustration :kind="c.illustration" /></div>
          <h4>{{ c.title }}</h4>
          <p>{{ c.text }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.delivery { display: flex; flex-direction: column; gap: 26px; }
.title { font-size: 14px; font-weight: 500; }
.intro { margin-top: 8px; font-size: 13px; color: var(--c-muted); }
.parcel { display: flex; gap: 14px; align-items: flex-start; margin-top: 24px; padding: 16px 20px; background: var(--c-surface); border-radius: var(--r-card); }
.parcel > svg { flex: none; margin-top: 2px; }
.parcel-data { display: grid; grid-template-columns: 1.4fr 1fr; gap: 12px; margin: 0; flex: 1; }
dt { font-size: 12px; color: var(--c-muted); }
dd { margin: 6px 0 0; font-size: 14px; font-weight: 600; }
.note { margin-top: 24px; font-size: 13px; color: var(--c-muted); }
.divider { border: 0; border-top: 1px solid var(--c-divider); margin: 0; width: 100%; }
.checks { list-style: none; margin: 24px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.tile { aspect-ratio: 154 / 94; border-radius: 10px; background: var(--c-surface); overflow: hidden; }
.check h4 { margin: 12px 0 8px; font-size: 14px; font-weight: 600; }
.check p { font-size: 12px; color: var(--c-muted); line-height: 1.45; }

</style>
