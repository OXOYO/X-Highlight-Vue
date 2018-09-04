/**
* Created by OXOYO on 2018/7/29.
*
*/

<style scoped lang="less" rel="stylesheet/less">
 .demo {
   width: 100%;
   text-align: center;

   .demo-header {
     width: 80%;
     margin: 10px auto;
   }
   .demo-body {
     width: 80%;
     margin: 10px auto;
   }
 }
</style>

<template>
  <div class="demo">
    <div class="demo-body" v-for="(item, index) in demoList" :key="index">
      <XHighlight
        class="x-highlight"
        :title="item.title"
        :lang="item.lang"
        :show="item.show"
        :tool="item.tool"
        :maxHeight="item.maxHeight"
        :locale="item.locale"
        :data="item.data"
      >
      </XHighlight>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'Demo',
    data () {
      return {
        demoList: [
          {
            title: 'Demo 001',
            lang: 'JSON',
            show: ['title', 'lang', 'num'],
            tool: ['full-screen', 'select-all', 'copy'],
            maxHeight: 300,
            locale: 'zh',
            data: {
              title: 'Demo 001',
              lang: 'JSON',
              show: ['title', 'lang', 'num'],
              tool: ['full-screen', 'select-all', 'copy'],
              maxHeight: 300,
              locale: 'zh',
              data: {}
            }
          },
          {
            title: 'Demo 002',
            lang: 'html',
            show: ['title', 'lang'],
            tool: ['select-all', 'copy'],
            locale: 'en',
            data: `<ol>
  <li>列表内容列表内容列表内容列表</li>
  <li>列表内容列表内容列表内容列表</li>
  <li>列表内容列表</li>
  <li>列表内容列表内容4</li>
  <li>列表内容列表内容5</li>
</ol>`
          }
        ]
      }
    }
  }
  /* eslint-enable */
</script>
