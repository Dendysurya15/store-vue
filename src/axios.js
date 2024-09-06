import axios from 'axios'

axios.defaults.baseURL = 'https://sandbox.dibuiltadi.com/api/dashboard/common/v1/auth/login'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
