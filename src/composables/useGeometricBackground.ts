import { ref, onMounted, onUnmounted } from 'vue'

// 不同页面的颜色方案
const COLOR_SCHEMES = {
  // 主页：暖色系
  home: [
    '#ef476f', // 粉色
    '#ffd166', // 黄色
    '#fd79a8', // 浅粉
    '#ffeaa7', // 浅黄
    '#fcfcfc'  // 浅米
  ],
  // 项目页：冷色系
  projects: [
    '#118ab2', // 蓝色
    '#06d6a0', // 绿色
    '#00b894', // 深绿
    '#a29bfe', // 浅紫
    '#fcfcfc'  // 浅米
  ],
  // 关于页：中性色系
  about: [
    '#ff6b6b', // 珊瑚红
    '#4ecdc4', // 青色
    '#ffeaa7', // 浅黄
    '#fdcb6e', // 橙色
    '#fcfcfc'  // 浅米
  ],
  // 联系页：对比色系
  contact: [
    '#ff6b6b', // 红色
    '#4ecdc4', // 青色
    '#ffeaa7', // 黄色
    '#fd79a8', // 粉色
    '#fcfcfc'  // 浅米
  ],
  // 404页：梦幻色系
  notFound: [
    '#fd79a8', // 粉色
    '#a29bfe', // 紫色
    '#74b9ff', // 浅蓝色
    '#ffeaa7', // 黄色
    '#fcfcfc'  // 浅米
  ],
  // 默认色系
  default: [
    '#ef476f', // 粉色
    '#ffd166', // 黄色
    '#06d6a0', // 绿色
    '#118ab2', // 蓝色
    '#fcfcfc'  // 浅米
  ]
}

// 几何形状类型
type ShapeType = 'circle' | 'triangle' | 'semicircle' | 'roundedRect'

interface Shape {
  type: ShapeType
  x: number
  y: number
  size: number
  color: string
  rotation: number
}

export function useGeometricBackground(canvasRef: any, colorScheme: keyof typeof COLOR_SCHEMES = 'default') {
  const shapes = ref<Shape[]>([])
  const currentColorScheme = ref(colorScheme)

  // 随机生成形状
  const generateRandomShape = (width: number, height: number): Shape => {
    const types: ShapeType[] = ['circle', 'triangle', 'semicircle', 'roundedRect']
    const type = types[Math.floor(Math.random() * types.length)]
    const colors = COLOR_SCHEMES[currentColorScheme.value]
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    return {
      type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 200 + 50, // 50px - 250px
      color,
      rotation: Math.random() * 360
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
        ctx.lineWidth = 2
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
        ctx.lineWidth = 2
        ctx.stroke()
        break

      case 'semicircle':
        ctx.beginPath()
        ctx.arc(0, 0, shape.size / 2, 0, Math.PI)
        ctx.lineTo(shape.size / 2, 0)
        ctx.closePath()
        ctx.fillStyle = shape.color
        ctx.fill()
        ctx.strokeStyle = '#2d3436'
        ctx.lineWidth = 2
        ctx.stroke()
        break

      case 'roundedRect':
        const radius = shape.size / 4
        ctx.beginPath()
        ctx.roundRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size, radius)
        ctx.fillStyle = shape.color
        ctx.fill()
        ctx.strokeStyle = '#2d3436'
        ctx.lineWidth = 2
        ctx.stroke()
        break
    }

    ctx.restore()
  }

  // 绘制背景
  const drawBackground = () => {
    const canvas = canvasRef.value
    if (!canvas) {
      console.warn('Canvas not available')
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.warn('Canvas context not available')
      return
    }

    // 设置画布大小
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制所有形状
    shapes.value.forEach(shape => {
      drawShape(ctx, shape)
    })
    
    console.log('Background drawn successfully', shapes.value.length, 'shapes')
  }

  // 初始化背景
  const initBackground = () => {
    const canvas = canvasRef.value
    if (!canvas) return

    // 生成随机形状 - 增加数量确保铺满屏幕
    const shapeCount = 35 // 形状数量
    shapes.value = []
    
    for (let i = 0; i< shapeCount; i++) {
      shapes.value.push(generateRandomShape(canvas.width, canvas.height))
    }

    drawBackground()
  }

  // 更新颜色方案
  const updateColorScheme = (newScheme: keyof typeof COLOR_SCHEMES) => {
    currentColorScheme.value = newScheme
    initBackground()
  }

  // 处理窗口大小变化
  const handleResize = () => {
    drawBackground()
  }

  onMounted(() => {
    initBackground()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    updateColorScheme
  }
}