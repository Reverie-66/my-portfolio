<template><div class="popup-shapes-container"><div 
      v-for="shape in shapes" 
      :key="shape.id"
      class="popup-shape"
      :class="`shape-${shape.type}`"
      :style="shapeStyle(shape)"
    ></div></div></template><script setup lang="ts">import { usePopupShapes } from '../composables/usePopupShapes'

const { shapes } = usePopupShapes()

// 计算形状样式
const shapeStyle = (shape: any) => {
  return {
    left: `${shape.x}px`,
    top: `${shape.y}px`,
    width: `${shape.size}px`,
    height: `${shape.size}px`,
    backgroundColor: shape.color,
    transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(${shape.scale})`,
    opacity: shape.opacity
  }
}</script><style scoped>.popup-shapes-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.popup-shape {
  position: absolute;
  border: 2px solid #2d3436;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 圆形 */
.shape-circle {
  border-radius: 50%;
}

/* 三角形 */
.shape-triangle {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 43px solid currentColor;
  background: none;
  border: none;
  color: inherit;
}

/* 正方形 */
.shape-square {
  border-radius: 4px;
}

/* 六边形 */
.shape-hexagon {
  width: 40px;
  height: 23px;
  background: currentColor;
  position: relative;
  border: none;
  color: inherit;
}

.shape-hexagon::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 12px solid currentColor;
  top: -12px;
}

.shape-hexagon::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 12px solid currentColor;
  bottom: -12px;
}</style>