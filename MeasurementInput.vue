<script setup>
import { computed, ref, useId } from 'vue'
import { CircleAlert } from 'lucide-vue-next'
import { parseMeasure } from '../utils/measure'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Valeur' },
  unit: { type: String, default: 'cm' },
  error: { type: String, default: '' }, // erreur imposée par le parent (optionnelle)
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const uid = useId()
const inputId = `${uid}-input`
const errorId = `${uid}-error`
const hintId = `${uid}-hint`

const focused = ref(false)
const ownError = ref('')
const message = computed(() => props.error || ownError.value)

function onInput(e) {
  const v = e.target.value
  emit('update:modelValue', v)
  // Pas de nouvelle erreur pendant la frappe ; une erreur déjà affichée
  // est mise à jour / effacée dès que la valeur devient valide.
  if (ownError.value) ownError.value = parseMeasure(v).error
}
function onFocus(e) { focused.value = true; emit('focus', e) }
function onBlur(e) {
  focused.value = false
  ownError.value = parseMeasure(props.modelValue).error
  emit('blur', e)
}
const describedBy = computed(() => [hintId, message.value ? errorId : ''].filter(Boolean).join(' '))
</script>

<template>
  <div class="field">
    <label class="label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      class="input"
      :class="{ 'is-focused': focused, 'is-error': !!message }"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="message ? 'true' : 'false'"
      :aria-describedby="describedBy"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span :id="hintId" class="sr-only">Valeur en {{ unit }}</span>
    <p v-if="message" :id="errorId" class="error">
      <CircleAlert :size="14" :stroke-width="2.25" aria-hidden="true" />
      <span>{{ message }}</span>
    </p>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; min-width: 0; }
.label { font-size: 13px; font-weight: 500; margin-bottom: 8px; }
.input {
  width: 100%; height: 44px; padding: 0 14px;
  font: inherit; font-size: 14px; color: var(--c-text);
  background: var(--c-surface);
  border: 1px solid #8c8c8c; border-radius: var(--r-input);
  outline: none;
  transition: box-shadow .12s, border-color .12s;
}
.input::placeholder { color: #7a7a7a; }
.input:disabled { opacity: .5; cursor: not-allowed; }
/* Focus piloté par l'état réel focus/blur */
.input.is-focused { border-color: #555; box-shadow: 0 0 0 3px var(--c-focus-ring); }
.input.is-error { border-color: var(--c-error); background: #fbf3f3; }
.input.is-error.is-focused { border-color: var(--c-error); box-shadow: 0 0 0 3px var(--c-error-ring); }
.error { display: flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 11.5px; color: var(--c-error); }
.error svg { flex: none; }
</style>
