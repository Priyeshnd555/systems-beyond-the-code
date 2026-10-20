<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  code: string
}>()

const { isDark } = useData()
const svg = ref('')
const error = ref('')
let renderCount = 0

function sanitizeMermaid(raw: string): string {
  let code = decodeURIComponent(raw)

  // 1. Replace nested brackets inside quotes ["... [ ... ] ..."] -> ["... ( ... ) ..."]
  for (let i = 0; i < 5; i++) {
    code = code.replace(/(\["[^"\]\n]*)\[([^"\]\n]*)\]([^"\n]*"\])/g, '$1($2)$3')
  }

  // 2. Replace ASCII arrows '->' inside quoted strings ["... -> ..."] with Unicode arrow '→'
  code = code.replace(/(\["[^"\n]*?)->([^"\n]*?"\])/g, '$1→$2')
  code = code.replace(/(\["[^"\n]*?)->([^"\n]*?"\])/g, '$1→$2')

  // 3. Fix chained subgraph links
  code = code.replace('Asks --- Spread --- Bids', 'A0 --- Spread\n        Spread --- B0')

  // 4. Quote unquoted edge labels containing special characters: [()<>]
  code = code.replace(/([-\.=>]+\|)([^"\|\n]+)(\|)/g, (edgeMatch, prefix, label, suffix) => {
    let trimmed = label.trim()
    if (/[()<>]/.test(trimmed)) {
      let clean = trimmed.replace(/"/g, "'")
      return `${prefix}"${clean}"${suffix}`
    }
    return edgeMatch
  })

  return code
}

async function renderDiagram() {
  if (typeof window === 'undefined') return
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 13,
      flowchart: {
        htmlLabels: true,
        padding: 20,
        useMaxWidth: true,
        curve: 'basis'
      },
      sequence: {
        useMaxWidth: true,
        actorFontSize: 13,
        messageFontSize: 13
      },
      themeVariables: {
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '13px'
      }
    })

    const sanitized = sanitizeMermaid(props.code)
    const id = `mermaid-${Math.random().toString(36).substring(2, 9)}-${++renderCount}`
    const result = await mermaid.render(id, sanitized)
    svg.value = result.svg
    error.value = ''
  } catch (err: any) {
    console.warn('Mermaid diagram render notice:', err)
    error.value = err?.message || 'Failed to render diagram'
  }
}

onMounted(() => {
  renderDiagram()
})

watch(isDark, () => {
  renderDiagram()
})
</script>

<template>
  <div class="mermaid-wrapper">
    <div v-if="svg" class="mermaid-diagram" v-html="svg" />
    <div v-else-if="error" class="mermaid-error">
      <span class="error-badge">Diagram Notice</span>
      <p class="error-msg">Diagram rendering encountered an issue</p>
      <pre>{{ error }}</pre>
    </div>
    <div v-else class="mermaid-loading">
      <span>Rendering architecture diagram...</span>
    </div>
  </div>
</template>

<style scoped>
.mermaid-wrapper {
  margin: 1.75rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  padding: 1.5rem 1rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.15);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.mermaid-wrapper:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 24px -2px rgba(59, 130, 246, 0.2);
}

.mermaid-diagram {
  width: 100%;
  display: flex;
  justify-content: center;
}

.mermaid-diagram :deep(svg) {
  max-width: 100% !important;
  height: auto !important;
}

.mermaid-loading {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding: 1rem;
}

.mermaid-error {
  width: 100%;
  padding: 1rem;
  color: var(--vp-c-danger-1);
}

.error-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
  padding: 2px 8px;
  border-radius: 4px;
}

.error-msg {
  font-size: 0.85rem;
  margin: 0.5rem 0 0.25rem;
  color: var(--vp-c-text-2);
}

.mermaid-error pre {
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
