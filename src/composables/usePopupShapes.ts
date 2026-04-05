import { ref, onMounted, onUnmounted } from 'vue'

// 孟菲斯经典颜色
const MEMPHIS_COLORS = [
  '#ef476f', // 粉色
  '#ffd166', // 黄色
  '#06d6a0', // 绿色
  '#118ab2', // 蓝色
  '#fcfcfc'  // 浅米
]

// 几何形状类型
type ShapeType = 'circle' | 'triangle' | 'square' | 'hexagon'

export interface PopupShape {
  id: number
  x: number
  y: number
  size: number
  color: string
  type: ShapeType
  rotation: number
  opacity: number
  scale: number
}

export function usePopupShapes() {
  const shapes = ref<PopupShape[]>([])
  let nextId = 1
  const maxShapes = 3

  // 随机生成形状
  const generateShape = (x: number, y: number): PopupShape => {
    const types: ShapeType[] = ['circle', 'triangle', 'square', 'hexagon']
    const type = types[Math.floor(Math.random() * types.length)]
    const color = MEMPHIS_COLORS[Math.floor(Math.random() * MEMPHIS_COLORS.length)]
    
    return {
      id: nextId++,
      x,
      y,
      size: Math.random() * 30 + 20, // 20px - 50px
      color,
      type,
      rotation: Math.random() * 360,
      opacity: 0,
      scale: 0
    }
  }

  // 添加弹出形状
  const addPopupShape = (x: number, y: number) => {
    // 如果已经达到最大数量，移除最旧的形状
    if (shapes.value.length >= maxShapes) {
      shapes.value.shift()
    }

    const shape = generateShape(x, y)
    shapes.value.push(shape)

    // 简单的按钮点击效果
    setTimeout(() => {
      shape.scale = 1
      shape.opacity = 1
    }, 10)

    setTimeout(() => {
      shape.scale = 0.9
    }, 50)

    setTimeout(() => {
      shape.scale = 1
    }, 80)

    setTimeout(() => {
      shape.scale = 0
      shape.opacity = 0
      
      // 移除形状
      setTimeout(() => {
        shapes.value = shapes.value.filter(s => s.id !== shape.id)
      }, 100)
    }, 200)
  }

  // 处理鼠标移动
  const handleMouseMove = (event: MouseEvent) => {
    // 随机概率触发，避免过于频繁
    if (Math.random()< 0.1) {
      addPopupShape(event.clientX, event.clientY)
    }
  }

  // 处理点击
  const handleClick = (event: MouseEvent) =>{
    addPopupShape(event.clientX, event.clientY)
  }

  onMounted(() =>{
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
  })

  return {
    shapes
  }
}