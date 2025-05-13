<template>
  <div class="ball-container" ref="el" @click="onClick">
    <div class="ball big"></div>
    <div class="ball small"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import { useVModel } from "@vueuse/core";
import { debounce } from "lodash-es";
import { useDraggable } from "@/hooks/userDraggable/index";
import { createStorage } from "@/utils/storage";

const props = defineProps({
  modelValue: Boolean,
});
const emits = defineEmits(["update:modelValue"]);

const visible = useVModel(props, "modelValue", emits);

const el = ref<HTMLElement>();

const draggable = ref(true);

const storage = createStorage({ storage: localStorage });
// 从本地取小球上一次的位置
const position = storage.get("ballPosition");
const initialValue = {
  offsetX: position?.offsetX ?? 0,
  offsetY: position?.offsetY ?? 0,
};
const { isMoved, transform } = useDraggable(el, el, draggable, initialValue);

// 手动触发弹出框
const onClick = () => {
  // 如果小球位置移动了，则不触发
  visible.value = !visible.value && !isMoved.value;
};
watchEffect(() => {
  // 位置移动了，关闭弹框
  if (isMoved.value) {
    visible.value = false;
  }
});
watch(
  transform,
  debounce((val: any) => {
    if (val) {
      storage.set("ballPosition", {
        ...val,
      });
    }
  }, 200)
);
</script>
<style lang="less" scoped>
.ball-container {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 100px;
  bottom: 100px;
  cursor: pointer;
  z-index: 1000;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.3;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s ease;
  }
  &:hover {
    &::before {
      background-color: #1989fa;
    }
    .ball {
      animation: ballBounce 3s ease-in-out infinite;
      &.small {
        animation-delay: -1s;
      }
      &.big {
        background-color: #fff;
      }
    }
  }
  .ball {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.6;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
    &.small {
      transform: scale(0.6);
    }
    &.big {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
@keyframes ballBounce {
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.6);
  }
}
</style>
