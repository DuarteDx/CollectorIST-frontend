import Vue from 'vue'
import _ from 'underscore'
import Router from 'vue-router'
import store from '@/store'
import PageWithNavBarLayout from '@/layouts/PageWithNavBarLayout'
import PageWithNavBarAndFooterLayout from '@/layouts/PageWithNavBarAndFooterLayout'

import SearchPage from '@/pages/SearchPage'

import SearchResultsPage from '@/pages/SearchResultsPage'
import AssetPage from '@/pages/AssetPage'
import RegisterAssetPage from '@/pages/RegisterAssetPage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: PageWithNavBarAndFooterLayout,
      children: [{
        path: '/',
        name: 'SearchPage',
        component: SearchPage
      },
      {
        path: '/search',
        name: 'SearchResultsPage',
        component: SearchResultsPage,
        props: (route) => {
          return {
            query: route.query.query,
            type: route.query.type,
            page: route.query.page ? Number(route.query.page) : undefined,
            templates: route.query.templates ? [].concat(route.query.templates) : []
          }
        }
      },
      {
        path: '/assets/:id',
        name: 'AssetPage',
        component: AssetPage,
        props: (route) => ({
          id: route.params.id,
          page: Number(route.query.page) || 1
        }),
        beforeEnter: async (to, from, next) => {
          try {
            await store.dispatch('records/fetchOne', {
              id: to.params.id
            })
            return next()
          } catch (err) {
            if (err.response.status === 404) {
              return next({ name: 'PageNotFound', params: [to.path], replace: true })
            }
          }
        }
      }
      ]
    },
    {
      path: '',
      component: PageWithNavBarLayout,
      children: [{
        path: '/register-asset',
        name: 'RegisterAssetPage',
        component: RegisterAssetPage,
        meta: {
          roles: ['user']
        }
      }]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  if (router.app.$auth.isLogged()) {
    await store.dispatch('profile/fetch')
  }
  if (to.meta.roles) {
    if (!store.state.profile.current) {
      return next({ name: 'PageNotFound', params: [to.path], replace: true })
    } else {
      if (_.difference(to.meta.roles, store.state.profile.current.roles).length > 0) {
        return next({ name: 'PageNotFound', params: [to.path], replace: true })
      } else {
        return next()
      }
    }
  } else {
    return next()
  }
})

export default router
