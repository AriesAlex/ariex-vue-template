import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import VueEvents from 'vue-events'
Vue.use(VueEvents)

import elementUILang from 'element-ui/lib/locale/lang/en'
import elementUILocale from 'element-ui/lib/locale'
elementUILocale.use(elementUILang)

import 'element-ui/lib/theme-chalk/index.css'
import { Button, Input, } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

import FullscreenLoading from '@/components/FullscreenLoading'
Vue.component('Loading', FullscreenLoading)

import Icon from '@/components/Icon'
Vue.component('Icon', Icon)

import WindowEvents from '@/mixins/WindowEvents'
Vue.mixin(WindowEvents)

import axios from 'axios'
import store from './store'
Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({baseURL: '/'})
    Vue.prototype.$store = new Vue(store)
  }
})
Vue.mixin({
  computed: {
    $full() { return this.$store.isFull }
  }
})

NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.filter = Array.prototype.filter

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
