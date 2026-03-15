<template>
  <div class="favorites">
    <h2>⭐ 我的收藏</h2>
    
    <el-empty v-if="favorites.length === 0" description="暂无收藏的短剧" />
    
    <template v-else>
      <!-- 统计信息 -->
      <div class="stats">
        <el-tag type="info">共 {{ favorites.length }} 部</el-tag>
      </div>
      
      <!-- 收藏列表 -->
      <el-row :gutter="20">
        <el-col :span="8" v-for="(drama, index) in favorites" :key="index">
          <el-card shadow="hover" class="drama-card">
            <div class="card-cover">{{ drama.cover }}</div>
            <div class="card-info">
              <h4>{{ drama.title }}</h4>
              <div class="meta">
                <el-tag size="small">{{ drama.category }}</el-tag>
                <span>{{ drama.episodes }}集</span>
              </div>
              <div class="rating">
                <el-rate v-model="drama.rating" disabled size="small" />
              </div>
              <div class="actions">
                <el-button size="small" type="primary" @click="playDrama(drama)">播放</el-button>
                <el-button size="small" type="danger" @click="removeFavorite(index)">取消收藏</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const favorites = ref([])

// 加载收藏
onMounted(() => {
  loadFavorites()
})

// 加载收藏
const loadFavorites = () => {
  const saved = localStorage.getItem('huobao-favorites')
  if (saved) {
    favorites.value = JSON.parse(saved)
  }
}

// 保存收藏
const saveFavorites = () => {
  localStorage.setItem('huobao-favorites', JSON.stringify(favorites.value))
}

// 取消收藏
const removeFavorite = (index) => {
  const drama = favorites.value[index]
  favorites.value.splice(index, 1)
  saveFavorites()
  ElMessage.success(`已取消收藏《${drama.title}》`)
}

// 播放短剧
const playDrama = (drama) => {
  router.push(`/drama/${drama.id}`)
  ElMessage.info(`正在播放《${drama.title}》`)
}

// 监听收藏事件
window.addEventListener('storage', (e) => {
  if (e.key === 'huobao-favorite-added' && e.newValue) {
    const newDrama = JSON.parse(e.newValue)
    if (!favorites.value.find(d => d.id === newDrama.id)) {
      favorites.value.unshift(newDrama)
      saveFavorites()
    }
  }
})
</script>

<style scoped>
.favorites {
  padding: 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

.favorites h2 {
  margin-bottom: 20px;
  color: #303133;
}

.stats {
  margin-bottom: 20px;
}

.drama-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.drama-card:hover {
  transform: translateY(-5px);
}

.card-cover {
  font-size: 60px;
  text-align: center;
  padding: 40px 0;
  background: #f5f7fa;
  border-radius: 5px;
}

.card-info {
  padding: 15px 0 0 0;
}

.card-info h4 {
  font-size: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #909399;
}

.rating {
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
