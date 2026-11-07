<script setup>
import { Clock, Users, Wrench, Info } from 'lucide-vue-next'
defineProps({ assembly: { type: Object, required: true } })
const icons = { clock: Clock, users: Users, wrench: Wrench }
const emit = defineEmits(['see-delivery'])
</script>

<template>
  <div class="assembly">
    <section>
      <h3 class="title">{{ assembly.title }}</h3>
      <p class="intro">{{ assembly.intro }}</p>
      <dl class="stats">
        <div v-for="s in assembly.stats" :key="s.id" class="stat">
          <component :is="icons[s.icon]" :size="16" :stroke-width="1.75" aria-hidden="true" />
          <dd>{{ s.value }}</dd>
          <dt>{{ s.label }}</dt>
        </div>
      </dl>
      <a class="link manual" :href="assembly.manual.href">
        <Info :size="14" :stroke-width="1.75" aria-hidden="true" />
        {{ assembly.manual.label }}
      </a>
    </section>

    <hr class="divider" />

    <section class="service">
      <h3 class="title">{{ assembly.service.title }}</h3>
      <p class="intro">{{ assembly.service.text }}</p>
      <a class="link" :href="assembly.service.href" @click.prevent="emit('see-delivery')">
        {{ assembly.service.linkLabel }}
      </a>
    </section>
  </div>
</template>

<style scoped>
.assembly { display: flex; flex-direction: column; gap: 18px; }
.title { font-size: 14px; font-weight: 500; }
.intro { margin-top: 8px; font-size: 13px; color: var(--c-muted); }
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin: 16px 0 0; padding: 16px 14px; background: var(--c-surface); border-radius: var(--r-card); }
.stat { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
.stat dd { order: 2; margin: 12px 0 0; font-size: 14px; font-weight: 600; }
.stat dt { order: 3; margin-top: 8px; font-size: 12px; color: var(--c-muted); }
.link { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 13px; color: var(--c-text); text-decoration: underline; }
.service .link { margin-top: 8px; }
.divider { border: 0; border-top: 1px solid var(--c-divider); margin: 0; width: 100%; }
</style>
