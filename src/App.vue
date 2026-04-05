<template><div class="app"><GeometricBackground :colorScheme="currentColorScheme" /><Navbar /><router-view /><PeekCharacter /><PopupShape /></div></template><script setup>import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import PeekCharacter from './components/PeekCharacter.vue'
import GeometricBackground from './components/GeometricBackground.vue'
import PopupShape from './components/PopupShape.vue'

const route = useRoute()

// 根据当前路由设置颜色方案
const currentColorScheme = computed(() => {
  const path = route.path
  
  switch (path) {
    case '/':
      return 'home'
    case '/projects':
      return 'projects'
    case '/about':
      return 'about'
    case '/contact':
      return 'contact'
    case '/:pathMatch(.*)*':
      return 'notFound'
    default:
      return 'default'
  }
})</script><style>* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden;
}

.app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}</style>