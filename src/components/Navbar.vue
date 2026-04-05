<template><nav class="navbar"><div class="nav-container"><div class="nav-logo" @click="$router.push('/')"><span class="logo-emoji">✨</span><span class="logo-text">Elena</span></div><ul class="nav-menu"><li 
          v-for="item in navItems" 
          :key="item.name"
          class="nav-item"
        ><router-link 
            :to="item.path"
            class="nav-link"
            :class="{ 'active': isActive(item.path) }"
          ><span class="nav-emoji">{{ item.emoji }}</span><span class="nav-label">{{ item.name }}</span></router-link></li></ul></div></nav></template><script setup lang="ts">import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: '主页', path: '/', emoji: '🏠' },
  { name: '项目', path: '/projects', emoji: '💻' },
  { name: '关于', path: '/about', emoji: '👋' },
  { name: '联系', path: '/contact', emoji: '📧' }
]

const isActive = (path: string) => {
  return route.path === path
}</script><style scoped>.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 3px solid #2d3436;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.nav-logo:hover {
  transform: translateY(-2px);
}

.logo-emoji {
  font-size: 2rem;
  animation: logoBounce 2s ease-in-out infinite alternate;
}

@keyframes logoBounce {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: #2d3436;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  color: white;
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
}

.nav-link.active::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.nav-emoji {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-emoji {
  transform: rotate(15deg) scale(1.2);
}

.nav-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .logo-text {
    font-size: 1.4rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .nav-emoji {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-emoji {
    font-size: 1.5rem;
  }
}</style>