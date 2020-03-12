import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome }, 
        { path: '/users', component: Users }
      ]
    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 访问的路径
  //from 从哪个路径跳转上来
  //next 函数，表示放行 next() 放行 next('/login') 强制跳转
  if (to.path == '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})



export default router
