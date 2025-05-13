<template>
  <div
    id="home-page"
    class="mt-10 md:mt-1 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]"
  >
    <div class="space-y-2 text-center md:text-left px-10">
      <p class="text-amber-200">Hello , I'm</p>
      <h1 class="text-4xl font-bold md:text-5xl text-white fadein-up">
        Wei Yao <span class="wave">👋🏼</span>
      </h1>
      <div class="py-2" style="min-height: 50px;">
        <h1
          class="typewrite text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-yellow-500 md:text-2xl fadein-up"
          ref="typewriter"
        >
          <span class="wrap">{{ txt }}</span>
        </h1>
      </div>

      <br />
    </div>
    <div class="flex justify-center md:justify-start fadein-right">
      <img
        style="width: 300px; height: 300px; object-fit: cover"
        alt="avatar"
        width="300"
        height="300"
        fetchpriority="high"
        decoding="async"
        data-nimg="1"
        class="w-10/12 md:h-auto rounded-full border-4 border-amber-200 pict"
        src="/public/images/personal/profile.jpg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      toRotate: ["Web Developer", "Basketball Fans", "Music-lover"],
      period: 1000,
      txt: "",
      loopNum: 0,
      isDeleting: false,
      timeOutFlag: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
    });
  },
  beforeUnmount() {
    clearTimeout(this.timeOutFlag);
  },
  methods: {
    // 用于更新css效果内容
    tick() {
      let typewriter = this.$refs.typewriter;

      if (!typewriter) {
        return; // 如果无法获取 typewriter 元素，则结束函数
      }

      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      // 根据当前状态，更新文本内容
      this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);
      typewriter.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2; // 如果正在删除文本，则减少延迟时间
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period; // 如果已经完全显示文本，则将延迟时间设置为固定的周期
        this.isDeleting = true; // 切换到删除文本的状态
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false; // 切换回添加文本的状态
        this.loopNum++; // 增加循环次数
        delta = 500; // 设置删除完整文本后的延迟时间
      }

      this.timeOutFlag = setTimeout(() => {
        that.tick(); // 递归调用 tick() 函数，进行下一次文本更新
      }, delta);
    },
  },
};
</script>

<style scoped lang="less">
body {
  overflow-y: hidden;
  overflow-x: hidden;
}

.typewrite > .wrap {
  border-right: 0.08em solid #fff;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(14deg);
  }

  20% {
    transform: rotate(-8deg);
  }

  30% {
    transform: rotate(14deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(10deg);
  }

  60% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.pict {
  box-shadow: 0px 0px 73px -9px rgba(255, 219, 112, 0.44);
  -webkit-box-shadow: 0px 0px 73px -9px rgba(255, 219, 112, 0.44);
  -moz-box-shadow: 0px 0px 73px -9px rgba(255, 219, 112, 0.44);
}

.fadein-up {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 500ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 15px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fade-in-from-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-right {
  opacity: 0;
  animation: fadeInRight 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s forwards;
}

@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadein-1 {
  animation-delay: 200ms;
}

.fadein-2 {
  animation-delay: 400ms;
}

.fadein-3 {
  animation-delay: 600ms;
}

.fade-500 {
  animation-delay: 500ms;
}
</style>
