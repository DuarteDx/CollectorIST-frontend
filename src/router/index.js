import Vue from 'vue'
import Router from 'vue-router'
import PageWithNavBarAndFooterLayout from '@/layouts/PageWithNavBarAndFooterLayout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: PageWithNavBarAndFooterLayout,
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
