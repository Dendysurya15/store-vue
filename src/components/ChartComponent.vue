<template>
  <div>
    <div v-if="loading">Loading...</div>
    <apexchart
      v-else
      :options="chartOptions"
      :series="chartSeries"
      :type="chartType"
      height="300"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  chartType: {
    type: String,
    default: 'line'
  },
  categories: {
    type: Array,
    default: () => []
  },
  chartSeries: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#007bff'
  }
})

const chartOptions = ref({
  chart: {
    type: props.chartType,
    height: 400,
    animations: {
      enabled: true
    }
  },
  xaxis: {
    categories: props.categories,
    title: {
      text: 'Categories'
    }
  },
  yaxis: {
    title: {
      text: 'Values'
    }
  },
  stroke: {
    curve: 'smooth'
  },
  dataLabels: {
    enabled: false
  },
  colors: [props.color]
})

watch(
  () => props.chartType,
  (newType) => {
    chartOptions.value.chart.type = newType
  }
)

watch(
  () => props.categories,
  (newCategories) => {
    chartOptions.value.xaxis.categories = newCategories
  }
)

watch(
  () => props.chartSeries,
  (newSeries) => {
    chartOptions.value.series = newSeries
  }
)

watch(
  () => props.color,
  (newColor) => {
    chartOptions.value.colors = [newColor]
  }
)

onMounted(() => {
  chartOptions.value.series = props.chartSeries
  chartOptions.value.xaxis.categories = props.categories
  chartOptions.value.colors = [props.color]
})
</script>
