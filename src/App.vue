<script setup>
import { ref } from 'vue'
import InstallationGuide from './components/InstallationGuide.vue'
import { hopeya } from './data/products'

const message = ref('')
</script>

<template>
  <main class="page">
    <div class="panel">
      <InstallationGuide
        :product="hopeya"
        @see-compact="message = 'Découvrez les modèles plus compacts sur Vente-unique.'"
        
      />
      <p class="demo-status" role="status">{{ message }}</p>
    </div>
  </main>
</template>

<style scoped>
.page { min-height: 100vh; padding: 24px 16px; display: flex; justify-content: center; align-items: flex-start; }
.panel { width: 100%; max-width: 500px; }
.demo-status { margin-top: 12px; font-size: 12px; color: var(--c-muted); min-height: 18px; }
</style>
