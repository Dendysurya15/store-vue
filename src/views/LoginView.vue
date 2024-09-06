<template>
  <div
    class="w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate flex items-center justify-center"
  >
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-md">
      <h1 class="text-2xl font-bold mb-6 text-gray-900">Autentikasi Sistem</h1>
      <p class="mb-4">Silakan masuk portal web dengan username dan password dengan benar!</p>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            v-model="phone"
            type="text"
            placeholder="Phone"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
      </form>
      <p class="text-center mt-10">@retail.store.2024</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data() {
    return {
      phone: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.loading = true
      try {
        const response = await axios.post(
          'https://sandbox.dibuiltadi.com/api/dashboard/common/v1/auth/login',
          {
            phone: this.phone,
            password: this.password
          }
        )

        if (response.data.response_code === '2000000') {
          // Store the necessary data
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('user_name', response.data.name)
          localStorage.setItem('user_phone', response.data.phone)
          localStorage.setItem('user_profile_image', response.data.profile_image)
          localStorage.setItem('user_role_code', response.data.role_code)
          localStorage.setItem('user_role_name', response.data.role_name)

          // Redirect to home
          this.$router.push({ name: 'dashboard' })
        } else {
          this.error = response.data.response_message || 'Login failed'
        }
      } catch (err) {
        this.error = 'An error occurred during login.'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

.background-animate {
  background-size: 400%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}

@keyframes AnimationName {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
