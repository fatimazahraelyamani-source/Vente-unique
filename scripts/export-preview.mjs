// Produce a self-contained, offline HTML preview from the production build.
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
const files = await readdir('dist/assets')
const js = await readFile(`dist/assets/${files.find(f => f.endsWith('.js'))}`, 'utf8')
let css = await readFile(`dist/assets/${files.find(f => f.endsWith('.css'))}`, 'utf8')
const data = async (path, mime) => `data:${mime};base64,${(await readFile(path)).toString('base64')}`
for (const weight of ['Regular', 'Medium', 'SemiBold']) {
  css = css.replaceAll(`/assets/Poppins-${weight}.ttf`, await data(`public/assets/Poppins-${weight}.ttf`, 'font/ttf'))
}
let script = js.replaceAll('/assets/design-reference.svg', await data('public/assets/design-reference.svg', 'image/svg+xml'))
script = script.replaceAll('/assets/notice-prototype.html', await data('public/assets/notice-prototype.html', 'text/html'))
await mkdir('preview', { recursive: true })
await writeFile('preview/Vente-unique.html', `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vente-unique — Guide d’installation</title><link rel="icon" href="data:,"><style>${css}</style><div id="app"></div><script type="module">${script.replaceAll('</script', '<\\/script')}</script></html>`)
console.log('Preview written to preview/Vente-unique.html — open directly in a browser.')
