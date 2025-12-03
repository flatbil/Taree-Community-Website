<template>
  <div class="content" v-html="html"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps({ markdownPath: String })
const html = ref('')

onMounted(async () => {
  try {
    const r = await fetch(props.markdownPath)
    const text = await r.text()
    html.value = marked.parse(text)
  } catch (e) {
    html.value = '<p>Error loading content.</p>'
  }
})
</script>

<style>
.content { max-width: 800px; margin: 1rem auto; padding: 0 1rem; }
</style>
