import Vue from 'vue'
import Router from 'vue-router'

// Views
import Collections from '@/views/Collections'
import Collection from '@/views/Collection'
import Insert from '@/views/Insert'
import Assets from '@/views/Assets'
import Asset from '@/views/Asset'
import Login from '@/views/Login'
import Users from '@/views/Users'
import Logs from '@/views/Logs'

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
      path: '/assets/:id',
      component: Asset
    },
    {
      path: '/collections',
      component: Collections,
    },
    {
      path: '/collections/:id',
      component: Collection
    },
    {
      path: '/insert',
      component: Insert,
    },
    {
      path: '/login',
      redirect: 'www.google.com'
    },
    {
      path: '/users',
      component: Users
    },
    {
    path: '/logs',
    component: Logs
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
