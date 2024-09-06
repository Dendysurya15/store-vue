<template>
  <div class="card shadow-xl m-5 rounded-sm">
    <!-- Orders DataTable -->
    <DataTable
      :value="orders"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <Column field="invoice_no" header="Invoice No" style="width: 20%"></Column>
      <Column field="created_at" header="Created At" style="width: 20%"></Column>
      <Column field="buyer_phone" header="Buyer Phone" style="width: 20%"></Column>
      <Column field="store_code" header="Store Code" style="width: 20%"></Column>
      <Column field="coupon_code" header="Coupon Code" style="width: 20%"></Column>
      <Column header="Actions" style="width: 20%">
        <template #body="slotProps">
          <Button
            label="Details"
            icon="pi pi-info-circle"
            class="p-button-rounded p-button-secondary"
            @click="viewOrderDetails(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Order Detail Dialog -->
    <Dialog header="Order Details" v-model:visible="displayDetailDialog" modal>
      <div class="p-fluid">
        <p><strong>Invoice No:</strong> {{ selectedOrder.invoice_no }}</p>
        <p><strong>Created At:</strong> {{ selectedOrder.created_at }}</p>
        <p><strong>Buyer Phone:</strong> {{ selectedOrder.buyer_phone }}</p>
        <p><strong>Store Code:</strong> {{ selectedOrder.store_code }}</p>
        <p><strong>Coupon Code:</strong> {{ selectedOrder.coupon_code }}</p>
        <!-- Add more details as needed -->
      </div>
      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          @click="displayDetailDialog = false"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const orders = ref([])
const selectedOrder = ref(null)
const displayDetailDialog = ref(false)

// Fetch orders on component mount
onMounted(() => {
  fetchOrders()
})

// Fetch orders from the API
const fetchOrders = async () => {
  try {
    const response = await axios.get(
      `${base_url}/api/dashboard/customer-service/v1/orders?page=1&per_page=10&sort_by=created_at&sort_direction=desc&start_date=2022-01-01&end_date=2024-12-31&buyer_phone=087882926478&store_code=17612627&coupon_code=zVGv4ng0&search_by=invoice_no&search_query`
    )

    if (response.data.response_code === '2000000') {
      orders.value = response.data.items
    } else {
      console.error('Failed to fetch orders:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

// View order details
const viewOrderDetails = async (order) => {
  try {
    const response = await axios.get(
      `${base_url}/api/dashboard/customer-service/v1/orders/${order.invoice_no}`
    )

    if (response.data.response_code === '2000000') {
      selectedOrder.value = response.data
      displayDetailDialog.value = true
    } else {
      console.error('Failed to fetch order details:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
