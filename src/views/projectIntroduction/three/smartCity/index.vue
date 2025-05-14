<template>
  <div class="smart-city" ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { renderer } from "./untils/scene.js";

// 引用 DOM 元素
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!container.value) return;

  // 将渲染器的 DOM 元素添加到容器中
  container.value.appendChild(renderer.domElement);
});
</script>
<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
</style>
