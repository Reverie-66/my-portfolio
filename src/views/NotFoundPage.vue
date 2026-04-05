<template><div class="not-found-page"><div class="content-wrapper"><div class="error-content"><div class="error-emoji">🚀</div><h1 class="error-title">404</h1><p class="error-message">页面找不到啦！</p><p class="error-submessage">看起来你不小心飞到了太空深处，这个页面不存在哦～</p><div class="error-actions"><router-link to="/" class="btn-primary">返回主页</router-link><router-link to="/projects" class="btn-secondary">查看项目</router-link></div><div class="error-extra"><p>别担心，点击下面的按钮可以探索其他有趣的地方！</p></div></div></div><!-- 漂浮的emoji --><div 
      v-for="emoji in floatingEmojis" 
      :key="emoji.id"
      class="floating-emoji"
      :style="emoji.style"
    >{{ emoji.emoji }}</div></div></template><script setup>import { ref, onMounted } from 'vue'

const floatingEmojis = ref([])
const emojis = ['🚀', '🌟', '🛸', '🌌', '⭐', '💫', '🌠', '🔭', '🌙', '☀️']

// 创建漂浮emoji
const createFloatingEmojis = () => {
  const emojisArray = []
  for (let i = 0; i < 15; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const newEmoji = {
      id: `emoji-${i}`,
      emoji,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 30 + 20}px`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `${Math.random() * 10}s`
      }
    }
    emojisArray.push(newEmoji)
  }
  floatingEmojis.value = emojisArray
}

onMounted(() => {
  createFloatingEmojis()
})</script><style scoped>.not-found-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}

.error-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 32px;
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: errorSlideIn 1s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@keyframes errorSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.error-content::before {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
  border-radius: 50% 20% 50% 20%;
  animation: shapeRotate 4s ease-in-out infinite;
}

@keyframes shapeRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

.error-emoji {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: emojiFloat 3s ease-in-out infinite;
}

@keyframes emojiFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  25% { 
    transform: translateY(-10px) rotate(-5deg);
  }
  75% { 
    transform: translateY(-10px) rotate(5deg);
  }
}

.error-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 4px;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.8));
  }
}

.error-message {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0 0 1rem;
}

.error-submessage {
  font-size: 1.2rem;
  color: #636e72;
  margin: 0 0 2rem;
  font-weight: 500;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
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

.error-extra {
  margin-top: 1.5rem;
}

.error-extra p {
  color: #636e72;
  font-style: italic;
  font-size: 1rem;
}

.floating-emoji {
  position: fixed;
  pointer-events: none;
  z-index: 5;
  animation: emojiFloatUp linear infinite;
}

@keyframes emojiFloatUp {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg) scale(1.2);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .error-content {
    padding: 2rem;
  }
  
  .error-emoji {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 3rem;
    letter-spacing: 2px;
  }
  
  .error-message {
    font-size: 1.5rem;
  }
  
  .error-submessage {
    font-size: 1.1rem;
  }
  
  .error-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .error-content {
    padding: 1.5rem;
  }
  
  .error-emoji {
    font-size: 3rem;
  }
  
  .error-title {
    font-size: 2.5rem;
  }
  
  .error-message {
    font-size: 1.3rem;
  }
  
  .error-submessage {
    font-size: 1rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .error-extra p {
    font-size: 0.9rem;
  }
}</style>