<template>
  <div class="about-page">
    <div class="content-wrapper">
      <header class="page-header">
        <h1 class="page-title">👋 关于我</h1>
        <p class="page-description">了解我的故事、技能和经历</p>
      </header>
      <div class="about-content">
        <div class="about-section personal-info">
          <div class="section-title"><span class="section-emoji">👤</span>
            <h2>个人信息</h2>
          </div>
          <div class="personal-card">
            <div class="profile-image"></div>
            <div class="profile-details">
              <h3>Man Liu</h3>
              <p class="profile-title">前端开发者</p>
              <div class="info-grid">
                <div class="info-item"><span class="label">年龄</span><span class="value">20</span></div>
                <div class="info-item"><span class="label">学校</span><span class="value">山西大学</span></div>
                <div class="info-item"><span class="label">所在地</span><span class="value">山西</span></div>
                <div class="info-item"><span class="label">GitHub</span><a href="https://github.com" target="_blank"
                    class="value link">@Reverie-66</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-section skills">
          <div class="section-title"><span class="section-emoji">💻</span>
            <h2>技能栈</h2>
          </div>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-card">
              <div class="skill-icon">{{ skill.icon }}</div>
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="level-bar" :style="{ width: skill.level + '%' }"></div>
              </div>
              <p class="skill-description">{{ skill.description }}</p>
            </div>
          </div>
        </div>
        <div class="about-section experience">
          <div class="section-title"><span class="section-emoji">📚</span>
            <h2>教育经历</h2>
          </div>
          <div class="timeline">
            <div v-for="exp in education" :key="exp.id" class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>{{ exp.degree }}</h3>
                <p class="timeline-school">{{ exp.school }}</p>
                <p class="timeline-period">{{ exp.period }}</p>
                <p class="timeline-description">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about-section hobbies">
          <div class="section-title"><span class="section-emoji">🎨</span>
            <h2>兴趣爱好</h2>
          </div>
          <div class="hobbies-grid">
            <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item"><span class="hobby-emoji">{{ hobby.emoji
                }}</span><span class="hobby-name">{{ hobby.name }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>import { ref } from 'vue'

// 技能数据
const skills = ref([
  {
    name: 'Vue.js',
    icon: '🟢',
    level: 95,
    description: '精通Vue3组合式API，能够构建复杂的响应式应用'
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    level: 90,
    description: '熟练使用TypeScript进行类型安全的开发'
  },
  {
    name: 'Three.js',
    icon: '🎮',
    level: 85,
    description: '擅长使用Three.js创建3D可视化效果'
  },
  {
    name: 'CSS',
    icon: '🎨',
    level: 95,
    description: '精通现代CSS技术，包括Grid、Flexbox和动画'
  },
  {
    name: 'JavaScript',
    icon: '🟡',
    level: 92,
    description: '深入理解JavaScript核心概念和现代特性'
  },
  {
    name: 'GSAP',
    icon: '✨',
    level: 88,
    description: '熟练使用GSAP创建高性能动画效果'
  }
])

// 教育经历
const education = ref([
  {
    id: 1,
    degree: '人工智能',
    school: '山西大学',
    period: '2023-2027',
    description: '主修数据结构与算法，计算机网络，数据库系统'
  }
])

// 兴趣爱好
const hobbies = ref([
  { name: '数字绘画', emoji: '🎨' },
  { name: '音乐制作', emoji: '🎵' },
  { name: '摄影', emoji: '📷' },
  { name: '旅行', emoji: '✈️' },
  { name: '阅读', emoji: '📚' },
  { name: '瑜伽', emoji: '🧘‍♀️' },
  { name: '烹饪', emoji: '🍳' },
  { name: '游戏', emoji: '🎮' }
])

</script>
<style scoped>
.about-page {
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about-section {
  animation: sectionSlideIn 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
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

/* 个人信息 */
.personal-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.personal-card::before {
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

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  border: 4px solid #2d3436;
  position: relative;
}

.profile-image::before {
  content: '👩‍💻';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
}

.profile-details h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #2d3436;
}

.profile-title {
  font-size: 1.2rem;
  color: #636e72;
  margin: 0 0 1.5rem;
  font-weight: 500;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.9rem;
  color: #636e72;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}

.value {
  font-size: 1.1rem;
  color: #2d3436;
  font-weight: 700;
}

.link {
  color: #ff6b6b;
  text-decoration: none;
  border-bottom: 3px solid #ff6b6b;
  transition: all 0.3s;
}

.link:hover {
  color: #fd79a8;
  border-bottom-color: #fd79a8;
}

/* 技能 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.skill-card:hover {
  transform: translateY(-4px) rotate(1deg);
  box-shadow: 8px 8px 0 #ffeaa7;
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.skill-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #2d3436;
}

.skill-level {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
  border: 2px solid #2d3436;
}

.level-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #fd79a8);
  transition: width 1s ease;
}

.skill-description {
  color: #636e72;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 时间线 */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #ff6b6b, #fd79a8);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 20px;
  height: 20px;
  background: #ff6b6b;
  border: 3px solid #2d3436;
  border-radius: 50%;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 1.5rem;
}

.timeline-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #2d3436;
}

.timeline-school {
  font-size: 1.1rem;
  color: #ff6b6b;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.timeline-period {
  font-size: 0.9rem;
  color: #636e72;
  margin: 0 0 1rem;
  font-weight: 500;
}

.timeline-description {
  color: #636e72;
  line-height: 1.6;
}

/* 兴趣爱好 */
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.hobby-item {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.hobby-item:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 8px 8px 0 #ffeaa7;
}

.hobby-emoji {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.hobby-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 1px;
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

  .personal-card {
    flex-direction: column;
    text-align: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hobbies-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }

  .hobby-item {
    padding: 1rem;
  }

  .hobby-emoji {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-image::before {
    font-size: 3rem;
  }

  .profile-details h3 {
    font-size: 1.5rem;
  }

  .timeline-content {
    padding: 1rem;
  }

  .hobbies-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
  }

  .hobby-item {
    padding: 0.8rem;
  }

  .hobby-emoji {
    font-size: 1.5rem;
  }

  .hobby-name {
    font-size: 0.8rem;
  }
}
</style>