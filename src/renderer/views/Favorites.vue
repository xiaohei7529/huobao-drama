<template>
  <div class="favorites">
    <h2>⭐ 我的收藏</h2>
    <el-empty v-if="favorites.length === 0" description="暂无收藏" />
    <el-table v-else :data="favorites" style="width: 100%">
      <el-table-column prop="title" label="剧名" />
      <el-table-column prop="episodes" label="集数" />
      <el-table-column prop="rating" label="评分" />
      <el-table-column label="操作">
        <template #default>
          <el-button size="small" type="primary">观看</el-button>
          <el-button size="small" type="danger">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const favorites = ref([
  { title: '霸道总裁爱上我', episodes: 80, rating: 9.2 },
  { title: '逆袭人生', episodes: 60, rating: 8.9 }
])
</script>

<style scoped>
.favorites {
  padding: 20px;
}

.favorites h2 {
  margin-bottom: 20px;
}
</style>
