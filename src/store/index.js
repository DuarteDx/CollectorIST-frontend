import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18N from 'vuex-i18n'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import setupI18N from '@/i18n'

import recordCreationModule from './modules/record-creation'
import recordsModule from './modules/records'
import researchersModule from './modules/researchers'
import unitsModule from './modules/units'
import setupAccountModule from './modules/setup-account'
import profileModule from './modules/profile'
import usersModule from './modules/users'
import configurationModule from './modules/configuration'

Vue.use(Vuex)

const state = {
  isInitialLoading: true,
  pendingRequestsToServer: 0,
  topMessage: { active: false, msg: { pt: ' ', en: '' }, dismiss: false, type: '' }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    'record-creation': recordCreationModule,
    'records': recordsModule,
    'researchers': researchersModule,
    'units': unitsModule,
    'users': usersModule,
    'setupAccount': setupAccountModule,
    'profile': profileModule,
    'configuration': configurationModule
  }
})

Vue.use(VuexI18N.plugin, store)
setupI18N(Vue, store)

export default store
