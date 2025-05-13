<template>
  <div
    id="personal-introduction"
    class="bg-[#1e1e1f] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 mb-5 mt-3"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          {{ $t("关于我") }} &nbsp;
          <div
            class="h-[1px] w-32 bg-amber-200 md:w-96 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center"
      >
        <div class="flex justify-center" style="flex: 1">
          <img
            class="w-9/12 rounded-full mb-3 fadein-up pict"
            src="/public/images/personal/profile.jpg"
            alt="Foto"
            style="width: 300px; height: 300px; object-fit: cover"
          />
        </div>
        <div class="md:w-7/12">
          <ul class="mb-3 md:mb-7 fadein-left fadeins-1">
            <li
              class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent"
            >
              {{ $t("personalOne") }} &nbsp;
            </li>
            <br />
            <li
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent"
            >
              {{ $t("personalTwo") }} &nbsp;
            </li>
            <br />
            <li
              class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent"
            >
              {{ $t("personalThree") }} &nbsp;
            </li>
          </ul>

          <ul class="mb-3 md:mb-7 fadein-left fadeins-2">
            <li
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent"
            >
              {{ $t("personalFour") }} &nbsp;
            </li>
          </ul>
        </div>
      </section>

      <section
        style="margin-top: 50px"
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center"
      >
        <div class="flex justify-center" style="flex: 1">
          <el-timeline>
            <el-timeline-item
              @click="changeBeChoosed(index)"
              center
              v-for="(item, index) in companyList"
              :timestamp="item.time"
              placement="top"
            >
              <el-card v-show="item.beChoosed">
                <h1>{{ item.name }}</h1>
                <h2>{{ $t("职位") + item.job }}</h2>
              </el-card>
              <h1 v-show="!item.beChoosed">{{ item.name }}</h1>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="md:w-7/12">
          <ul class="mb-3 md:mb-7 fadein-left fadeins-1">
            <li
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent"
            >
              {{
                $t("部门") +
                companyList.filter((v) => v.beChoosed)[0].department
              }}
              &nbsp;
            </li>
            <li
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent"
            >
              {{
                $t("主要职责") +
                companyList.filter((v) => v.beChoosed)[0].content
              }}
              &nbsp;
            </li>
          </ul>
          <ul class="mb-3 md:mb-7 fadein-left fadeins-2">
            <li
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent"
            >
              {{
                $t("离职原因") +
                companyList.filter((v) => v.beChoosed)[0].reason
              }}
              &nbsp;
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { companyInformation } from "./data";

const companyList = reactive([...companyInformation]);
const changeBeChoosed = (v: number) => {
  companyList.forEach((item: OS.companyInformationParmas, index: Number) => {
    if (v === index) {
      item.beChoosed = true;
    } else {
      item.beChoosed = false;
    }
  });
};
</script>

<style scoped lang="less">
.fadein-left {
  opacity: 0;
  font-size: 1.1rem;
  line-height: 2.2rem;
  animation: fadeInLeft 0.5s ease-out forwards;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeins-1 {
  animation-delay: 500ms;
}

.fadeins-2 {
  animation-delay: 800ms;
}

.img-tech,
.tech {
  transition: transform 0.3s ease;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}

.pict {
  box-shadow: 0px 0px 43px -9px rgba(255, 219, 112, 0.44);
}
</style>
