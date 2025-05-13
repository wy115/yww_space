<template>
  <div id="document-background" :style="{ opacity: backGroundOpacity }"></div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
const backGroundOpacity = ref<number>(1);
const scrollTop = ref<number>(0);

const OnScroll = () => {
  scrollTop.value = document.documentElement.scrollTop / window.innerHeight;
  backGroundOpacity.value = scrollTop.value > 0.4 ? 0.4 : 1 - scrollTop.value;
};

onBeforeMount(() => {
  window.addEventListener("scroll", OnScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", OnScroll);
});
</script>
<style scoped lang="less">
#document-background {
  background: linear-gradient(to bottom right, #003e5a, #004125);
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
}
</style>
