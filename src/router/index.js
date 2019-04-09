import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import About from '../components/About'
import My from '../components/My'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/my',
      name: 'My',
      component: My
    }
  ]
})
