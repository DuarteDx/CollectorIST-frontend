import Vue from 'vue'
import Router from 'vue-router'

// Views
import Collections from '@/views/Collections'
import Insert from '@/views/Insert'
import Assets from '@/views/Assets'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/assets'
    },
    {
      path: '/assets',
      component: Assets,
    },
    {
      path: '/collections',
      component: Collections,
    },
    {
      path: '/insert',
      component: Insert,
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
