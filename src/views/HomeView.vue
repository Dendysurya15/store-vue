<template>
  <Navbar :userName="userName" :avatar="userProfileImage" />
  <div>
    <h1>Welcome, {{ userName }}</h1>
    <!-- <img :src="userProfileImage" alt="Profile Image" /> -->
    <p>Phone: {{ userPhone }}</p>
    <p>Role: {{ userRoleName }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      userName: '',
      userEmail: '',
      userPhone: '',
      userProfileImage: '',
      userRoleName: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    this.loadUserData()
  },
  methods: {
    loadUserData() {
      this.userName = localStorage.getItem('user_name') || ''
      this.userEmail = localStorage.getItem('user_email') || ''
      this.userPhone = localStorage.getItem('user_phone') || ''
      this.userProfileImage = localStorage.getItem('user_profile_image') || ''
      this.userRoleName = localStorage.getItem('user_role_name') || ''
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_email')
      localStorage.removeItem('user_phone')
      localStorage.removeItem('user_profile_image')
      localStorage.removeItem('user_role_code')
      localStorage.removeItem('user_role_name')

      this.$router.push({ name: 'login' })
    }
  }
}
</script>
