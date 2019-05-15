import Vue from 'vue'
import Router from 'vue-router'

// Views
import Collections from '@/views/Collections'
import Insert from '@/views/Insert'
import Assets from '@/views/Assets'
import Login from '@/views/Login'
import Users from '@/views/Users'

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
    {
      path: '/login',
      component: Login
    },
    {
      path: '/users',
      component: Users
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
