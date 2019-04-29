import Vue from 'vue'
import Router from 'vue-router'

// Views
import Collections from '@/views/Collections'
import InsertAssets from '@/views/InsertAssets'
import Search from '@/views/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Search,
    },
    {
      path: '/collections',
      component: Collections,
    },
    {
      path: '/insert',
      component: InsertAssets,
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
