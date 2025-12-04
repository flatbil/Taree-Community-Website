// src/router/index.js (example)
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NewsList from '@/views/NewsList.vue'
import NewsPost from '@/views/NewsPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: NewsList },
  { path: '/news/:slug', component: NewsPost, props: true }
]

export default createRouter({ history: createWebHistory(), routes })