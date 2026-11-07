<script setup>
import designReference from '/assets/design-reference.svg?url'
const props = defineProps({ kind: { type: String, required: true } })
const crops = { door: '1059.5 591.5 154 94', elevator: '1223.5 591.5 154 94', stairs: '1387.5 591.5 154 94' }
</script>

<template>
  <svg :viewBox="crops[props.kind]" width="100%" aria-hidden="true" focusable="false">
    <image :href="designReference" width="2601" height="1857" />
  </svg>
</template>
