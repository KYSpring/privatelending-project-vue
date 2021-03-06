import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import SearchPage from '@/components/SearchPage'
import caseDetail from '@/components/caseDetail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/caseDetail',
      name: 'caseDetail',
      component: caseDetail
    }
  ]
})
