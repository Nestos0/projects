<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/novels_db')
    data.value = await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div class="main-container">
    <div v-if="data" class="novels-container">
      <div v-for="novel in data" :key="novel.id">
        <div class="cover">
          <!-- 图片容器 -->
          <div class="cover-image">
            <!-- 请确保 cover.jpg 替换为你的图片路径 -->
            <img :src="novel.cover_image" alt="小说封面" />
          </div>
          <!-- 标题 -->
          <div class="cover-title">{{ novel.title }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center; /* 主容器居中 */
  min-height: 100vh;
  padding: 20px;
  background: #73b394;
}

.novels-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #889900;
  gap: 20px;
  max-width: calc(4 * 280px + 3 * 20px); /* 限制最大宽度为3列 */
  justify-content: flex-start; /* 项目左对齐 */
}

/* 封面项样式 */
.cover {
  width: 280px; /* 固定宽度 */
  flex: 0 0 auto; /* 禁止伸缩 */
  border: 1px solid #ccc;
  /* 其他样式保持不变 */
}

.cover-image {
  position: relative;
  width: 50%; /* 改为全宽 */
  padding-top: 100%; /* 2:1比例 (100%宽度时高度50%) */
}

/* 图片设置为绝对定位，充满整个容器 */
.cover-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持图片比例并填充容器 */
}

/* 标题样式 */
.cover-title {
  padding: 10px;
  background-color: #f8f8f8;
  font-size: 18px;
  color: #333;
}
</style>
