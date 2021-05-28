import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
    // component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/admin'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/user/Profile'),
    meta: {
      requireAuth: true
    }
  },
    // POST
  {
    path: '/postManage',
    name: 'PostManage',
    component: () => import('../views/post/PostManage'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/post/Post'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/post/Create'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/adoptManage',
    name: 'AdoptManage',
    component: () => import('../views/adopt/AdoptManage'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/applyManage',
    name: 'ApplyManage',
    component: () => import('../views/adopt/ApplyManage'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/adopt/Timeline'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/user/Message'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/zone',
    name: 'Zone',
    component: () => import('../views/user/Zone'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
