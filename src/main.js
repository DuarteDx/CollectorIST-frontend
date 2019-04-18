// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VuePorg from 'vue-porg'
import client from '@/api/client'
import Vuelidate from 'vuelidate'
import 'vue-porg/dist/app.vue-porg.css'
import PageWithNavBarAndFooterLayout from '@/layouts/PageWithNavBarAndFooterLayout'
import PageNotFoundPage from '@/pages/PageNotFoundPage'
import moment from 'moment'
import ProfileAPI from '@/api/profile'

Vue.use(Vuelidate)

Vue.use(VuePorg, {
  router,
  store,
  axios: client,
  errorHandler: () => {
    store.dispatch('setTopMessage', { active: true, msg: { pt: Vue.i18n.translateIn('pt', 'internal.error'), en: Vue.i18n.translateIn('en', 'internal.error') }, dismiss: true, type: 'warn' })
  },
  notAuthorizedHandler: () => {
    alert('Not authorized')
  },
  notAuthorizedHandlerRoute: (auth, user) => {
    alert('Not authorized route')
  }
})

Vue.mixin({
  methods: {
    setLocale (locale, $auth) {
      this.$i18n.set(locale)
      moment.locale(locale)
      if ($auth && $auth.isLogged()) {
        ProfileAPI.update({ locale })
      }
    }
  }
})

Vue.prototype.$notification = {
  send: function ({ key, dismiss, type }) {
    store.dispatch('setTopMessage', { active: true, msg: { pt: key, en: key }, dismiss, type })
  }
}

Vue.filter('prettyBytes', function (num) {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('Expected a number')
  }

  var exponent
  var unit
  var neg = num < 0
  var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (neg) {
    num = -num
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B'
  }

  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = (num / Math.pow(1000, exponent)).toFixed(2) * 1
  unit = units[exponent]

  return (neg ? '-' : '') + num + ' ' + unit
})

router.addRoutes([{
  path: '',
  component: PageWithNavBarAndFooterLayout,
  children: [{
    path: '*',
    name: 'PageNotFound',
    component: PageNotFoundPage
  }]
}])

window.addEventListener('offline', () => {
  store.dispatch('setTopMessage', { active: true, msg: { pt: Vue.i18n.translateIn('pt', 'no.network'), en: Vue.i18n.translateIn('en', 'no.network') }, dismiss: false, type: 'warn' })
}, false)

window.addEventListener('online', () => {
  if (store.state.topMessage.active && store.state.topMessage.msg[Vue.i18n.locale()] === Vue.i18n.translate('no.network')) {
    store.dispatch('setTopMessage', { active: false, msg: { pt: '', en: '' }, dismiss: false, type: '' })
  }
}, false)

Vue.config.productionTip = false

Vue.prototype.PRODREADY = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render (createElement) {
    return createElement(App, {})
  }
})
