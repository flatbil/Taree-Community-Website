<template>
  <div class="news-list">
    <h1>News</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="items.length">
      <li v-for="item in sorted" :key="item.slug">
        <a :href="`/news/${item.slug}`">{{ item.title }}</a>
        <div class="meta">{{ item.date }} — {{ item.summary }}</div>
      </li>
    </ul>
    <div v-else-if="!loading">No news found.</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const r = await fetch('/content/news/index.json')
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    items.value = await r.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const sorted = computed(() => {
  return items.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style>
.news-list { max-width: 900px; margin: 0 auto; padding: 1rem; }
.news-list .meta { font-size: 0.9rem; color: #666; }
.error { color: red; }
</style>