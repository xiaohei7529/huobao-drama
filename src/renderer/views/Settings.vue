<template>
  <div class="settings">
    <h2>⚙️ 设置</h2>
    
    <el-form label-width="120px">
      <el-form-item label="应用版本">
        <span>v{{ version }}</span>
      </el-form-item>
      
      <el-form-item label="自动更新">
        <el-switch v-model="settings.autoUpdate" />
      </el-form-item>
      
      <el-form-item label="清晰度">
        <el-select v-model="settings.quality">
          <el-option label="流畅" value="流畅" />
          <el-option label="高清" value="高清" />
          <el-option label="超清" value="超清" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="缓存目录">
        <el-input v-model="settings.cacheDir" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存设置</el-button>
        <el-button @click="handleReset">重置设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const version = ref('0.1.0')
const settings = ref({
  autoUpdate: true,
  quality: '高清',
  cacheDir: ''
})

onMounted(async () => {
  if (window.electronAPI) {
    version.value = await window.electronAPI.getAppVersion()
  }
})

const handleSave = () => {
  alert('设置已保存')
}

const handleReset = () => {
  settings.value = {
    autoUpdate: true,
    quality: '高清',
    cacheDir: ''
  }
}
</script>

<style scoped>
.settings {
  padding: 20px;
  max-width: 600px;
}

.settings h2 {
  margin-bottom: 30px;
}
</style>
