/**
* Created by OXOYO on 2018/7/29.
*
*/

<style lang="less" rel="stylesheet/less">
  .high-light-block {
    position: relative;
    display: inline-block;
    width: 100%;
    line-height: 1;
    margin-bottom: 10px;
    background: #3f3f3f;
    text-align: left;
    box-sizing: border-box;

    * {
      box-sizing: border-box;
    }

    &:hover {
      .block-header {
        .header-tool {
          display: inline-block;
        }
      }
    }
    .block-header {
      display: inline-block;
      width: 100%;
      line-height: 1;
      padding: 5px 0;
      background: #3f3f3f;
      /*border-bottom: 1px solid #c5c5c5;*/
      .header-title {
        float: left;
        display: inline-block;
        color: #ccc;
        text-align: right;
        padding: 5px 10px;
        font-weight: 600;
      }
      .header-lang {
        float: right;
        display: inline-block;
        color: #ccc;
        text-align: right;
        font-size: 20px;
        padding: 0 10px;
        font-weight: 600;
      }
      .header-tool {
        display: none;
        white-space: normal;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        line-height: 1;
        /*background-color: #3C3F41;*/
        background-color: #2B2B2B;
        padding: 0 10px;
        .tool-btn {
          display: inline-block;
          line-height: normal;

          .tool-icon {
            font-size: 20px;
            color: #9F9F9F;
            padding: 5px;
            &:hover {
              color: #FFF;
            }
          }
        }
      }
    }
    .block-body {
      display: inline-block;
      width: 100%;
      line-height: 1;
      max-height: 19em;
      overflow: auto;

      .line-block {
        float: left;
        width: 50px;

        .line-num {
          display: inline-block;
          color: #5E6164;
          text-align: right;
          width: 100%;
          height: 22px;
          line-height: 22px;
          vertical-align: middle;

          &:after {
            content: ' ';
            display: inline-block;
            width: 1px;
            height: 100%;
            line-height: 2;
            border-right: 1px solid #c5c5c5;
            margin-left: 10px;
            vertical-align: middle;
          }
        }
      }

      .code-block {
        float: left;
        display: inline-block;
        width: 100%;

        &.code-block-calc {
          width: calc(~"100% - 50px");
        }

        .code-content {
          white-space: pre-wrap;
          word-wrap: break-word;

          .line-code {
            width: 100%;
            height: 22px;
            line-height: 22px;
            display: inline-block;
            padding: 0 10px;
            margin: 0;
            vertical-align: middle;

            &:hover {
              background: #323232;
            }

            span {
              &:hover {
                background: #323232;
              }
            }
          }
          span {
            &:hover {
              background: #323232;
            }
            &::selection {
              background: #0D6AD9;
            }
          }
        }

        &::selection {
          background: #0D6AD9;
        }
        &.nodata {
          color: #f90;
          text-align: center;
        }
      }
    }
    pre,
    code {
      line-height: 1.5;
      display: block;
      background: #3f3f3f;
      border: none;
    }
    pre {
      margin: 0;
    }
  }
</style>

<template>
  <div class="high-light-block" :id="styles">
    <div class="block-header">
      <!-- 标题 -->
      <div class="header-title" v-if="show.includes('title')">{{ title }}</div>
      <div class="header-lang" v-if="show.includes('lang')">{{ lang }}</div>
      <!-- 工具栏 -->
      <div class="header-tool" v-if="tool.length">
        <div v-if="tool.includes('select-all')" class="tool-btn" @click.stop="handleAction('select-all')">
          <Icon class="tool-icon" type="select-all" :title="L[locale]['select-all']"></Icon>
        </div>
        <div v-if="tool.includes('copy')" class="tool-btn" @click.stop="handleAction('copy')">
          <Icon class="tool-icon" type="copy" :title="L[locale]['copy']"></Icon>
        </div>
      </div>
    </div>
    <div class="block-body" :style="bodyStyle">
      <div class="line-block">
        <template v-if="show.includes('num')">
          <div
            class="line-num"
            v-for="num in lineCount"
            :key="'line-num-' + num"
          >{{ num }}</div>
        </template>
      </div>
      <div :class="{ 'code-block': true, 'code-block-calc': show.includes('num') }">
        <pre><code class="code-content" :class="codeContentClass">{{ data ? data : nodata }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
// import hljs from 'highlight.js/lib/highlight'
import Icon from './icon/index.vue'

export default {
  name: 'XHighlight',
  components: {
    Icon
  },
  data () {
    return {
      // 语言包
      L: {
        zh: {
          'select-all': '全选',
          'copy': '复制'
        },
        en: {
          'select-all': 'select all',
          'copy': 'copy'
        }
      },
      // 行数
      lineCount: 0
    }
  },
  props: {
    data: {},
    styles: {
      type: String,
      // zenburn vs2015 agate
      default: 'zenburn'
    },
    lang: {
      type: String,
      default: 'JavaScript'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      type: Array,
      default: () => ['title', 'lang', 'num']
    },
    tool: {
      type: Array,
      default: () => ['select-all', 'copy']
    },
    maxHeight: {
      type: Number
    },
    nodata: {
      type: String,
      default: '暂无数据！'
    },
    locale: {
      type: String,
      default: 'zh'
    }
  },
  computed: {
    bodyStyle: function () {
      let _t = this
      let obj = {}
      if (_t.maxHeight) {
        obj['max-height'] = _t.maxHeight + 'px'
      }
      return obj
    },
    codeContentClass: function () {
      let _t = this
      let obj = {
        [_t.lang]: true
      }
      if (!_t.data) {
        obj['nodata'] = true
      }
      return obj
    }
  },
  watch: {
    data: {
      handler: function () {
        let _t = this
        _t.render()
      },
      deep: true
    }
  },
  methods: {
    render: function () {
      let _t = this
      if (_t.data) {
        setTimeout(function () {
          _t.$nextTick(function () {
            // 初始化hljs
            // hljs.configure({useBR: true})
            _t.renderLine()
          })
        }, 0)
      }
    },
    renderLine: function () {
      let _t = this
      let snippet = _t.$el.querySelector('.high-light-block pre code')
      let text = snippet.innerHTML
      text = text.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
      let textArr = text.split('\n')
      _t.lineCount = textArr.length
      let codeArr = []
      for (let i = 0, len = textArr.length, val, item; i < len; i++) {
        val = textArr[i]
        item = '<div class="line-code">' + val + '</div>\n'
        codeArr.push(item)
      }
      let codeStr = codeArr.join('')
      _t.$el.querySelector('.high-light-block pre code').innerHTML = codeStr
      let lineCodeArr = _t.$el.querySelectorAll('.high-light-block .line-code')
      lineCodeArr.forEach(snippet => {
        hljs.highlightBlock(snippet)
      })
    },
    handleAction: function (action) {
      let _t = this
      let snippet = _t.$el.querySelector('.high-light-block pre code')
      let handleSelectAll = function () {
        // 获取选区
        let selection = window.getSelection()
        // 选中所有子节点
        selection.selectAllChildren(snippet)
      }
      let handleCopy = function () {
        // 获取选区
        let selection = window.getSelection()
        // 获取选中文本
        let selectedText = selection.toString()
        if (!selectedText) {
          // 选中所有子节点
          selection.selectAllChildren(snippet)
        }
        // 复制
        document.execCommand('copy')
      }
      switch (action) {
        case 'select-all':
          handleSelectAll()
          break
        case 'copy':
          handleCopy()
          break
      }
    },
    loadStyles: function () {
      let _t = this
      if (_t.styles) {
        try {
          // 加载样式
          require('highlight.js/styles/' + _t.styles + '.css')
          console.log('Load', 'highlight.js/styles/' + _t.styles + '.css', 'succeed.')
        } catch (e) {
          console.warn('Load', 'highlight.js/styles/' + _t.styles + '.css', 'failed.')
        }
      }
    },
    loadLang: function () {
      let _t = this
      if (_t.lang) {
        let fileName = _t.lang.toLowerCase()
        try {
          // 加载语言包
          let lang = require('highlight.js/lib/languages/' + fileName + '.js')
          console.log('lang', lang)
          hljs.registerLanguage(_t.lang, lang)
          console.log('Load', 'highlight.js/lib/languages/' + fileName + '.js', 'succeed.')
        } catch (e) {
          console.warn('Load', 'highlight.js/lib/languages/' + fileName + '.js', 'failed.')
        }
      }
    }
  },
  /*
  beforeMount: function () {
    let _t = this
    if (_t.styles) {
      try {
        // 加载样式
        require('highlight.js/styles/' + _t.styles + '.css')
        console.log('Load', 'highlight.js/styles/' + _t.styles + '.css', 'succeed.')
      } catch (e) {
        console.warn('Load', 'highlight.js/styles/' + _t.styles + '.css', 'failed.')
      }
    }
  },
  */
  mounted: function () {
    let _t = this
    // _t.loadLang()
    _t.loadStyles()
    _t.render()
  }
  /*
  ,
  updated: function () {
    let _t = this
    // _t.loadStyles()
    _t.render()
  }
  */
}
</script>
