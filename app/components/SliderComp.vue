<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <!-- Slider comparison -->
    <div
      ref="container"
      class="relative select-none overflow-hidden rounded-xl shadow-lg"
      :style="{ width: containerWidth, aspectRatio: '16/9', cursor: isDragging ? 'grabbing' : 'grab' }"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
    >
      <!-- Before placeholder -->
      <div class="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400 text-sm pointer-events-none" :style="{ backgroundImage: `url('/fasad-efter.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        Före-bild
      </div>

      <!-- After placeholder (clipped to right of slider) -->
      <div
        class="absolute inset-0 overflow-hidden pointer-events-none"
        :style="{ clipPath: `inset(0 0 0 ${sliderPercent}%)` }"
      >
        <div class="absolute inset-0 bg-neutral-300 flex items-center justify-center text-neutral-500 text-sm" :style="{ backgroundImage: `url('/fasad-före.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }">
          Efter-bild
        </div>
      </div>

      <!-- Divider line -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        :style="{ left: `${sliderPercent}%` }"
      >
        <!-- Handle -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center gap-0.5">
          <svg class="w-3 h-3 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4l-4 6 4 6V4zm6 0v12l4-6-4-6z" />
          </svg>
        </div>
      </div>

      <!-- Labels -->
      <div class="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded pointer-events-none">
        FÖRE
      </div>
      <div class="absolute bottom-3 right-3 bg-[#8B4513]/80 text-white text-xs font-bold px-2 py-1 rounded pointer-events-none">
        EFTER
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sliderPercent = ref(50)
const isDragging = ref(false)
const container = ref<HTMLElement | null>(null)
const containerWidth = ref('100%')

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  updateSlider(e)
}

function onMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  updateSlider(e)
}

function stopDrag() {
  isDragging.value = false
}

function updateSlider(e: MouseEvent | TouchEvent) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  sliderPercent.value = (x / rect.width) * 100
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('touchend', stopDrag)
})
</script>
