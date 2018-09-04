// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// dev
// import XHighlight from '../src/index'
// prod
import XHighlight from '../dist/XHighlight'
import '../dist/css/XHighlight.css'
// highlight theme
import 'highlight.js/styles/zenburn.css'

Vue.use(XHighlight)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
