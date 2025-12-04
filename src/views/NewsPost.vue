<template>
  <div>
    <ContentRenderer :markdownPath="`/content/news/${slug}.md`" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import ContentRenderer from '@/components/ContentRenderer.vue'

const route = useRoute()
const slug = route.params.slug
</script>