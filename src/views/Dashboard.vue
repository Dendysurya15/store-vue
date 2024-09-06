<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ChartComponent from '../components/ChartComponent.vue' // Adjust the path as necessary
import OrderComparisonCard from '../components/OrderComparison.vue'
import TopProductsCard from '../components/TopProduct.vue'
import TopBuyersCard from '../components/TopBuyer.vue'
import TopStoresCard from '../components/TopStore.vue'

const startMonth = ref('2022-01')
const endMonth = ref('2024-08')
const startYear = ref('2021')
const endYear = ref('2024')

const isLoadingMonthly = ref(false)
const isLoadingYearly = ref(false)

const monthlyCategories = ref([])
const monthlySeries = ref([])

const yearlyCategories = ref([])
const yearlySeries = ref([])

const getToken = () => {
  return localStorage.getItem('access_token') || ''
}

const fetchMonthlyData = async () => {
  const token = getToken()
  isLoadingMonthly.value = true
  try {
    const response = await axios.get(
      `https://sandbox.dibuiltadi.com/api/dashboard/common/v1/summaries/orders/monthly?start_month=${startMonth.value}&end_month=${endMonth.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.response_code === '2000000') {
      const data = response.data.items
      monthlyCategories.value = data.map((item) => item.month)
      monthlySeries.value = [
        {
          name: 'Orders',
          data: data.map((item) => parseFloat(item.orders))
        }
      ]
    } else {
      console.error('Failed to fetch monthly data:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching monthly data:', error)
  } finally {
    isLoadingMonthly.value = false
  }
}

const fetchYearlyData = async () => {
  const token = getToken()
  isLoadingYearly.value = true
  try {
    const response = await axios.get(
      `https://sandbox.dibuiltadi.com/api/dashboard/common/v1/summaries/orders/yearly?start_year=${startYear.value}&end_year=${endYear.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.response_code === '2000000') {
      const data = response.data.items
      yearlyCategories.value = data.map((item) => item.year)
      yearlySeries.value = [
        {
          name: 'Orders',
          data: data.map((item) => parseFloat(item.amount))
        }
      ]
    } else {
      console.error('Failed to fetch yearly data:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching yearly data:', error)
  } finally {
    isLoadingYearly.value = false
  }
}

onMounted(() => {
  fetchMonthlyData()
  fetchYearlyData()
})
</script>

<template>
  <div>
    <div class="flex w-full">
      <div class="w-2/3 block p-6 m-2 bg-white border border-gray-200 rounded-lg shadow">
        <h2>Monthly Orders</h2>
        <div class="flex gap-1">
          <input
            type="month"
            v-model="startMonth"
            class="mt-2 px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="month"
            v-model="endMonth"
            class="mt-2 px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            @click="fetchMonthlyData"
            class="w-full py-0.5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Monthly Chart
          </button>
        </div>

        <ChartComponent
          :chartType="'line'"
          :categories="monthlyCategories"
          :chartSeries="monthlySeries"
          :loading="isLoadingMonthly"
          color="#007bff"
        />
      </div>
      <div class="w-1/3 block p-6 m-2 bg-white border border-gray-200 rounded-lg shadow">
        <h2>Yearly Orders</h2>
        <input
          type="number"
          v-model="startYear"
          min="2000"
          class="mt-2 px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="number"
          v-model="endYear"
          min="2000"
          class="mt-2 px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          @click="fetchYearlyData"
          class="w-full mt-3 mb-3 py-0.5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Update Yearly Chart
        </button>
        <ChartComponent
          :chartType="'line'"
          :categories="yearlyCategories"
          :chartSeries="yearlySeries"
          :loading="isLoadingYearly"
          color="#ff5733"
        />
      </div>
    </div>

    <div class="flex">
      <OrderComparisonCard class="w-1/2" />
      <TopBuyersCard class="w-full" />
    </div>

    <div class="flex">
      <TopProductsCard class="w-1/2" />
      <TopStoresCard class="w-1/2" />
    </div>
  </div>
</template>
