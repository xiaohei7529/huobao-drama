<template>
  <div class="drama-detail">
    <!-- 顶部导航 -->
    <div class="header">
      <el-button @click="$router.back()" icon="ArrowLeft">返回</el-button>
      <h2>{{ drama.title }}</h2>
    </div>

    <!-- 剧集信息 -->
    <div class="info-section">
      <div class="cover">{{ drama.cover }}</div>
      <div class="meta">
        <h1>{{ drama.title }}</h1>
        <p class="description">{{ drama.description }}</p>
        <div class="tags">
          <el-tag>{{ drama.category }}</el-tag>
          <el-tag type="success">{{ drama.status === 'completed' ? '已完结' : '连载中' }}</el-tag>
          <el-tag type="warning">{{ drama.episodes }}集</el-tag>
        </div>
        <div class="rating">
          <el-rate v-model="drama.rating" disabled />
          <span>{{ drama.rating }}分</span>
        </div>
        <div class="actions">
          <el-button type="primary" size="large" @click="playDrama">
            <el-icon><VideoPlay /></el-icon> 立即播放
          </el-button>
          <el-button @click="toggleFavorite">
            <el-icon><Star /></el-icon> {{ drama.isFavorite ? '已收藏' : '收藏' }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 剧集列表 -->
    <div class="episodes-section">
      <h3>剧集列表 ({{ episodes.length }}集)</h3>
      <el-row :gutter="10">
        <el-col :span="4" v-for="ep in episodes" :key="ep.id">
          <el-card 
            shadow="hover" 
            class="episode-card"
            :class="{ active: currentEpisode === ep.id }"
            @click="selectEpisode(ep.id)"
          >
            <div class="ep-number">第{{ ep.number }}集</div>
            <div class="ep-title">{{ ep.title }}</div>
            <div class="ep-duration">{{ ep.duration }}分钟</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 播放器 -->
    <div class="player-section" v-if="isPlaying">
      <h3>正在播放：第{{ currentEpisode }}集</h3>
      <div class="video-player">
        <video ref="videoPlayer" controls class="video-js">
          <source :src="currentPlayUrl" type="video/mp4" />
          您的浏览器不支持视频播放
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, VideoPlay, Star } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()

// 短剧数据 (模拟)
const drama = reactive({
  id: route.params.id || 1,
  title: '霸道总裁爱上我',
  cover: '🎬',
  description: '这是一个关于霸道总裁和普通女孩的爱情故事...',
  category: '都市',
  episodes: 80,
  status: 'ongoing',
  rating: 4.5,
  isFavorite: false
})

// 剧集列表 (模拟)
const episodes = ref(
  Array.from({ length: drama.episodes }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    title: `第${i + 1}集`,
    duration: 2 + Math.floor(Math.random() * 3),
    url: `https://example.com/video/${drama.id}/${i + 1}.mp4`
  }))
)

// 播放状态
const isPlaying = ref(false)
const currentEpisode = ref(1)
const currentPlayUrl = ref('')

// 播放短剧
const playDrama = () => {
  isPlaying.value = true
  currentPlayUrl.value = episodes.value[currentEpisode.value - 1].url
  ElMessage.success(`开始播放第${currentEpisode.value}集`)
}

// 选择剧集
const selectEpisode = (epId) => {
  currentEpisode.value = epId
  if (isPlaying.value) {
    currentPlayUrl.value = episodes.value[epId - 1].url
  }
  ElMessage.info(`已选择第${epId}集`)
}

// 收藏/取消收藏
const toggleFavorite = () => {
  drama.isFavorite = !drama.isFavorite
  ElMessage.success(drama.isFavorite ? '已加入收藏' : '已取消收藏')
}
</script>

<style scoped>
.drama-detail {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.header h2 {
  margin: 0;
  color: #303133;
}

.info-section {
  display: flex;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.cover {
  font-size: 150px;
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 10px;
}

.meta {
  flex: 1;
}

.meta h1 {
  margin: 0 0 20px 0;
  color: #303133;
}

.description {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 15px;
}

.episodes-section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.episodes-section h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.episode-card {
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 10px;
}

.episode-card:hover {
  transform: translateY(-3px);
}

.episode-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.ep-number {
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.ep-title {
  font-size: 12px;
  color: #606266;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ep-duration {
  font-size: 11px;
  color: #909399;
}

.player-section {
  background: white;
  padding: 30px;
  border-radius: 10px;
}

.player-section h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.video-player {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.video-js {
  width: 100%;
  height: 500px;
  background: #000;
  border-radius: 10px;
}
</style>
