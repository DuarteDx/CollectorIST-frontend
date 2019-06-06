import Vue from 'vue'
import Router from 'vue-router'

// Views
import Collections from '@/views/Collections'
import Collection from '@/views/Collection'
import Insert from '@/views/Insert'
import Assets from '@/views/Assets'
import Asset from '@/views/Asset'
import Login from '@/views/Login'
import Logs from '@/views/Logs'
import ManageUsers from '@/views/ManageUsers'

// Front-end variables
import Credentials from '@/assets/scripts/login.js'

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
      name: 'login',
      component: Login
    },
    {
      path: '/auth',
      beforeEnter() {location.href = 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=1414440104755271&redirect_uri=http://localhost:8080/login'} 
    },
    {
    path: '/logs',
    component: Logs
    },
    {
    path: '/users/manage',
    component: ManageUsers
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// Execute this before going to any route
// Redirects to login page if user doesn't have a jwt token
router.beforeEach(async function(to, from, next) {
  if(Credentials.token || to.path == '/auth' || to.path == '/login') {
    next()
    // console.log('User is logged in')
  }
  else {
    next({ path: '/auth'})
    console.log('User is not logged in, redirecting to login page')
  }
})

export default router
