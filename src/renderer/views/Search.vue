<template>
  <div class="search">
    <h2>🔍 搜索短剧</h2>
    <el-input
      v-model="keyword"
      placeholder="请输入短剧名称..."
      size="large"
      clearable
      @keyup.enter="handleSearch"
    >
      <template #append>
        <el-button @click="handleSearch">搜索</el-button>
      </template>
    </el-input>

    <div class="results" v-if="results.length > 0">
      <el-card v-for="item in results" :key="item.id" shadow="hover">
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const results = ref([])

const handleSearch = () => {
  // 模拟搜索结果
  results.value = [
    { id: 1, title: `搜索结果：${keyword.value}`, desc: '找到相关短剧' }
  ]
}
</script>

<style scoped>
.search {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.search h2 {
  margin-bottom: 20px;
}

.results {
  margin-top: 30px;
}

.results .el-card {
  margin-bottom: 15px;
}
</style>
