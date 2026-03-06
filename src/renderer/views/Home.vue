<template>
  <div class="home">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="logo">🔥 火爆短剧</div>
      <el-menu mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/search">搜索</el-menu-item>
        <el-menu-item index="/favorites">收藏</el-menu-item>
        <el-menu-item index="/history">历史</el-menu-item>
        <el-menu-item index="/settings">设置</el-menu-item>
      </el-menu>
    </div>

    <!-- 主要内容 -->
    <div class="main">
      <!-- 轮播图 -->
      <el-carousel :interval="5000" arrow="always" class="banner">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <div class="banner-item" :style="{ background: item.color }">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>

      <!-- 热门推荐 -->
      <div class="section">
        <h2>🔥 热门推荐</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="drama in hotDramas" :key="drama.id">
            <el-card shadow="hover" class="drama-card">
              <div class="drama-cover">{{ drama.cover }}</div>
              <div class="drama-info">
                <h4>{{ drama.title }}</h4>
                <p class="drama-meta">{{ drama.episodes }}集 | {{ drama.rating }}分</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 最新更新 -->
      <div class="section">
        <h2>📺 最新更新</h2>
        <el-table :data="newDramas" style="width: 100%">
          <el-table-column prop="title" label="剧名" width="300" />
          <el-table-column prop="episodes" label="集数" width="100" />
          <el-table-column prop="updateTime" label="更新时间" width="200" />
          <el-table-column prop="rating" label="评分" width="100" />
          <el-table-column label="操作">
            <template #default>
              <el-button size="small" type="primary">观看</el-button>
              <el-button size="small">收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const banners = ref([
  { id: 1, title: '热门短剧合集', desc: '全网最热短剧一网打尽', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '新剧抢先看', desc: '最新上架短剧抢先体验', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '经典永流传', desc: '经典短剧百看不厌', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
])

const hotDramas = ref([
  { id: 1, title: '霸道总裁爱上我', episodes: 80, rating: 9.2, cover: '🎬' },
  { id: 2, title: '逆袭人生', episodes: 60, rating: 8.9, cover: '🎭' },
  { id: 3, title: '都市仙医', episodes: 100, rating: 9.5, cover: '🏥' },
  { id: 4, title: '龙王归来', episodes: 90, rating: 9.0, cover: '🐉' }
])

const newDramas = ref([
  { id: 1, title: '闪婚总裁契约妻', episodes: 85, updateTime: '2026-03-06', rating: 9.1 },
  { id: 2, title: '天才小毒妃', episodes: 70, updateTime: '2026-03-06', rating: 8.8 },
  { id: 3, title: '权臣闲妻', episodes: 65, updateTime: '2026-03-05', rating: 9.3 },
  { id: 4, title: '神医弃女', episodes: 75, updateTime: '2026-03-05', rating: 9.0 }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
}

.main {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.banner {
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;
}

.banner-item {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.banner-item h3 {
  font-size: 36px;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.section h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.drama-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.drama-card:hover {
  transform: translateY(-5px);
}

.drama-cover {
  font-size: 60px;
  text-align: center;
  padding: 40px 0;
  background: #f5f7fa;
  border-radius: 5px;
}

.drama-info {
  padding: 15px 0 0 0;
}

.drama-info h4 {
  font-size: 16px;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drama-meta {
  font-size: 12px;
  color: #999;
}
</style>
