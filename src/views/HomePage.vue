<template>
  <div class="home-page" @click="createEmoji">
    <div class="content-wrapper">
      <div class="hero-section">
        <h1 class="hero-title"><span class="title-emoji">✨</span><span class="title-text">Elena Zhang</span></h1>
        <p class="hero-subtitle">前端开发者</p>
        <div class="hero-buttons"><router-link to="/projects" class="btn-primary">查看项目</router-link><router-link
            to="/contact" class="btn-secondary">联系我</router-link></div>
      </div>
      <div class="features-section">
        <div class="feature-card">
          <div class="feature-icon">💻</div>
          <h3>前端开发</h3>
          <p>使用Vue3、TypeScript和现代化前端技术构建优雅的用户界面</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>数字艺术</h3>
          <p>结合创意设计与技术，创造独特的视觉体验</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>性能优化</h3>
          <p>专注于高性能、可维护的代码架构</p>
        </div>
      </div>
      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-number">2个</div>
          <div class="stat-label">完整项目</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1年+</div>
          <div class="stat-label">前端学习</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">6+</div>
          <div class="stat-label">技术栈掌握</div>
        </div>
      </div>
    </div><!-- Emoji飘浮动画 -->
    <div v-for="emoji in floatingEmojis" :key="emoji.id" class="floating-emoji" :style="emoji.style">{{ emoji.emoji }}
    </div>
  </div>
</template>
<script setup>import { ref } from 'vue'

const floatingEmojis = ref([])
const emojis = ['🎉', '✨', '🌟', '💖', '💫', '🌈', '🎊', '🎆', '🎈', '🎀', '💎', '💝']

// 创建Emoji飘浮动画
const createEmoji = (event) => {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  const newEmoji = {
    id: `emoji-${Date.now()}`,
    emoji,
    style: {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
      animationDelay: '0s',
      fontSize: `${Math.random() * 20 + 20}px`
    }
  }

  floatingEmojis.value.push(newEmoji)

  // 动画结束后移除
  setTimeout(() => {
    floatingEmojis.value = floatingEmojis.value.filter(e => e.id !== newEmoji.id)
  }, 2000)
}</script>
<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 1s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-emoji {
  font-size: 5rem;
  animation: bounce 2s ease-in-out infinite alternate;
}

@keyframes bounce {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}

.title-text {
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #636e72;
  margin: 0 0 2rem;
  font-weight: 500;
  letter-spacing: 2px;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border: 3px solid #2d3436;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  color: white;
  box-shadow: 8px 8px 0 #2d3436;
}

.btn-secondary {
  background: white;
  color: #2d3436;
  box-shadow: 8px 8px 0 #ffeaa7;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-4px);
  box-shadow: 12px 12px 0 #2d3436;
}

.btn-primary::before,
.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.btn-primary:hover::before,
.btn-secondary:hover::before {
  left: 100%;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin-bottom: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
  border-radius: 50% 20% 50% 20%;
  animation: shapeRotate 4s ease-in-out infinite;
}

@keyframes shapeRotate {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.1);
  }
}

.feature-card:hover {
  transform: translateY(-8px) rotate(1deg);
  box-shadow: 12px 12px 0 #ffeaa7;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #2d3436;
}

.feature-card p {
  color: #636e72;
  line-height: 1.6;
}

.stats-section {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #636e72;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.floating-emoji {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  animation: floatUp 2s ease-out forwards;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translateY(-100vh) rotate(360deg) scale(1.5);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 6rem 1rem 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .title-emoji {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .features-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stats-section {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title-emoji {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }
}
</style>