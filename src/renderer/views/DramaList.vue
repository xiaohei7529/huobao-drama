<template>
  <div class="drama-list">
    <!-- 顶部筛选栏 -->
    <div class="filter-bar">
      <div class="filter-group">
        <label>分类:</label>
        <el-select v-model="filters.category" placeholder="全部分类" clearable size="default" @change="loadDramas">
          <el-option label="全部" value="" />
          <el-option label="都市" value="urban" />
          <el-option label="言情" value="romance" />
          <el-option label="逆袭" value="rebirth" />
          <el-option label="战神" value="warrior" />
          <el-option label="神医" value="doctor" />
          <el-option label="萌宝" value="baby" />
          <el-option label="古装" value="ancient" />
        </el-select>
      </div>

      <div class="filter-group">
        <label>状态:</label>
        <el-select v-model="filters.status" placeholder="全部状态" clearable size="default" @change="loadDramas">
          <el-option label="全部" value="" />
          <el-option label="连载中" value="ongoing" />
          <el-option label="已完结" value="completed" />
        </el-select>
      </div>

      <div class="filter-group">
        <label>排序:</label>
        <el-select v-model="filters.sort" placeholder="默认排序" size="default" @change="loadDramas">
          <el-option label="热门" value="hot" />
          <el-option label="最新" value="new" />
          <el-option label="评分" value="rating" />
          <el-option label="剧名" value="name" />
        </el-select>
      </div>

      <div class="filter-group">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索剧名..."
          prefix-icon="Search"
          size="default"
          clearable
          @keyup.enter="loadDramas"
          style="width: 250px"
        />
      </div>
    </div>

    <!-- 视图切换 -->
    <div class="view-switcher">
      <span class="total">共 {{ total }} 部短剧</span>
      <div class="view-modes">
        <el-button-group>
          <el-button :type="viewMode === 'grid' ? 'primary' : ''" @click="viewMode = 'grid'">
            <el-icon><Grid /></el-icon> 网格
          </el-button>
          <el-button :type="viewMode === 'list' ? 'primary' : ''" @click="viewMode = 'list'">
            <el-icon><List /></el-icon> 列表
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 短剧列表 - 网格视图 -->
    <div v-if="viewMode === 'grid'" class="drama-grid">
      <el-card
        v-for="drama in dramas"
        :key="drama.id"
        shadow="hover"
        class="drama-card"
        @click="viewDetail(drama)"
      >
        <div class="card-cover">
          <div class="cover-img">{{ drama.cover }}</div>
          <div class="cover-badge" v-if="drama.isNew">新</div>
          <div class="cover-badge hot" v-else-if="drama.isHot">热</div>
          <div class="play-btn">▶</div>
        </div>
        <div class="card-info">
          <h4 class="drama-title">{{ drama.title }}</h4>
          <div class="drama-meta">
            <span class="tag">{{ drama.category }}</span>
            <span>{{ drama.episodes }}集</span>
            <el-rate v-model="drama.rating" disabled size="small" />
          </div>
          <p class="drama-desc">{{ drama.description }}</p>
        </div>
      </el-card>
    </div>

    <!-- 短剧列表 - 列表视图 -->
    <div v-else class="drama-table-view">
      <el-table :data="dramas" style="width: 100%" @row-click="viewDetail">
        <el-table-column prop="cover" label="封面" width="80">
          <template #default="{ row }">
            <div class="table-cover">{{ row.cover }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="剧名" width="250" sortable />
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="episodes" label="集数" width="80" sortable />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'completed' ? 'success' : 'warning'" size="small">
              {{ row.status === 'completed' ? '已完结' : '连载中' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rating" label="评分" width="120" sortable>
          <template #default="{ row }">
            <el-rate v-model="row.rating" disabled />
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="120" sortable />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click.stop="playDrama(row)">播放</el-button>
            <el-button size="small" @click.stop="toggleFavorite(row)">
              {{ row.isFavorite ? '取消收藏' : '收藏' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[12, 24, 36, 48]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="loadDramas"
        @current-change="loadDramas"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Grid, List, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 视图模式
const viewMode = ref('grid') // 'grid' or 'list'

// 搜索和筛选
const searchKeyword = ref('')
const filters = reactive({
  category: '',
  status: '',
  sort: 'hot'
})

// 分页
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

// 短剧列表
const dramas = ref([])

// 加载短剧数据
const loadDramas = async () => {
  // 模拟数据 - 实际应从 API 获取
  const mockData = generateMockDramas()
  
  // 应用筛选
  let filtered = mockData
  
  if (filters.category) {
    filtered = filtered.filter(d => d.category === filters.category)
  }
  
  if (filters.status) {
    filtered = filtered.filter(d => d.status === filters.status)
  }
  
  if (searchKeyword.value) {
    filtered = filtered.filter(d => d.title.includes(searchKeyword.value))
  }
  
  // 排序
  if (filters.sort === 'hot') {
    filtered.sort((a, b) => b.hot - a.hot)
  } else if (filters.sort === 'new') {
    filtered.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
  } else if (filters.sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (filters.sort === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }
  
  total.value = filtered.length
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  dramas.value = filtered.slice(start, end)
}

// 生成模拟数据
const generateMockDramas = () => {
  const categories = ['都市', '言情', '逆袭', '战神', '神医', '萌宝', '古装']
  const statuses = ['ongoing', 'completed']
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `短剧标题${i + 1}`,
    category: categories[i % categories.length],
    episodes: 60 + Math.floor(Math.random() * 40),
    status: statuses[i % 2],
    rating: 7 + Math.random() * 3,
    description: `这是第${i + 1}部短剧的简介，讲述了一个精彩的故事...`,
    cover: ['🎬', '🎭', '🎪', '🎨', '🎯'][i % 5],
    updateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isFavorite: Math.random() > 0.8,
    isNew: i < 10,
    isHot: i < 20,
    hot: Math.floor(Math.random() * 10000)
  }))
}

// 查看详情
const viewDetail = (drama) => {
  ElMessage.info(`查看《${drama.title}》详情`)
  // TODO: 跳转到详情页
}

// 播放
const playDrama = (drama) => {
  ElMessage.success(`开始播放《${drama.title}》`)
  // TODO: 打开播放器
}

// 收藏/取消收藏
const toggleFavorite = (drama) => {
  drama.isFavorite = !drama.isFavorite
  ElMessage.success(drama.isFavorite ? `已收藏《${drama.title}》` : `已取消收藏《${drama.title}》`)
}

// 初始化加载
onMounted(() => {
  loadDramas()
})
</script>

<style scoped>
.drama-list {
  padding: 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
  color: #606266;
}

/* 视图切换 */
.view-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: white;
  border-radius: 10px;
}

.total {
  color: #909399;
  font-size: 14px;
}

/* 网格视图 */
.drama-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.drama-card {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 10px;
  overflow: hidden;
}

.drama-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-cover {
  position: relative;
  height: 200px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-img {
  font-size: 80px;
}

.cover-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #f56c6c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.cover-badge.hot {
  background: #e6a23c;
}

.play-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.drama-card:hover .play-btn {
  opacity: 1;
}

.card-info {
  padding: 15px;
}

.drama-title {
  font-size: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #303133;
}

.drama-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #909399;
}

.tag {
  background: #ecf5ff;
  color: #409eff;
  padding: 2px 8px;
  border-radius: 4px;
}

.drama-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 列表视图 */
.drama-table-view {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.table-cover {
  font-size: 40px;
  text-align: center;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
}
</style>
