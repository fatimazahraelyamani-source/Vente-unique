<script setup>
defineProps({ kind: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 134 82" width="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"
       fill="none" stroke="#8f8f8f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <template v-if="kind === 'door'">
      <rect x="34" y="6" width="42" height="76" fill="#ecebeb" />
      <path d="M76 6 L96 1 V82 H76 Z" fill="#d6d4d4" />
      <path d="M44 46 H66 M48 42 L44 46 L48 50 M62 42 L66 46 L62 50" stroke="#2b2b2b" />
    </template>
    <template v-else-if="kind === 'elevator'">
      <rect x="40" y="12" width="54" height="70" fill="#ecebeb" />
      <rect x="49" y="22" width="36" height="60" fill="#f7f6f6" />
      <rect x="56" y="3" width="22" height="8" fill="#d6d4d4" />
      <rect x="102" y="30" width="7" height="14" rx="2" fill="#d6d4d4" />
      <path d="M52 52 H82 M56 48 L52 52 L56 56 M78 48 L82 52 L78 56" stroke="#2b2b2b" />
    </template>
    <template v-else>
      <path d="M10 80 L42 62 L88 62 V50 H104 V38 H116 V26 H128 V80 Z" fill="#e4e2e2" />
      <path d="M96 4 V28 H124 M104 10 H124" />
      <path d="M44 56 Q58 44 86 48 M82 44 L88 48 L82 52" stroke="#2b2b2b" stroke-dasharray="3 3" />
    </template>
  </svg>
</template>
