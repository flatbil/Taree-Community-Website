<template>
  <div class="content" v-html="html"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  markdownPath: {
    type: String,
    required: true
  }
})

const html = ref('')

async function loadMarkdown(path) {
  html.value = '<p>Loading...</p>'
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    html.value = marked.parse(text)
  } catch (e) {
    html.value = `<p>Error loading content: ${e.message}</p>`
  }
}

onMounted(() => loadMarkdown(props.markdownPath))
watch(() => props.markdownPath, (p) => {
  if (p) loadMarkdown(p)
})
</script>

<style>
.content { max-width: 800px; margin: 1rem auto; padding: 0 1rem; }
</style>