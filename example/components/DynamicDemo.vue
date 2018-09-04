/**
* Created by yangfan9244 on 2018/9/4.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .demo {
    width: 100%;
    text-align: center;

    .demo-header {
      width: 80%;
      margin: 10px auto;
      text-align: left;

      .form-item {
        padding: 10px;
        display: inline-block;

        .form-label {
          display: inline-block;
          width: 80px;
          text-align: right;
        }
        .form-control {
          display: inline-block;
          width: 200px;
        }
      }

    }
    .demo-body {
      width: 80%;
      margin: 10px auto;
    }
  }
</style>

<template>
  <div class="demo">
    <div class="demo-header">
      <div class="form-item">
        <label class="form-label">title</label>
        <input class="form-control" type="text" v-model="options.title">
      </div>
      <div class="form-item">
        <label class="form-label">lang</label>
        <input class="form-control" type="text" v-model="options.lang">
      </div>
      <div class="form-item">
        <label class="form-label">show</label>
        <select class="form-control" v-model="options.show" multiple>
          <option>title</option>
          <option>lang</option>
          <option>num</option>
          <option>nodata</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">tool</label>
        <select class="form-control" v-model="options.tool" multiple>
          <option>full-screen</option>
          <option>select-all</option>
          <option>copy</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">maxHeight</label>
        <input class="form-control" type="number" v-model="options.maxHeight">
      </div>
      <div class="form-item">
        <label class="form-label">locale</label>
        <select class="form-control" v-model="options.locale">
          <option>zh</option>
          <option>en</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">data</label>
        <textarea class="form-control" v-model="dataStr"></textarea>
      </div>
    </div>
    <div class="demo-body">
      <XHighlight
        class="x-highlight"
        :title="options.title"
        :lang="options.lang"
        :show="options.show"
        :tool="options.tool"
        :maxHeight="options.maxHeight"
        :locale="options.locale"
        :data="data"
      >
      </XHighlight>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicDemo',
  data () {
    return {
      options: {
        title: 'Demo 001',
        lang: 'JSON',
        show: ['title', 'lang', 'num', 'nodata'],
        tool: ['full-screen', 'select-all', 'copy'],
        maxHeight: 300,
        locale: 'zh',
        data: {}
      },
      dataStr: '',
      data: ''
    }
  },
  watch: {
    dataStr: function (val) {
      let _t = this
      try {
        val = JSON.parse(val)
      } catch (e) {
        console.log(e)
      }
      _t.data = val
    },
    options: {
      handler: function (val) {
        let _t = this
        val.maxHeight = isNaN(parseInt(val.maxHeight)) ? 0 : parseInt(val.maxHeight)
        _t.setDataStr(val)
        return val
      },
      deep: true
    }
  },
  methods: {
    setDataStr: function (options) {
      let _t = this
      options = options || _t.options
      let data = {
        title: options.title,
        lang: options.lang,
        show: options.show,
        tool: options.tool,
        maxHeight: options.maxHeight,
        locale: options.locale,
        data: {}
      }
      _t.dataStr = JSON.stringify(data)
    }
  },
  created: function () {
    let _t = this
    _t.setDataStr()
  }
}
</script>
