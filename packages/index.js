/* eslint-disable */
import TriggerIcon from './TriggerIcon.vue'
import html2canvas from 'html2canvas'

// 将canvas转dataUrl，并利用a标签下载
const downLoad = (canvas, fileName = 'chart') => {
  const dataUrl = canvas.toDataURL('image/png', 1.0)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = dataUrl
  tempLink.setAttribute('download', `${fileName}.png`)
  // 不支持就另开页签开打
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)

  return dataUrl
}

export const htmlToCanvas = (el, { autoDownLoad = true, fileName }) => {
  if (!el) {
    throw new TypeError('el is must Element Node!')
  }

  return new Promise((resolve, reject) => {
    // 获取需要转canvas元素的宽高
    const { width, height } = el?.getBoundingClientRect?.()
    // 开始转换
    html2canvas(el, {
      width,
      height,
      // 过滤掉不需要的元素
      ignoreElements: element => {
        // compareDocumentPosition比较节点与指定节点相对位置
        // 例如：P1.compareDocumentPosition(P2)
        // 0：自身
        // 1：没有关系，这两个节点不属于同一个文档。
        // 2：第一节点（P1）位于第二个节点后（P2）。
        // 4：第一节点（P1）定位在第二节点（P2）前。
        // 8：第一节点（P1）位于第二节点内（P2）。
        // 16：第二节点（P2）位于第一节点内（P1）。
        const positionIndex = el?.compareDocumentPosition?.(element)

        // 重要！！！
        // 保留样式。因为样式在head标签内，所以要将html、head也要保留，否则下载的图片样式有丢失
        const whiteNodeNames = ['STYLE', 'HTML', 'HEAD']
        const nodeType = element.nodeName?.toUpperCase?.()

        // 过滤html2canvas-ignore类名的元素
        const hasClass = element.classList?.contains?.('html2canvas-ignore')

        return whiteNodeNames.includes(nodeType) ? false : (positionIndex !== 0 && positionIndex < 8) || hasClass
      }
    })
      .then(canvas => {
        if (autoDownLoad) resolve(downLoad(canvas, fileName))
        else resolve(canvas)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * /**
 * v-html2canvas自定义指令
 * html转canvas，并保存为png图片到本地
 * @type {{install: vueHtml2Image.install}}
 */
const vueHtml2Image = {
  install: Vue => {
    if (vueHtml2Image.installed) {
      return
    }

    const options = {
      inserted: function(el, binding, vnode) {
        if (!['relative', 'absolute', 'fixed'].includes(el.style?.position)) {
          el.style.position = 'relative'
        }

        const vm = new Vue({
          // 生成vdom
          render: h => h(TriggerIcon, {
            props: binding.value || { fileName: 'chart' }
          })
        }).$mount()

        // 追加真实dom
        el.appendChild(vm.$el)
      }
    }

    // 指令注册
    Vue.directive('html2canvas', options)

    Vue.prototype.$html2Image = async (el, option) => {
      try {
        return await htmlToCanvas(el, option)
      } catch (e) {
        return e
      }
    }
  }
}

// 如果是静态html页面加载vue，则自动注册
if (window.Vue) {
  window.Vue.use(vueHtml2Image)
}

export default vueHtml2Image
