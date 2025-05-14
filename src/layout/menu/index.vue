<template>
  <div class="layout-menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="1"
      size="large"
      text-color="#fff"
      collapse="true"
    >
      <el-menu-item
        v-for="(item, index) in routesList"
        :index="index + 1"
        :key="item.name"
      >
        <a @click="scrollTo('#' + (item.meta as any).id)">
          <el-icon>
            <component :is="(item.meta as any).icon" />
          </el-icon>
        </a>
        <template #title>{{ (item.meta as any).title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { routesList } from "@/router/routesList";

const scrollTo = (selector: string) => {
  console.log(selector);
  
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
<style scoped lang="less">
.layout-menu {
  position: fixed;
  left: 0;
  top: 40vh;
  z-index: 3;
  .el-menu--horizontal {
    --el-menu-horizontal-height: 100px;
  }
}
</style>
