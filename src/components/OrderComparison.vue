<template>
  <div
    class="block w-full flex items-center p-6 m-2 bg-white border border-gray-200 rounded-lg shadow"
  >
    <div v-if="loading" class="loading w-full">
      <div class="w-full">
        <!-- Title skeleton (set width to a percentage) -->
        <Skeleton width="75%" class="mb-5"></Skeleton>

        <!-- Amount skeleton (set width to 100% to fill the width) -->
        <Skeleton height="20px" width="100%" class="mb-3"></Skeleton>

        <!-- Percentage and comparison skeleton -->
        <div class="flex items-center">
          <!-- Circle skeleton for percentage arrow -->

          <!-- Percentage skeleton -->
          <Skeleton height="20px" width="30%" class="mr-2"></Skeleton>

          <!-- Comparison skeleton -->
          <Skeleton height="20px" width="20%"></Skeleton>
        </div>
      </div>
    </div>

    <div v-else>
      <div class=""></div>
      <div class="content">
        <div class="flex justify-between mb-5">
          <h2 class="text-gray-500">Order Comparison</h2>
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
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <div>
          <p class="text-2xl">
            <strong> Rp.{{ formatCurrency(comparisonData.current.amount) }}</strong>
          </p>
          <div class="flex justify-start">
            <div :class="{ up: percentageChange >= 0, down: percentageChange < 0 }">
              <svg
                v-if="percentageChange >= 0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 mt-1 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            </div>
            <p>
              <span :class="percentageChange >= 0 ? 'text-green-500' : 'text-red-500'">
                {{ percentageChange }} %
              </span>
              <span class="text-gray-500"> from {{ comparisonData.previous.month }} </span>
              <!-- ({{
              formatCurrency(comparisonData.previous.amount)
            }}
            ) -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
// Define reactive data properties
const comparisonData = ref({})
const percentageChange = ref(0)
const loading = ref(true)
const getToken = () => {
  return localStorage.getItem('access_token') || ''
}
// Function to fetch comparison data
const fetchComparisonData = async () => {
  const token = getToken()
  try {
    const response = await axios.get(
      'https://sandbox.dibuiltadi.com/api/dashboard/common/v1/summaries/orders/comparison',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (response.data.response_code === '2000000') {
      comparisonData.value = response.data

      percentageChange.value = response.data.percentage
    } else {
      console.error('Failed to fetch comparison data:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching comparison data:', error)
  } finally {
    loading.value = false
  }
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat().format(parseFloat(amount))
}

// Fetch data on component mount
onMounted(() => {
  fetchComparisonData()
})
</script>

<style scoped>
.order-comparison-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .bi {
  width: 24px;
  height: 24px;
}

.up {
  color: green;
}

.down {
  color: red;
}

.content p {
  margin: 4px 0;
}

.loading {
  text-align: center;
}
</style>
