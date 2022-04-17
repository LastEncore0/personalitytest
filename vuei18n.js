import Vue from 'vue'
// import App from './App'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    zh: {
      test_title: '人格心理类型测试'
    },
    en: {
       test_title: 'Personality type Test'
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  routes: [
    {
      path: '/',
      name: 'Hello',
      store,
      component: Hello
    }
  ],
  i18n,
  template: '<App/>',
//   components: { App }
})