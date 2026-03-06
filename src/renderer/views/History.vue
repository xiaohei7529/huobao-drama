<template>
  <div class="history">
    <h2>📜 观看历史</h2>
    <el-empty v-if="history.length === 0" description="暂无观看历史" />
    <el-timeline v-else>
      <el-timeline-item
        v-for="item in history"
        :key="item.id"
        :timestamp="item.time"
        placement="top"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>看到第 {{ item.episode }} 集</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const history = ref([
  { id: 1, title: '霸道总裁爱上我', episode: 35, time: '2026-03-06 20:30' },
  { id: 2, title: '逆袭人生', episode: 20, time: '2026-03-06 19:15' }
])
</script>

<style scoped>
.history {
  padding: 20px;
}

.history h2 {
  margin-bottom: 20px;
}
</style>
