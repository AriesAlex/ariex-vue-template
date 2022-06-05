import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    view: 'Home',
  },

  { path: '*', redirect: '/' }
]

function processRoute(route) {
  if(typeof route == 'string') {
    routes.push({ view: route })
    routes = routes.filter(item => item != route)
    route = routes[routes.length - 1]
  }
  route.component = () => import('@/views/' + route.view + '.vue')
  route.name = route.view
  if(typeof route.path !== 'string') route.path = '/' + route.view.toLowerCase()
  if(route.path.includes(':') || route.path.includes('?')) route.props = true
  if(route.childrens) {
    route.children = route.childrens
    delete route.childrens
  }
  if(route.children) route.children.forEach(processRoute)
}
routes.forEach(processRoute)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
