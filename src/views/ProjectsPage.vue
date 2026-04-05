<template><div class="projects-page"><div class="content-wrapper"><header class="page-header"><h1 class="page-title">💻 我的项目</h1><p class="page-description">探索我使用现代前端技术构建的创意项目</p></header><div class="projects-grid"><div 
        v-for="project in projects" 
        :key="project.id"
        class="project-card"
      ><div class="card-image" :style="{ backgroundImage: `url(${project.image})` }"></div><div class="card-content"><h3 class="project-title">{{ project.title }}</h3><p class="project-description">{{ project.description }}</p><div class="project-tech"><span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="tech-tag"
          >{{ tech }}</span></div><div class="project-links"><a 
            v-if="project.github"
            :href="project.github"
            target="_blank"
            class="project-link github-link"
          >GitHub</a><a 
            v-if="project.demo"
            :href="project.demo"
            target="_blank"
            class="project-link demo-link"
          >在线演示</a></div></div></div></div></div></div></template><script setup>import { ref } from 'vue'

// 项目数据
const projects = ref([
  {
    id: 1,
    title: '心理健康 AI 助手',
    description: '集成大模型对话与情绪追踪的全栈应用，支持 SSE 流式响应、数据可视化看板及双角色权限管理。',
    image: 'https://picsum.photos/id/1/600/400',
    technologies: ['Vue 3', 'TypeScript', 'Pinia', 'ECharts', 'SSE', 'JWT'],
    github: 'https://github.com/yourusername/mental-health-ai',
    demo: 'https://mental-health-demo.vercel.app'
  },
  {
    id: 2,
    title: '孟菲斯风格个人网站',
    description: '创意作品集网站，包含动态几何碰撞动画、实时匿名聊天室及趣味表情包互动，展示前端工程与设计能力。',
    image: 'https://picsum.photos/id/20/600/400',
    technologies: ['Vue 3', 'TypeScript', 'Pusher', 'Canvas API', 'CSS 动画'],
    github: 'https://github.com/yourusername/memphis-portfolio',
    demo: 'https://your-portfolio.vercel.app'
  }
])

</script><style scoped>.projects-page {
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
  from { transform: scale(1); }
  to { transform: scale(1.02); }
}

.page-description {
  font-size: 1.2rem;
  color: #636e72;
  margin: 0;
  font-weight: 500;
  letter-spacing: 1px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 3px solid #2d3436;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
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

.project-card::before {
  content: '';
  position: absolute;
  top: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
  border-radius: 50% 20% 50% 20%;
  animation: shapeRotate 4s ease-in-out infinite;
}

@keyframes shapeRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

.project-card:hover {
  transform: translateY(-8px) rotate(1deg);
  box-shadow: 12px 12px 0 #ffeaa7;
}

.card-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid #2d3436;
}

.card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 107, 107, 0.1) 50%, 
    transparent 70%
  );
  transform: translateX(-100%);
  animation: cardScanLine 3s ease-in-out infinite;
}

@keyframes cardScanLine {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.card-content {
  padding: 2rem;
  position: relative;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  background: linear-gradient(45deg, #ff6b6b, #fd79a8, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-description {
  color: #636e72;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  font-weight: 500;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  padding: 0.4rem 0.8rem;
  background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  padding: 0.8rem 1.5rem;
  border: 2px solid #2d3436;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.github-link {
  background: #2d3436;
  color: white;
}

.demo-link {
  background: linear-gradient(45deg, #ff6b6b, #fd79a8);
  color: white;
}

.project-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.project-link:hover::before {
  left: 100%;
}

.project-link:hover {
  transform: translateY(-2px);
  box-shadow: 6px 6px 0 #2d3436;
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
  
  .page-description {
    font-size: 1.1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card {
    margin-bottom: 1rem;
  }
  
  .card-image {
    height: 180px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .project-title {
    font-size: 1.3rem;
  }
  
  .project-links {
    flex-direction: column;
    gap: 0.8rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .card-image {
    height: 160px;
  }
  
  .card-content {
    padding: 1.2rem;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .tech-tag {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
  
  .project-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}</style>