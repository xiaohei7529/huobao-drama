<template>
  <div class="theme-switcher">
    <el-dropdown trigger="click">
      <el-button size="small" :icon="currentTheme.icon">
        {{ currentTheme.name }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item 
            v-for="theme in themes" 
            :key="theme.value"
            @click="switchTheme(theme.value)"
          >
            <span :style="{ fontSize: '16px', marginRight: '8px' }">{{ theme.icon }}</span>
            {{ theme.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentThemeValue = ref('light')

// 主题列表
const themes = [
  { value: 'light', name: '明亮', icon: '☀️' },
  { value: 'dark', name: '暗黑', icon: '🌙' },
  { value: 'blue', name: '蓝色', icon: '💙' },
  { value: 'green', name: '绿色', icon: '💚' }
]

// 当前主题
const currentTheme = computed(() => {
  return themes.find(t => t.value === currentThemeValue.value) || themes[0]
})

// 加载主题
onMounted(() => {
  const saved = localStorage.getItem('huobao-theme')
  if (saved) {
    currentThemeValue.value = saved
    applyTheme(saved)
  }
})

// 切换主题
const switchTheme = (value) => {
  currentThemeValue.value = value
  localStorage.setItem('huobao-theme', value)
  applyTheme(value)
}

// 应用主题
const applyTheme = (value) => {
  const root = document.documentElement
  
  switch(value) {
    case 'light':
      root.style.setProperty('--el-color-primary', '#409eff')
      root.style.setProperty('--el-bg-color', '#ffffff')
      root.style.setProperty('--el-text-color-primary', '#303133')
      break
    case 'dark':
      root.style.setProperty('--el-color-primary', '#409eff')
      root.style.setProperty('--el-bg-color', '#1d1e1f')
      root.style.setProperty('--el-text-color-primary', '#e5eaf3')
      break
    case 'blue':
      root.style.setProperty('--el-color-primary', '#0066cc')
      root.style.setProperty('--el-bg-color', '#f0f7ff')
      root.style.setProperty('--el-text-color-primary', '#303133')
      break
    case 'green':
      root.style.setProperty('--el-color-primary', '#00aa55')
      root.style.setProperty('--el-bg-color', '#f0fff7')
      root.style.setProperty('--el-text-color-primary', '#303133')
      break
  }
}
</script>

<style scoped>
.theme-switcher {
  display: inline-block;
}
</style>
