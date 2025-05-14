<template>
  <div class="tool-ball__container" v-clickOutside="outSideBlur">
    <el-popover
      placement="top"
      :width="282"
      :visible="visible"
      :teleported="false"
      :persistent="false"
    >
      <template #reference>
        <SmallBall v-model="visible"></SmallBall>
      </template>
      <template #default>
        <div class="toolbox-container">
          <ul class="toolbox-list">
            <li
              :class="item.value"
              v-for="item in toolOptions"
              :key="item.value"
              @click="onClick(item.value)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useEventBus } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { ClickOutside as vClickOutside } from "element-plus";
import SmallBall from "./small-ball.vue";
import { createStorage } from "@/utils/storage";
import { useRouter } from "vue-router";
const router = useRouter();
const visible = ref(false);
const toolOptions = [
  {
    label: "回到首页",
    value: "back",
  },
  {
    label: "切换主题",
    value: "theme",
  },
  {
    label: "帮助文档",
    value: "help",
  },
  {
    label: "点位同步",
    value: "point",
  },
];
const onClick = async (val: string) => {
  const driverBus = useEventBus<string>("driver");
  const session = createStorage();
  switch (val) {
    case "back":
      driverBus.emit();
      router.push('/');
      visible.value = false;
      break;
    case "theme":
    case "help":
      ElMessage({
        type: "warning",
        message: "该功能暂时不可用！",
      });
      break;
    case "point":
      visible.value = false;
      break;

    default:
      break;
  }
};
// const vClickOutside = ClickOutside;
const outSideBlur = () => {
  visible.value = false;
};
</script>
<style lang="less" scoped>
.toolbox-container {
  .toolbox-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    li {
      width: 80px;
      height: 80px;
      background-color: #f2f2f2;
      text-align: center;
      line-height: 80px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.3s;
      &.point,
      &.driver {
        &:hover {
          color: #1989fa;
          border: 1px solid #1989fa;
          background-color: #daebfe;
        }
      }
      &.theme,
      &.help {
        cursor: not-allowed;
      }
    }
  }
}
</style>
