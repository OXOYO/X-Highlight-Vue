/**
 * Created by OXOYO on 2018/7/29.
 *
 */
import XHighlight from './XHighlight.vue'

const component = {}

component.installed = false
component.install = function (Vue) {
  if (component.installed) {
    return
  }

  Vue.component('XHighlight', XHighlight)
  component.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component)
}

export default component
