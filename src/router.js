import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children: [
        {      
          path: 'route1',
          name: 'route1',
          component: () => import(/* webpackChunkName: "route1" */ './components/testRoute/test.vue'),
        },
        {      
          path: 'route2',
          name: 'route2',
          component: () => import(/* webpackChunkName: "route2" */ './components/testRoute/test.vue'),
        },
        {
          path: 'route3',
          name: 'route3',
          component: () => import(/* webpackChunkName: "route3" */ './components/testRoute/test.vue'),
        },
        {
          path: 'route4/:id',
          name: 'route4',
          component: () => import(/* webpackChunkName: "route4" */ './components/testRoute/routeParams.vue'),
        }
      ]
    }
  ]
})
