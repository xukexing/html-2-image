# vue-html-2-image

### Install ###

npm:

    npm install vue-html-2-image --save
   
or yarn:

    yarn add vue-html-2-image --save
    
### import ###

    import html2Image from 'vue-html-2-image'
    Vue.use(html2Image)
    
### use ###

    <div v-html2Image></div>
    <div v-html2Image="{ fileName: '保存的图片名称' }"></div>
    // or
    
    // api方式调用，自动下载图片
    this.$htmlToCanvas(
       el,
       {
          // 是否将转换后的图片自动保存到本地
          autoDownload: true,
          // 保存的文件名称
          fileName: this.fileName
       }
     ) 
     
     // api方式调用，异步获取转换后的canvas
    this.$htmlToCanvas(
       el,
       {
          // 是否将转换后的图片自动保存到本地
          autoDownload: false,
          // 保存的文件名称
          fileName: this.fileName
       }
     ).then(canvas => {
        console.log(canvas)
     })
 
    
