import Vue from 'vue'
import Router from 'vue-router'
// import PageWithNavBarAndFooterLayout from '@/layouts/PageWithNavBarAndFooterLayout'

import HelloWorld from '@/components/HelloWorld.vue'

// import SearchPage from '@/pages/SearchPage'

// import SearchResultsPage from '@/pages/SearchResultsPage'
// import AssetPage from '@/pages/AssetPage'
// import RegisterAssetPage from '@/pages/RegisterAssetPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld,
      /* children: [{
        path: '/',
        name: 'SearchPage',
        component: SearchPage
      }
      ] */
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
