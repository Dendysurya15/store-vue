<template>
  <div id="app">
    <!-- Check if user is authenticated before showing the Navbar -->
    <!-- <Navbar v-if="isAuthenticated" :userName="userName" :avatar="userProfileImage" /> -->

    <!-- Render the page component -->
    <div>
      <router-view />
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

// State to check if the user is authenticated
const isAuthenticated = ref(false)
const userName = ref('')
const userProfileImage = ref('')
const router = useRouter()
const route = useRoute()

const checkAuthStatus = () => {
  const token = localStorage.getItem('access_token')
  isAuthenticated.value = !!token

  if (isAuthenticated.value) {
    // Retrieve user data from localStorage
    userName.value = localStorage.getItem('user_name') || 'Guest'
    userProfileImage.value = localStorage.getItem('user_profile_image') || 'default-avatar.png'
  }
}

// Check authentication status on component mount
onMounted(() => {
  checkAuthStatus()

  // Redirect to login if not authenticated
  if (!isAuthenticated.value && route.name !== 'login') {
    router.push({ name: 'login' })
  }
})

// Watch for route changes to recheck authentication status
watch(route, () => {
  checkAuthStatus()
})
</script>

<style>
/* Global styles here */
</style>
