<template><div 
    v-if="state.isVisible"
    class="peek-character"
    :class="{
      'peeking': state.isPeeking,
      'hiding': state.isHiding,
      [`return-${state.returnDirection}`]: state.isHiding
    }"
    :style="characterStyle"
  ><canvas 
      ref="canvasRef"
      width="80"
      height="80"
      @click="handleCharacterClick"
    ></canvas><!-- 对话框 --><div 
      v-if="state.showDialog"
      class="character-dialog"
    ><div class="dialog-content">{{ state.dialogMessage }}</div><div class="dialog-tail"></div></div></div></template><script setup lang="ts">import { ref, onMounted, watch, computed } from 'vue'
import { usePeekCharacter } from '../composables/usePeekCharacter'

const { state, handleCharacterClick } = usePeekCharacter()
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 计算角色样式
const characterStyle = computed(() => {
  if (state.value.isPeeking) {
    return {
      left: `${state.value.targetPosition.x}px`,
      top: `${state.value.targetPosition.y}px`,
      right: 'auto',
      bottom: 'auto'
    }
  }
  return {}
})

// 绘制角色
const drawCharacter = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制头部（圆形）
  ctx.beginPath()
  ctx.arc(40, 40, 35, 0, Math.PI * 2)
  ctx.fillStyle = '#ffeaa7'
  ctx.fill()
  ctx.strokeStyle = '#2d3436'
  ctx.lineWidth = 3
  ctx.stroke()

  // 绘制腮红
  ctx.beginPath()
  ctx.arc(25, 45, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#fd79a8'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(55, 45, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#fd79a8'
  ctx.fill()

  // 绘制眼睛
  drawEyes(ctx)

  // 绘制嘴巴
  drawMouth(ctx)
}

// 绘制眼睛
const drawEyes = (ctx: CanvasRenderingContext2D) => {
  if (state.value.eyeState === 'closed') {
    // 闭眼
    ctx.beginPath()
    ctx.moveTo(25, 35)
    ctx.quadraticCurveTo(30, 32, 35, 35)
    ctx.strokeStyle = '#2d3436'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(45, 35)
    ctx.quadraticCurveTo(50, 32, 55, 35)
    ctx.strokeStyle = '#2d3436'
    ctx.lineWidth = 3
    ctx.stroke()
  } else if (state.value.eyeState === 'blink') {
    // 眨眼（眼睛变小）
    ctx.beginPath()
    ctx.ellipse(30, 35, 4, 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#2d3436'
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(50, 35, 4, 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#2d3436'
    ctx.fill()
  } else {
    // 睁眼
    ctx.beginPath()
    ctx.ellipse(30, 35, 6, 8, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#2d3436'
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(50, 35, 6, 8, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#2d3436'
    ctx.fill()

    // 绘制高光
    ctx.beginPath()
    ctx.arc(27, 32, 2, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(47, 32, 2, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }
}

// 绘制嘴巴
const drawMouth = (ctx: CanvasRenderingContext2D) => {
  if (state.value.isPeeking) {
    // 偷看时的微笑
    ctx.beginPath()
    ctx.moveTo(30, 55)
    ctx.quadraticCurveTo(40, 60, 50, 55)
    ctx.strokeStyle = '#2d3436'
    ctx.lineWidth = 2
    ctx.stroke()
  } else {
    // 隐藏时的小嘴巴
    ctx.beginPath()
    ctx.moveTo(35, 55)
    ctx.lineTo(45, 55)
    ctx.strokeStyle = '#2d3436'
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

// 监听状态变化重绘
watch(() => state.value, () => {
  drawCharacter()
}, { deep: true })

onMounted(() => {
  drawCharacter()
})</script><style scoped>.peek-character {
  position: fixed;
  bottom: 20px;
  right: -80px;
  z-index: 999;
  pointer-events: none;
  transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.peek-character.peeking {
  right: auto;
  bottom: auto;
}

.peek-character canvas {
  pointer-events: auto;
  cursor: pointer;
}

/* 返回方向 */
.peek-character.hiding.return-left {
  left: -80px;
  right: auto;
}

.peek-character.hiding.return-right {
  right: -80px;
  left: auto;
}

.peek-character.hiding.return-top {
  top: -80px;
  bottom: auto;
}

.peek-character.hiding.return-bottom {
  bottom: -80px;
  top: auto;
}

/* 对话框样式 */
.character-dialog {
  position: absolute;
  top: -20px;
  left: 90px;
  z-index: 1000;
  animation: dialogPop 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@keyframes dialogPop {
  from {
    opacity: 0;
    transform: scale(0.5) translateX(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

.dialog-content {
  background: white;
  border: 3px solid #2d3436;
  border-radius: 20px;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  white-space: nowrap;
}

.dialog-tail {
  position: absolute;
  top: 50%;
  left: -15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 15px solid white;
}

/* 只在桌面端显示 */
@media (max-width: 768px) {
  .peek-character {
    display: none;
  }
}</style>