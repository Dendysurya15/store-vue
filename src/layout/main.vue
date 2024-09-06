<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-white text-black shadow fixed h-full transition-transform duration-300',
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      ]"
      style="width: 250px"
    >
      <div class="p-4">
        <div class="p-4 flex items-center">
          <img src="@/assets/logo.svg" alt="Vue Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-lg font-bold">Retail Store</h1>
        </div>
      </div>
      <nav class="p-4">
        <ul>
          <li class="mb-2" v-for="(item, index) in menuItems" :key="index">
            <router-link
              :to="item.route"
              class="flex items-center p-2 rounded-md transition-colors duration-200"
              :class="{
                'bg-[#E7500B] hover:bg-[#f87336] text-white': $route.path === item.route,
                'hover:bg-[#f87336] hover:text-white': $route.path !== item.route
              }"
            >
              <component :is="item.icon" class="h-5 w-5 mr-4" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="{ 'ml-0': isCollapsed, 'ml-[250px]': !isCollapsed }"
    >
      <div
        class="bg-white p-4 flex justify-between items-center fixed z-10 shadow transition-all duration-300"
        :class="{ 'left-0 w-full': isCollapsed, 'left-[250px] right-0': !isCollapsed }"
      >
        <div class="flex items-center">
          <button @click="toggleSidebar" class="text-gray-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6"
              :class="{ 'transform scale-x-[-1]': isCollapsed }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <p class="ml-4 font-semibold">{{ currentRouteName }}</p>
        </div>
        <button
          @click="toggleMenu"
          aria-haspopup="true"
          aria-controls="menu"
          class="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <img :src="userProfileImage" alt="User Avatar" class="w-6 h-6 rounded-full mr-2" />
          <span class="text-gray-800 font-medium">{{ userName.toUpperCase() }}</span>
          <svg
            class="w-4 h-4 ml-2 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <Menu ref="menu" id="menu" :model="items" :popup="true" />
      </div>

      <!-- Page Content -->
      <div class="pt-16 p-6 overflow-y-auto h-full transition-all duration-300">
        <router-view @nameUpdated="updateUserName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Menu from 'primevue/menu'
import {
  PresentationChartBarIcon,
  DocumentDuplicateIcon,
  ReceiptPercentIcon
} from '@heroicons/vue/24/solid'

const isCollapsed = ref(false)
const menuItems = ref([
  { name: 'Dashboard', route: '/dashboard', icon: PresentationChartBarIcon },
  { name: 'Coupon', route: '/coupon', icon: ReceiptPercentIcon },
  { name: 'Order', route: '/order', icon: DocumentDuplicateIcon }
])

const isAuthenticated = ref(false)
const userName = ref('')
const userProfileImage = ref('')
const router = useRouter()
const route = useRoute()

const menu = ref(null)
const updateUserName = (newName) => {
  console.log('nais')
  userName.value = newName
  localStorage.setItem('user_name', newName)
}
const items = ref([
  {
    label: 'Navigasi'
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => router.push('/profile')
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => logout()
  }
])

const currentRouteName = computed(() => {
  return route.name ? route.name.charAt(0).toUpperCase() + route.name.slice(1) : 'Dashboard'
})

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

const checkAuthStatus = () => {
  const token = localStorage.getItem('access_token')
  isAuthenticated.value = !!token

  if (isAuthenticated.value) {
    userName.value = localStorage.getItem('user_name') || 'Guest'
    userProfileImage.value = localStorage.getItem('user_profile_image') || 'default-avatar.png'
  }
}

onMounted(() => {
  checkAuthStatus()

  if (!isAuthenticated.value && route.name !== 'login') {
    router.push({ name: 'login' })
  }
})

watch(route, () => {
  checkAuthStatus()
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
