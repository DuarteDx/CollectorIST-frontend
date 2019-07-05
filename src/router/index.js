import Vue from 'vue'
import Router from 'vue-router'

// Views
import Assets from '@/views/Assets'
import Asset from '@/views/Asset'
import EditAsset from '@/views/EditAsset'
import Collections from '@/views/Collections'
import Collection from '@/views/Collection'
import Categories from '@/views/Categories'
import Category from '@/views/Category'
import Login from '@/views/Login'
import Logs from '@/views/Logs'
import ManageUsers from '@/views/ManageUsers'
import EditUser from '@/views/EditUser'

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
      path: '/assets/:id/edit',
      component: EditAsset
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
      path: '/categories',
      component: Categories
    },
    {
      path: '/categories/:id',
      component: Category
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter() {location.href = 'https://id.tecnico.ulisboa.pt/cas/logout'} 
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
    component: ManageUsers,
    async beforeEnter(to, from, next) {
      if(await Credentials.checkIfAdmin()) {next()}
      else {next('/')}
      }
    },
    {
      path: '/users/manage/:istId',
      component: EditUser
    },
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
