import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateAccount.vue')
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Conversation.vue')
  },
  {
    path: '/membres',
    name: 'Membres',
    component: () => import(/* webpackChunkName: "about" */ '../views/Membres.vue')
  },
  {
    path: '/membre/:fullname',
    name: 'Membre',
    component: () => import(/* webpackChunkName: "about" */ '../views/Membre.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
