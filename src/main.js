import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import axios from 'axios'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import VueApexCharts from 'vue3-apexcharts'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
axios.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    if (error.response && error.response.status === 401) {
      e
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_phone')
      localStorage.removeItem('user_profile_image')
      localStorage.removeItem('user_role_code')
      localStorage.removeItem('user_role_name')

      // Redirect the user to the login page
      router.push({ name: 'login' })
    }
    return Promise.reject(error) // Propagate the error
  }
)

const app = createApp(App)
app.use(router)
app.use(VueApexCharts)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'light',
      cssLayer: false
    }
  }
})
app.mount('#app')
