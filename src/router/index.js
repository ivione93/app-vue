import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'GestorAtletas',
    component: () => import(/* webpackChunkName: "GestorAtletas" */ '../views/GestorAtletas.vue')
  }, {
    path: '/atletas',
    name: 'Atletas',
    component: () => import(/* webpackChunkName: "atletas" */ '../views/Atletas.vue')
  }, {
    path: '/ranking',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "ranking" */ '../views/Ranking.vue')
  }, {
    path: '/competiciones',
    name: 'Competiciones',
    component: () => import(/* webpackChunkName: "competiciones" */ '../views/Competiciones.vue')
  }, {
    path: '/calendario',
    name: 'CalendarioView',
    component: () => import(/* webpackChunkName: "calendario" */ '../views/CalendarioView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
