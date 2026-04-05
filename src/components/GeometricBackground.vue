<template><canvas 
    ref="canvasRef"
    class="geometric-background"
  ></canvas></template><script setup lang="ts">import { ref, onMounted, onUnmounted, watch } from 'vue'

// 定义颜色方案类型
type ColorScheme = 'home' | 'projects' | 'about' | 'contact' | 'notFound' | 'default'

const props = defineProps<{
  colorScheme?: ColorScheme
}>()

// 创建canvas引用
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null

// 不同页面的颜色方案（更丰富的同色系）
const COLOR_SCHEMES = {
  // 主页：暖色系
  home: [
    '#ef476f', // 粉色
    '#ff6b6b', // 珊瑚红
    '#ff8787', // 浅红
    '#ffd166', // 黄色
    '#ffeaa7', // 浅黄
    '#fdcb6e', // 橙色
    '#fd79a8', // 浅粉
    '#ffa5a5', // 浅桃红
    '#ffcccb', // 淡粉
    '#fffacd'  // 奶油色
  ],
  // 项目页：冷色系
  projects: [
    '#118ab2', // 蓝色
    '#073b4c', // 深蓝
    '#023e8a', // 海军蓝
    '#06d6a0', // 绿色
    '#00b894', // 深绿
    '#51cf66', // 鲜绿
    '#a29bfe', // 浅紫
    '#6366f1', // 靛蓝
    '#4cc9f0', // 天蓝
    '#00b4d8'  // 青色
  ],
  // 关于页：中性色系
  about: [
    '#ff6b6b', // 珊瑚红
    '#4ecdc4', // 青色
    '#ffeaa7', // 浅黄
    '#fdcb6e', // 橙色
    '#fab1a0', // 桃色
    '#fd79a8', // 粉色
    '#fdcb6e', // 橙色
    '#ffeaa7', // 浅黄
    '#a29bfe', // 紫色
    '#74b9ff'  // 浅蓝色
  ],
  // 联系页：对比色系
  contact: [
    '#ff6b6b', // 红色
    '#4ecdc4', // 青色
    '#ffeaa7', // 黄色
    '#fd79a8', // 粉色
    '#ff9ff3', // 浅紫
    '#54a0ff', // 蓝色
    '#1dd1a1', // 绿色
    '#feca57', // 金色
    '#ee5a24', // 橙色
    '#ff9ff3'  // 浅紫
  ],
  // 404页：梦幻色系
  notFound: [
    '#fd79a8', // 粉色
    '#a29bfe', // 紫色
    '#74b9ff', // 浅蓝色
    '#ffeaa7', // 黄色
    '#ff9ff3', // 浅紫
    '#54a0ff', // 蓝色
    '#9c88ff', // 深紫
    '#ff6b81', // 玫红
    '#ffa502', // 橙色
    '#48dbfb'  // 青色
  ],
  // 默认色系
  default: [
    '#ef476f', // 粉色
    '#ffd166', // 黄色
    '#06d6a0', // 绿色
    '#118ab2', // 蓝色
    '#fd79a8', // 浅粉
    '#4ecdc4', // 青色
    '#ffeaa7', // 浅黄
    '#fdcb6e', // 橙色
    '#a29bfe', // 紫色
    '#74b9ff'  // 浅蓝色
  ]
}

// 几何形状类型
type ShapeType = 'circle' | 'triangle' | 'roundedRect'

interface Shape {
  type: ShapeType
  x: number
  y: number
  size: number
  color: string
  rotation: number
  speed: number
  originalSpeed: number
  direction: 'left' | 'right'
  isColliding: boolean
  collisionTimer: number | null
}

// 生成随机形状（确保全屏分布，添加碰撞属性）
const generateRandomShape = (width: number, height: number, colorScheme: ColorScheme): Shape => {
  const types: ShapeType[] = ['circle', 'triangle', 'roundedRect']
  const type = types[Math.floor(Math.random() * types.length)]
  const colors = COLOR_SCHEMES[colorScheme]
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  const speed = Math.random() * 0.8 + 0.3 // 0.3 - 1.1 px/frame
  
  return {
    type,
    x: Math.random() * width,
    y: Math.random() * height, // 确保分布在整个页面高度
    size: Math.random() * 50 + 30, // 30px - 80px
    color,
    rotation: Math.random() * 360,
    speed,
    originalSpeed: speed,
    direction: Math.random() >0.5 ? 'left' : 'right',
    isColliding: false,
    collisionTimer: null
  }
}

// 绘制形状
const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  ctx.save()
  ctx.translate(shape.x, shape.y)
  ctx.rotate((shape.rotation * Math.PI) / 180)

  switch (shape.type) {
    case 'circle':
      ctx.beginPath()
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
      ctx.fillStyle = shape.color
      ctx.fill()
      ctx.strokeStyle = '#2d3436'
      ctx.lineWidth = 1 // 更细的描边
      ctx.stroke()
      break

    case 'triangle':
      ctx.beginPath()
      ctx.moveTo(0, -shape.size / 2)
      ctx.lineTo(-shape.size / 2, shape.size / 2)
      ctx.lineTo(shape.size / 2, shape.size / 2)
      ctx.closePath()
      ctx.fillStyle = shape.color
      ctx.fill()
      ctx.strokeStyle = '#2d3436'
      ctx.lineWidth = 1 // 更细的描边
      ctx.stroke()
      break

    case 'roundedRect':
      const radius = shape.size / 4
      ctx.beginPath()
      ctx.roundRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size, radius)
      ctx.fillStyle = shape.color
      ctx.fill()
      ctx.strokeStyle = '#2d3436'
      ctx.lineWidth = 1 // 更细的描边
      ctx.stroke()
      break
  }

  ctx.restore()
}

// 创建形状数组
const shapes = ref<Shape[]>([])

// 小圆点接口
interface Dot {
  x: number
  y: number
  size: number
  color: string
  opacity: number
  opacitySpeed: number
  opacityDirection: 'up' | 'down'
}

// 创建小圆点数组
const dots = ref<Dot[]>([])

// 初始化小圆点
const initDots = (width: number, height: number) => {
  const dotCount = 120 // 小圆点数量
  
  dots.value = []
  
  // 使用网格布局确保覆盖整个页面
  const gridRows = 12
  const gridCols = 15
  const rowHeight = height / gridRows
  const colWidth = width / gridCols
  
  let index = 0
  
  // 先按网格放置小圆点
  for (let row = 0; row < gridRows && index < dotCount; row++) {
    for (let col = 0; col < gridCols && index < dotCount; col++) {
      const dot: Dot = {
        x: col * colWidth + Math.random() * colWidth * 0.9,
        y: row * rowHeight + Math.random() * rowHeight * 0.9,
        size: Math.random() * 4 + 2, // 2-6px，稍微大一点
        color: getLowSaturationColor(),
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
        opacitySpeed: Math.random() * 0.01 + 0.005, // 0.005-0.015
        opacityDirection: Math.random() >0.5 ? 'up' : 'down'
      }
      dots.value.push(dot)
      index++
    }
  }
  
  // 补充剩余的随机小圆点
  for (; index < dotCount; index++) {
    const dot: Dot = {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2, // 2-6px，稍微大一点
      color: getLowSaturationColor(),
      opacity: Math.random() * 0.3 + 0.1,
      opacitySpeed: Math.random() * 0.01 + 0.005,
      opacityDirection: Math.random() >0.5 ? 'up' : 'down'
    }
    dots.value.push(dot)
  }
}

// 获取低饱和度颜色
const getLowSaturationColor = (): string => {
  const colors = [
    'rgba(239, 71, 111, 0.2)',   // 粉色
    'rgba(255, 209, 102, 0.2)',  // 黄色
    'rgba(6, 214, 160, 0.2)',    // 绿色
    'rgba(17, 138, 178, 0.2)',   // 蓝色
    'rgba(253, 121, 168, 0.2)',  // 浅粉
    'rgba(78, 205, 196, 0.2)',   // 青色
    'rgba(255, 234, 167, 0.2)',  // 浅黄
    'rgba(162, 155, 254, 0.2)',  // 紫色
    'rgba(116, 185, 255, 0.2)',  // 浅蓝色
    'rgba(253, 203, 110, 0.2)'   // 橙色
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 初始化形状（确保全屏分布）
const initShapes = (width: number, height: number, colorScheme: ColorScheme) => {
  const shapeCount = 80 // 大幅增加数量，确保全屏覆盖
  
  shapes.value = []
  
  // 使用网格布局确保覆盖整个页面
  const gridRows = 8
  const gridCols = 10
  const rowHeight = height / gridRows
  const colWidth = width / gridCols
  
  let index = 0
  
  // 先按网格放置形状
  for (let row = 0; row < gridRows && index < shapeCount; row++) {
    for (let col = 0; col < gridCols && index < shapeCount; col++) {
      const shape = generateRandomShape(width, height, colorScheme)
      // 网格定位，确保覆盖整个页面
      shape.x = col * colWidth + Math.random() * colWidth * 0.8
      shape.y = row * rowHeight + Math.random() * rowHeight * 0.8
      shapes.value.push(shape)
      index++
    }
  }
  
  // 补充剩余的随机形状
  for (; index < shapeCount; index++) {
    const shape = generateRandomShape(width, height, colorScheme)
    shape.x = Math.random() * width
    shape.y = Math.random() * height
    shapes.value.push(shape)
  }
  
  // 初始化小圆点
  initDots(width, height)
}

// 更新小圆点（呼吸效果）
const updateDots = () => {
  dots.value.forEach(dot => {
    if (dot.opacityDirection === 'up') {
      dot.opacity += dot.opacitySpeed
      if (dot.opacity >= 0.5) {
        dot.opacity = 0.5
        dot.opacityDirection = 'down'
      }
    } else {
      dot.opacity -= dot.opacitySpeed
      if (dot.opacity<= 0.1) {
        dot.opacity = 0.1
        dot.opacityDirection = 'up'
      }
    }
  })
}

// 更新形状位置（添加碰撞效果）
const updateShapes = (width: number, height: number) =>{
  shapes.value.forEach(shape => {
    // 处理碰撞状态
    if (shape.isColliding && shape.collisionTimer) {
      // 碰撞后减速效果 - 更加明显的减速
      const elapsed = Date.now() - shape.collisionTimer
      const collisionDuration = 2000 // 碰撞持续时间2000毫秒，更长更明显
      
      if (elapsed< collisionDuration) {
        // 速度从快到慢，使用更明显的缓动函数
        const progress = elapsed / collisionDuration
        
        // 使用更强的缓出函数，让减速效果更明显
        const maxSpeedMultiplier = 3.0 // 最大速度倍数，碰撞时速度明显增加
        const minSpeedMultiplier = 0.5 // 最小速度倍数，明显减速
        
        // 使用正弦缓动函数，让减速更加平滑和明显
        const easeOut = 1 - Math.cos(progress * Math.PI / 2)
        
        // 速度变化曲线：从最大速度慢慢降到最小速度，然后再恢复到正常速度
        let speedMultiplier: number
        if (progress< 0.6) {
          // 前60%时间：从最大速度降到最小速度
          speedMultiplier = maxSpeedMultiplier - (maxSpeedMultiplier - minSpeedMultiplier) * easeOut
        } else {
          // 后40%时间：从最小速度恢复到正常速度
          const recoveryProgress = (progress - 0.6) / 0.4
          const recoveryEase = 1 - Math.cos(recoveryProgress * Math.PI / 2)
          speedMultiplier = minSpeedMultiplier + (1 - minSpeedMultiplier) * recoveryEase
        }
        
        shape.speed = shape.originalSpeed * speedMultiplier
      } else {
        // 碰撞结束，恢复正常速度
        shape.isColliding = false
        shape.speed = shape.originalSpeed
        shape.collisionTimer = null
      }
    }
    
    // 更新位置
    if (shape.direction === 'left') {
      shape.x -= shape.speed
      // 到达左边界，碰撞效果
      if (shape.x<= -shape.size / 2) {
        if (!shape.isColliding) {
          shape.isColliding = true
          shape.collisionTimer = Date.now()
        }
        shape.direction = 'right'
        shape.x = -shape.size / 2 // 保持在边界
      }
    } else {
      shape.x += shape.speed
      // 到达右边界，碰撞效果
      if (shape.x >= width + shape.size / 2) {
        if (!shape.isColliding) {
          shape.isColliding = true
          shape.collisionTimer = Date.now()
        }
        shape.direction = 'left'
        shape.x = width + shape.size / 2 // 保持在边界
      }
    }
    
    // 缓慢旋转
    shape.rotation += 0.1
    
    // 确保形状在垂直方向上分布在整个页面
    if (shape.y< 0) shape.y = 0
    if (shape.y >height) shape.y = height
  })
  
  // 更新小圆点
  updateDots()
}

// 绘制背景
const drawBackground = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布大小
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 先绘制小圆点（在几何形状下方）
  dots.value.forEach(dot => {
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
    ctx.fillStyle = dot.color.replace('0.2', dot.opacity.toString())
    ctx.fill()
  })

  // 再绘制所有形状
  shapes.value.forEach(shape => {
    drawShape(ctx, shape)
  })
}

// 动画循环
const animate = () => {
  updateShapes(window.innerWidth, window.innerHeight)
  drawBackground()
  animationFrameId = requestAnimationFrame(animate)
}

// 处理窗口大小变化
const handleResize = () => {
  drawBackground()
}

// 初始化背景
const initBackground = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  // 确保canvas尺寸正确设置
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const currentScheme = props.colorScheme || 'default'
  initShapes(canvas.width, canvas.height, currentScheme)
  drawBackground()
  
  // 启动动画
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

// 监听颜色方案变化
watch(() => props.colorScheme, () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  // 确保canvas尺寸正确设置
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const currentScheme = props.colorScheme || 'default'
  initShapes(canvas.width, canvas.height, currentScheme)
})

onMounted(() => {
  // 确保canvas可用后初始化
  setTimeout(() => {
    initBackground()
  }, 100)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 停止动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  window.removeEventListener('resize', handleResize)
})</script><style scoped>.geometric-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}</style>