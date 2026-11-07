<script setup>
import { computed, ref, useId } from 'vue'
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
    <div class="control" :class="{ 'is-focused': focused, 'is-error': !!message }">
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
    </div>
    <span :id="hintId" class="sr-only">Valeur en {{ unit }}</span>
    <p v-if="message" :id="errorId" class="error">
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <circle cx="10" cy="10" r="6.25" fill="#e5002d" />
        <path d="M10 7.5V10M10 12.5h.0062" stroke="white" stroke-width="1" stroke-linecap="round" />
      </svg>
      <span>{{ message }}</span>
    </p>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; min-width: 0; }
.label { font-size: 14px; line-height: 22px; font-weight: 600; margin-bottom: 12px; color: #000; }
.control { position: relative; border-radius: 15px; }
/* Figma: a 226 × 49 field, a 236 × 59 focus ring, and a 3px clear gap. */
.control::after { content: ''; position: absolute; inset: -5px; border: 2px solid transparent; border-radius: 18px; pointer-events: none; }
.control.is-focused::after { border-color: rgba(86, 67, 69, 0.501961); }
.control.is-error.is-focused::after { border-color: #ffccd6; }
.input {
  display: block; appearance: none; width: 100%; height: 49px; padding: 0 12px;
  font-family: inherit; font-size: 14px; line-height: 22px; font-weight: 400; color: var(--c-text);
  background: rgba(197, 185, 187, 0.141176);
  border: 1px solid #757575; border-radius: 15px;
  outline: none; box-shadow: none;
}
.input::placeholder { color: #6c757d; opacity: 1; }
.input:focus-visible { outline: none; }
.input:disabled { opacity: .5; cursor: not-allowed; }
.input.is-error { border-color: #ec221f; }
.error { display: flex; align-items: flex-start; align-self: center; width: max-content; max-width: calc(100% + 9.05px); gap: 0; margin-top: 13px; font-size: 12px; line-height: 20px; font-weight: 400; color: #ec221f; }
.control.is-focused + .sr-only + .error { margin-top: 15px; }
.error svg { flex: none; }
</style>
