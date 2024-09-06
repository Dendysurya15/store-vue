<template>
  <div class="block max-w p-6 m-2 bg-white border border-gray-200 rounded-lg shadow">
    <div v-if="loading">
      <div class="mb-4">
        <Skeleton height="2rem" class="mb-2"></Skeleton>
      </div>
      <ul>
        <li v-for="index in 5" :key="index" class="mb-4">
          <div class="flex items-center">
            <Skeleton shape="circle" width="2rem" height="2rem" class="mr-2"></Skeleton>
            <div class="w-full">
              <Skeleton class="mb-2"></Skeleton>
              <Skeleton width="5rem" height="1rem"></Skeleton>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="flex justify-between">
        <h2 class="mb-3"><strong>Top Product</strong></h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      </div>
      <ul>
        <li v-for="(product, index) in products" :key="product.code">
          <div class="flex items-center mb-2">
            <Avatar
              :label="index + 1"
              class="mr-2"
              style="background-color: #0aa576; color: white"
              shape="circle"
            />

            <div class="flex w-full justify-between items-center">
              <div class="flex-col">
                <p>{{ product.name }}</p>
                <p class="text-base text-gray-600">Qty: {{ product.qty }}</p>
              </div>
              <p>
                <strong>{{ product.amount }}</strong>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Avatar from 'primevue/avatar'

import Skeleton from 'primevue/skeleton'

const products = ref([])
const loading = ref(true)
const getToken = () => {
  return localStorage.getItem('access_token') || ''
}

const fetchTopProducts = async () => {
  const token = getToken()
  try {
    const response = await axios.get(
      'https://sandbox.dibuiltadi.com/api/dashboard/common/v1/summaries/top/products?limit=5',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (response.data.response_code === '2000000') {
      products.value = response.data.items
    } else {
      console.error('Failed to fetch top products:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching top products:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTopProducts()
})
</script>

<style scoped>
.top-products-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.loading {
  text-align: center;
}
</style>
