<template>
  <div class="history">
    <h2>📜 观看历史</h2>
    
    <el-empty v-if="historyList.length === 0" description="暂无观看记录" />
    
    <template v-else>
      <!-- 操作栏 -->
      <div class="action-bar">
        <el-button type="danger" size="small" @click="clearAll" :disabled="historyList.length === 0">
          清空全部
        </el-button>
        <el-tag type="info">共 {{ historyList.length }} 条记录</el-tag>
      </div>
      
      <!-- 历史记录列表 -->
      <el-timeline>
        <el-timeline-item 
          v-for="(item, index) in historyList" 
          :key="index"
          :timestamp="item.watchTime"
          placement="top"
          size="large"
        >
          <el-card>
            <div class="history-item">
              <div class="header">
                <div class="cover">{{ item.cover }}</div>
                <div class="info">
                  <h4>{{ item.title }}</h4>
                  <div class="meta">
                    <el-tag size="small">{{ item.category }}</el-tag>
                    <span>看到第 {{ item.episode }}集</span>
                    <span>{{ item.progress }}%</span>
                  </div>
                </div>
              </div>
              <div class="actions">
                <el-button size="small" type="primary" @click="continueWatch(item)">继续观看</el-button>
                <el-button size="small" @click="viewDetail(item)">详情</el-button>
                <el-button size="small" type="danger" @click="deleteItem(index)">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const historyList = ref([])

// 加载历史记录
onMounted(() => {
  loadHistory()
})

// 加载历史记录
const loadHistory = () => {
  const saved = localStorage.getItem('huobao-history')
  if (saved) {
    historyList.value = JSON.parse(saved)
  }
}

// 保存历史记录
const saveHistory = () => {
  localStorage.setItem('huobao-history', JSON.stringify(historyList.value))
}

// 继续观看
const continueWatch = (item) => {
  router.push(`/drama/${item.id}?episode=${item.episode}`)
  ElMessage.info(`继续观看《${item.title}》第${item.episode}集`)
}

// 查看详情
const viewDetail = (item) => {
  router.push(`/drama/${item.id}`)
}

// 删除单条
const deleteItem = (index) => {
  ElMessageBox.confirm('确定要删除这条观看记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    historyList.value.splice(index, 1)
    saveHistory()
    ElMessage.success('删除成功')
  })
}

// 清空全部
const clearAll = () => {
  ElMessageBox.confirm('确定要清空所有观看记录吗？此操作不可恢复！', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error'
  }).then(() => {
    historyList.value = []
    saveHistory()
    ElMessage.success('已清空所有观看记录')
  })
}

// 监听观看事件
window.addEventListener('storage', (e) => {
  if (e.key === 'huobao-watch-history' && e.newValue) {
    const newItem = JSON.parse(e.newValue)
    // 检查是否已存在，存在则更新，不存在则添加
    const existingIndex = historyList.value.findIndex(h => h.id === newItem.id && h.episode === newItem.episode)
    if (existingIndex >= 0) {
      historyList.value[existingIndex] = newItem
    } else {
      historyList.value.unshift(newItem)
    }
    saveHistory()
  }
})
</script>

<style scoped>
.history {
  padding: 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

.history h2 {
  margin-bottom: 20px;
  color: #303133;
}

.action-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.history-item {
  padding: 10px 0;
}

.header {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.cover {
  font-size: 60px;
  width: 100px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 5px;
  flex-shrink: 0;
}

.info {
  flex: 1;
}

.info h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
}

.meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  color: #909399;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
