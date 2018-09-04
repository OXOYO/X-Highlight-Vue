# X-Highlight-Vue

[![Version](https://img.shields.io/npm/v/x-highlight.svg)](https://www.npmjs.com/package/x-highlight)
[![License](https://img.shields.io/npm/l/x-highlight.svg)](https://www.npmjs.com/package/x-highlight)
[![NPM downloads](http://img.shields.io/npm/dm/x-highlight.svg?style=flat-square)](https://npmjs.org/package/x-highlight)
[![Downloads](https://img.shields.io/npm/dt/x-highlight.svg)](https://www.npmjs.com/package/x-highlight)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/x-highlight/dist/XHighlight.js?compression=gzip&label=gzip%20size:%20JS&style=flat-square)

> A Vue.js plugin use for Syntax highlighting.


## Example

[Demo](https://oxoyo.github.io/X-Highlight-Vue/)

``` bash
# git clone https://github.com/OXOYO/X-Highlight-Vue.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Usage

  Packages install
  ``` bash
  npm install x-highlight --save
  ```

  main.js
  ```bash
  import XHighlight from 'XHighlight'
  import 'XHighlight/dist/css/XHighlight.css'
  // highlight theme
  import 'highlight.js/styles/zenburn.css'

  Vue.use(XHighlight)

  ```

  demo.vue
  ```bash
  <XHighlight
    class="x-highlight"
    :title="options.title"
    :lang="options.lang"
    :show="options.show"
    :tool="options.tool"
    :maxHeight="options.maxHeight"
    :locale="options.locale"
    :data="options.data"
  >
  </XHighlight>
  ```

## Options

| Prop | Type | Default | Describe |
|---|---|---|---|
| title | String | '' |  |
| lang | String | 'JavaScript' |  |
| show | Array | ['title', 'lang', 'num', 'nodata'] |  |
| tool | Array | ['full-screen', 'select-all', 'copy'] |  |
| maxHeight | Number |  |  |
| locale | String | 'zh' |  |
| nodata | String | 暂无数据... |  |
| data |  | '' |  |


## License
[MIT](http://opensource.org/licenses/MIT)
