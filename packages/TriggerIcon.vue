<template>
  <div
    class="down-icon-wrapper html2canvas-ignore"
    title="下载为图片"
    :style="{ ...position }"
    @click="downTrigger"
  >
    <svg
      t="1675996435068"
      class="icon download-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6832"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
    >
      <path d="M372.8 0.256v366.144H189.76l305.088 366.144L800 366.4H616.96V0.256zM128.64 901.76h732.288v121.984H128.64z" fill="#2A8BFD" p-id="6833" />
    </svg>
  </div>
</template>

<script>
import { htmlToCanvas } from './index'

export default {
  name: 'TriggerIcon',
  props: {
    // 保存的文件名称
    fileName: {
      type: String,
      default: 'echarts'
    },
    // icon位置
    position: {
      type: Object,
      default: () => ({
        top: '4px',
        right: '4px'
      })
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 点击下载按钮触发器
    async downTrigger() {
      console.log(this.$el, this.$el?.parentElement)
      if (!this.$el?.parentElement) return
      try {
        htmlToCanvas(
          this.$el?.parentElement,
          {
            autoDownload: true,
            fileName: this.fileName
          }
        )
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.down-icon-wrapper {
  position: absolute;
  cursor: pointer;
  zIndex: 10;
}
.download-icon {
  width: 16px;
}
</style>
