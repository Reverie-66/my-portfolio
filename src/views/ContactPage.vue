<template>
  <div class="contact-page">
    <div class="content-wrapper">
      <header class="page-header">
        <h1 class="page-title">📧 联系我</h1>
        <p class="page-description">随时与我联系，讨论项目合作或交流技术</p>
      </header>
      <div class="contact-content">
        <div class="contact-section">
          <div class="contact-card">
            <div class="card-header"><span class="contact-emoji">✉️</span>
              <h2>电子邮件</h2>
            </div>
            <div class="email-container">
              <div class="email-display"><span class="email-label">邮箱地址：</span><span class="email-text">{{ email
                  }}</span></div><button class="copy-button" @click="copyEmail" :class="{ 'copied': isCopied }">{{
                    isCopied ? '已复制!' : '复制邮箱' }}</button>
            </div>
          </div>
          <div class="contact-card">
            <div class="card-header"><span class="contact-emoji">❤️</span>
              <h2>点赞支持</h2>
            </div>
            <div class="like-counter">
              <div class="like-button" @click="incrementLikes"><span class="like-emoji">👍</span><span
                  class="like-count">{{ likes }}</span></div>
              <p class="like-message">感谢您的支持！您的点赞是我前进的动力</p>
            </div>
          </div>
        </div>
        <div class="social-section">
          <div class="section-title"><span class="section-emoji">🌐</span>
            <h2>社交媒体</h2>
          </div>
          <div class="social-grid"><a v-for="social in socialLinks" :key="social.name" :href="social.url"
              target="_blank" class="social-item"><span class="social-emoji">{{ social.emoji }}</span><span
                class="social-name">{{ social.name }}</span></a></div>
        </div>
        <div class="message-section">
          <div class="section-title"><span class="section-emoji">💬</span>
            <h2>发送消息</h2>
          </div>
          <div class="message-form">
            <div class="form-group"><label for="name">姓名</label><input type="text" id="name" v-model="formData.name"
                placeholder="请输入您的姓名" class="form-input" /></div>
            <div class="form-group"><label for="email">邮箱</label><input type="email" id="email" v-model="formData.email"
                placeholder="请输入您的邮箱" class="form-input" /></div>
            <div class="form-group"><label for="message">消息内容</label><textarea id="message" v-model="formData.message"
                rows="5" placeholder="请输入您的消息" class="form-input"></textarea></div><button class="submit-button"
              @click="submitForm">发送消息</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>import { ref, onMounted } from 'vue'

// 邮箱相关
const email = 'elena.zhang@example.com'
const isCopied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 点赞计数器
const likes = ref(0)

const incrementLikes = () => {
  likes.value++
  localStorage.setItem('portfolioLikes', likes.value.toString())
}

// 社交媒体链接
const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com', emoji: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com', emoji: '💼' },
  { name: 'Twitter', url: 'https://twitter.com', emoji: '🐦' },
  { name: 'Instagram', url: 'https://instagram.com', emoji: '📷' },
  { name: 'Dribbble', url: 'https://dribbble.com', emoji: '🏀' },
  { name: 'CodePen', url: 'https://codepen.io', emoji: '✏️' }
])

// 表单数据
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  console.log('表单提交:', formData.value)
  alert('消息已发送！我会尽快回复您。')
  formData.value = {
    name: '',
    email: '',
    message: ''
  }
}

onMounted(() => {
  // 从localStorage加载点赞数
  const savedLikes = localStorage.getItem('portfolioLikes')
  if (savedLikes) {
    likes.value = parseInt(savedLikes)
  }
})</script>
<style scoped>
.contact-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 4px;
  animation: titleBounce 2s ease-in-out infinite alternate;
}

@keyframes titleBounce {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.02);
  }
}

.page-description {
  font-size: 1.2rem;
  color: #636e72;
  margin: 0;
  font-weight: 500;
  letter-spacing: 1px;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* 联系卡片 */
.contact-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.contact-card::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
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

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-emoji {
  font-size: 2.5rem;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* 邮箱容器 */
.email-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.email-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.email-label {
  font-weight: 600;
  color: #636e72;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.email-text {
  font-weight: 700;
  color: #ff6b6b;
}

.copy-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  color: white;
  border: 3px solid #2d3436;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.copy-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.copy-button:hover::before {
  left: 100%;
}

.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 6px 6px 0 #2d3436;
}

.copy-button.copied {
  background: linear-gradient(45deg, #00b894, #00cec9);
}

/* 点赞计数器 */
.like-counter {
  text-align: center;
}

.like-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
  border: 3px solid #2d3436;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  margin: 0 auto 1rem;
  width: fit-content;
}

.like-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 8px 8px 0 #2d3436;
}

.like-emoji {
  font-size: 2rem;
  animation: likeBounce 2s ease-in-out infinite alternate;
}

@keyframes likeBounce {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}

.like-count {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d3436;
}

.like-message {
  color: #636e72;
  font-style: italic;
}

/* 社交媒体 */
.social-section {
  animation: sectionSlideIn 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.2s both;
}

@keyframes sectionSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-emoji {
  font-size: 2rem;
}

.section-title h2 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.social-item {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #2d3436;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.social-item:hover {
  transform: translateY(-4px) rotate(1deg);
  box-shadow: 8px 8px 0 #ffeaa7;
}

.social-emoji {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.social-name {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 消息表单 */
.message-section {
  animation: sectionSlideIn 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.4s both;
}

.message-form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 24px;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 3px solid #2d3436;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  color: white;
  border: 3px solid #2d3436;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 8px 8px 0 #2d3436;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 6rem 1rem 3rem;
  }

  .page-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .contact-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .email-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .social-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .social-item {
    padding: 1rem;
  }

  .social-emoji {
    font-size: 2rem;
  }

  .message-form {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }

  .card-header h2 {
    font-size: 1.3rem;
  }

  .contact-emoji,
  .section-emoji {
    font-size: 1.8rem;
  }

  .email-text {
    font-size: 1rem;
  }

  .social-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  .social-item {
    padding: 0.8rem;
  }

  .social-emoji {
    font-size: 1.5rem;
  }

  .social-name {
    font-size: 0.8rem;
  }

  .message-form {
    padding: 1.2rem;
  }

  .form-input {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>