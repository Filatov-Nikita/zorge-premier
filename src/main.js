// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/fonts/stylesheet.css'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'
import './main.styl'
import Vue from 'vue'
import MobileDetect from 'mobile-detect'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
import App from './desktop/App'
import AppMobile from './mobile/App'
import * as VueGoogleMaps from 'vue2-google-maps'
import YmapPlugin from 'vue-yandex-maps';
import AsyncComputed from 'vue-async-computed'
import axios from 'axios'
import jQuery from 'jquery'
import './components/formajax'
import SmoothScrollbar from 'vue-smooth-scrollbar'
window.jQuery = jQuery
window.$ = jQuery

require('@fancyapps/fancybox')

axios.defaults.baseURL = 'https://zorge.yes-idea.ru/'

Vue.config.productionTip = false
window.isMobile = (new MobileDetect(window.navigator.userAgent)).mobile()

Vue.prototype.$VKGoal = function (...args) {
  if(!VK) return;
  VK.Goal(...args);
  console.log('goal', ...args);
}

Vue.use(VueAwesomeSwiper)
Vue.use(AsyncComputed)

Vue.use(SmoothScrollbar, {
  alwaysShowTracks: true
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4U5RaZeTlVAiJ0YTT6bvlxtpaJo9D6ik'
  }
})

Vue.use(YmapPlugin, {
  apiKey: 'ff37a483-416c-4661-8877-cc44eb1abf7b',
})

Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    'App': window.isMobile ? AppMobile : App
  },
  template: '<App/>'
})
