/** French decimal input, in centimetres. Empty or invalid values never count as compatible. */
export function parseMeasure(raw) {
  const text = String(raw ?? '').trim()
  if (!text) return { value: null, error: 'Indiquez une valeur supérieure à 0.' }
  if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(text)) return { value: null, error: 'Indiquez un nombre valide.' }
  const value = Number(text.replace(',', '.'))
  if (!Number.isFinite(value) || value <= 0) return { value: null, error: 'Indiquez une valeur supérieure à 0.' }
  return { value, error: '' }
}
