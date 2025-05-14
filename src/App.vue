<template>
  <template v-if="shouldShowComponents">
    <BackGround />
    <LxBg />
    <BzdBg />
    <Menu />

  </template>
  <div class="max-w-7xl mx-auto flex flex-col relative">
    <div class="md:mt-[100px]">
          <EditiorToolBox />
      <router-view></router-view>
    </div>
  </div>
  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BackGround from "@/layout/background/BackGround.vue";
import LxBg from "@/layout/background/LxBg/LxBg.vue";
import BzdBg from "@/layout/background/BzdBg.vue";
import Menu from "@/layout/menu/index.vue";
import EditiorToolBox from "@/layout/editior-toolbox/index.vue";
import { onMounted, computed } from "vue";
const route = useRoute();
const shouldShowComponents = computed(() => route.path === "/");


</script>

<style scoped></style>
