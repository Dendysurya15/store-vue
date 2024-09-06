<template>
  <div class="block max-w p-6 m-2 bg-white border border-gray-200 rounded-lg shadow">
    <!-- Skeleton loader when loading -->
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
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Top Buyers content when loading is false -->
    <div v-else>
      <div class="flex justify-between">
        <h2 class="mb-3"><strong>Top Buyer</strong></h2>
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
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
      </div>
      <ul>
        <li v-for="(buyer, index) in buyers" :key="buyer.phone">
          <div class="flex items-center mb-2">
            <Avatar
              :label="buyer.name.slice(0, 2).toUpperCase()"
              class="mr-2"
              style="background-color: #c18397; color: white"
              shape="circle"
            />

            <div class="flex w-full justify-between items-center">
              <div class="flex-col">
                <p>{{ buyer.name }}</p>
              </div>
              <p>
                <strong>{{ buyer.amount }}</strong>
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

const buyers = ref([])
const loading = ref(true)

// Fetch top buyers data from API
const fetchTopBuyers = async () => {
  const token = localStorage.getItem('access_token') || ''
  try {
    const response = await axios.get(
      'https://sandbox.dibuiltadi.com/api/dashboard/common/v1/summaries/top/buyers?limit=5',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (response.data.response_code === '2000000') {
      buyers.value = response.data.items
    } else {
      console.error('Failed to fetch top buyers:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching top buyers:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTopBuyers()
})
</script>

<style scoped>
.top-buyers-card {
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
