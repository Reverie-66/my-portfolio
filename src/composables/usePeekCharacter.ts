import { ref, onMounted, onUnmounted } from 'vue'

export interface CharacterState {
  isVisible: boolean
  isPeeking: boolean
  isHiding: boolean
  eyeState: 'open' | 'blink' | 'closed'
  position: { x: number; y: number }
  targetPosition: { x: number; y: number }
  returnDirection: 'left' | 'right' | 'top' | 'bottom'
  showDialog: boolean
  dialogMessage: string
}

export function usePeekCharacter() {
  // 随机问候语数组
  const greetings = [
    '你好呀~',
    '被抓到啦！',
    '嗨，你好！',
    '嘿嘿，发现你了！',
    '来打个招呼吧！',
    '哇，被发现了！',
    '你好呀，陌生人！',
    '嘻嘻，被抓住了！'
  ]

  const state = ref<CharacterState>({
    isVisible: false,
    isPeeking: false,
    isHiding: false,
    eyeState: 'closed',
    position: { x: 0, y: 0 },
    targetPosition: { x: 0, y: 0 },
    returnDirection: 'right',
    showDialog: false,
    dialogMessage: ''
  })

  let animationFrame: number | null = null
  let peekTimer: number | null = null
  let blinkTimer: number | null = null

  // 触发角色出现
  const triggerPeek = (mouseX: number, mouseY: number) => {
    if (state.value.isPeeking || state.value.isHiding) return

    // 设置目标位置（点击位置附近）
    state.value.targetPosition = {
      x: mouseX - 40, // 居中显示
      y: mouseY - 40
    }

    state.value.isVisible = true
    state.value.isPeeking = true
    state.value.eyeState = 'open'

    // 2秒后开始隐藏
    peekTimer = window.setTimeout(() => {
      if (!state.value.showDialog) {
        hideCharacter()
      }
    }, 2000)

    // 随机眨眼
    blinkTimer = window.setTimeout(() => {
      state.value.eyeState = 'blink'
      setTimeout(() => {
        state.value.eyeState = 'open'
      }, 150)
    }, Math.random() * 500 + 200)
  }

  // 隐藏角色
  const hideCharacter = () => {
    state.value.isPeeking = false
    state.value.isHiding = true
    state.value.eyeState = 'closed'
    state.value.showDialog = false

    // 随机选择返回方向
    const directions: Array<'left' | 'right' | 'top' | 'bottom'> = ['left', 'right', 'top', 'bottom']
    state.value.returnDirection = directions[Math.floor(Math.random() * directions.length)]

    // 隐藏动画结束后完全隐藏
    setTimeout(() => {
      state.value.isVisible = false
      state.value.isHiding = false
    }, 500)
  }

  // 处理小人点击
  const handleCharacterClick = () => {
    if (state.value.isPeeking && !state.value.showDialog) {
      // 随机选择问候语
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      state.value.dialogMessage = randomGreeting
      state.value.showDialog = true
      state.value.eyeState = 'open'
      
      // 3秒后自动关闭对话框
      setTimeout(() => {
        state.value.showDialog = false
        hideCharacter()
      }, 3000)
    }
  }

  // 鼠标移动处理
  const handleMouseMove = (event: MouseEvent) => {
    triggerPeek(event.clientX, event.clientY)
  }

  // 点击处理
  const handleClick = (event: MouseEvent) => {
    triggerPeek(event.clientX, event.clientY)
  }

  onMounted(() => {
    // 添加事件监听
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    // 清理事件和定时器
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
    
    if (peekTimer) clearTimeout(peekTimer)
    if (blinkTimer) clearTimeout(blinkTimer)
    if (animationFrame) cancelAnimationFrame(animationFrame)
  })

  return {
    state,
    triggerPeek,
    handleCharacterClick
  }
}