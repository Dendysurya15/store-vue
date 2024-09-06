<template>
  <nav class="border-2 bg-red-300 w-full pr-2">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Left Section (Logo) -->
      <!-- <div class="flex items-center space-x-4">
        <img src="../assets/logo.svg" alt="Logo" class="h-8" />
        <span class="text-lg font-semibold">Retail Online</span>
      </div> -->

      <!-- Right Section (User Info or Login) -->
      <div class="flex items-center space-x-4">
        <template v-if="userName">
          <button
            @click="toggleMenu"
            aria-haspopup="true"
            aria-controls="menu"
            class="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <img :src="avatar" alt="User Avatar" class="w-6 h-6 rounded-full mr-2" />
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
        </template>
        <template v-else>
          <button
            class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            LOGIN
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'primevue/menu'

const props = defineProps({
  avatar: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    default: ''
  }
})

const menu = ref(null)
const router = useRouter()

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

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// Function to navigate to different routes
const navigateTo = (routeName) => {
  router.push({ name: routeName })
}
</script>
