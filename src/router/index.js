import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '@/views/Dashboard.vue'
import Coupon from '@/views/Coupon.vue'
import Order from '@/views/Order.vue'
import ProfileView from '@/views/ProfileView.vue'
import MainLayout from '@/layout/main.vue' // Import the layout

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    component: MainLayout, // Wrap routes with MainLayout
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: Coupon
      },
      {
        path: 'order',
        name: 'order',
        component: Order
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Add Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login' && token) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
})

export default router
