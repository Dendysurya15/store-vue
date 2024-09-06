<template>
  <div class="card shadow-xl mx-2 my-7 rounded-sm">
    <!-- Export Button -->
    <div class="pt-5 ml-5">
      <Button
        label="Export CSV"
        icon="pi pi-download"
        class="rounded-sm p-button-success mb-3"
        @click="exportCoupons"
        :loading="isExporting"
      />

      <!-- Create Coupon Button -->
      <Button
        label="Create Coupon"
        icon="pi pi-plus"
        class="rounded-sm ml-2 bg-blue-500 mb-3"
        @click="displayCreateDialog = true"
      />
    </div>
    <!-- Coupons DataTable with Global Filter -->
    <DataTable
      :value="coupons"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['code', 'name']"
    >
      <template #header>
        <div class="flex justify-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilters()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters.global.value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>

      <!-- Coupon Code Column -->
      <Column field="code" header="Coupon Code" style="width: 25%" />

      <!-- Coupon Name Column -->
      <Column field="name" header="Coupon Name" style="width: 25%" />

      <!-- Actions Column -->
      <Column header="Actions" style="width: 50%">
        <template #body="slotProps">
          <Button
            label=""
            icon="pi pi-pencil"
            class="p-button-rounded p-button-info mr-2"
            @click="editCoupon(slotProps.data)"
          />
          <Button
            label=""
            icon="pi pi-info-circle"
            class="p-button-rounded p-button-secondary"
            @click="viewDetails(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Create Coupon Dialog -->
  <Dialog header="Create Coupon" v-model:visible="displayCreateDialog" modal>
    <div class="p-fluid w-[300px]">
      <div class="field w-full">
        <label for="create-code">Coupon Code</label>
        <InputText id="create-code" class="w-full" v-model="newCoupon.code" />
      </div>
      <div class="field w-full mt-3">
        <label for="create-name">Coupon Name</label>
        <InputText id="create-name" class="w-full" v-model="newCoupon.name" />
      </div>
      <div class="field w-full mt-3">
        <label for="create-start-date">Start Date</label>
        <InputText
          id="create-start-date"
          class="w-full"
          v-model="newCoupon.start_date"
          type="date"
        />
      </div>
      <div class="field w-full mt-3">
        <label for="create-end-date">End Date</label>
        <InputText id="create-end-date" class="w-full" v-model="newCoupon.end_date" type="date" />
      </div>
      <div v-if="createErrorMessage" class="text-red-600 mt-2">{{ createErrorMessage }}</div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="displayCreateDialog = false"
        class="p-button-text"
      />
      <Button label="Create" icon="pi pi-check" @click="createCoupon" />
    </template>
  </Dialog>

  <!-- Edit Coupon Dialog -->
  <Dialog header="Edit Coupon" v-model:visible="displayEditDialog" modal>
    <div class="p-fluid w-[300px]">
      <div class="field w-full">
        <label for="edit-code">Coupon Code</label>
        <InputText id="edit-code" class="w-full" v-model="selectedCoupon.code" disabled />
      </div>
      <div class="field w-full mt-3">
        <label for="edit-name">Coupon Name</label>
        <InputText id="edit-name" class="w-full" v-model="selectedCoupon.name" disabled />
      </div>
      <div class="field w-full mt-3">
        <label for="edit-start-date">Start Date</label>
        <InputText
          id="edit-start-date"
          class="w-full"
          v-model="selectedCoupon.start_date"
          type="date"
        />
      </div>
      <div class="field w-full mt-3">
        <label for="edit-end-date">End Date</label>
        <InputText
          id="edit-end-date"
          class="w-full"
          v-model="selectedCoupon.end_date"
          type="date"
        />
      </div>
      <div v-if="editErrorMessage" class="text-red-600 mt-2">{{ editErrorMessage }}</div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="displayEditDialog = false"
        class="p-button-text"
      />
      <Button label="Save" icon="pi pi-check" @click="saveCoupon" />
    </template>
  </Dialog>

  <!-- Detail Dialog -->
  <Dialog header="Coupon Details" v-model:visible="displayDetailDialog" modal>
    <div class="p-fluid">
      <p><strong>Coupon Code:</strong> {{ selectedCoupon.code }}</p>
      <p><strong>Coupon Name:</strong> {{ selectedCoupon.name }}</p>
      <p><strong>Start Date:</strong> {{ selectedCoupon.start_date }}</p>
      <p><strong>End Date:</strong> {{ selectedCoupon.end_date }}</p>
      <p><strong>Created At:</strong> {{ selectedCoupon.created_at }}</p>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Message Content',
    life: 3000
  })
}

const coupons = ref([])
const selectedCoupon = ref(null)
const newCoupon = ref({
  code: '',
  name: '',
  start_date: '',
  end_date: ''
})
const displayEditDialog = ref(false)
const displayCreateDialog = ref(false)
const displayDetailDialog = ref(false)
const createErrorMessage = ref('')
const editErrorMessage = ref('')
const isExporting = ref(false)

const filters = ref({
  global: { value: null }
})

const baseURL = 'https://sandbox.dibuiltadi.com/api/dashboard/customer-service/v1'

onMounted(() => {
  fetchCoupons()
})

const fetchCoupons = async () => {
  try {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
      `${baseURL}/coupons?page=1&per_page=10&sort_by=name&sort_direction=asc&search_by=name&search_query=`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (response.data.response_code === '2000000') {
      coupons.value = response.data.items
    } else {
      console.error('Failed to fetch coupons:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching coupons:', error)
  }
}

const fetchCouponDetails = async (couponCode) => {
  try {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(`${baseURL}/coupons/${couponCode}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.data.response_code === '2000000') {
      selectedCoupon.value = response.data
      displayDetailDialog.value = true
    } else {
      console.error('Failed to fetch coupon details:', response.data.response_message)
    }
  } catch (error) {
    console.error('Error fetching coupon details:', error)
  }
}

const createCoupon = async () => {
  try {
    createErrorMessage.value = ''
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.post(`${baseURL}/coupons`, newCoupon.value, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.data.response_code === '2000000') {
      fetchCoupons()
      displayCreateDialog.value = false
      newCoupon.value = { code: '', name: '', start_date: '', end_date: '' }
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Coupon created successfully',
        life: 3000
      })
    } else {
      throw new Error(response.data.response_message || 'Failed to create coupon')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).join('\n')
      createErrorMessage.value = errorMessages
    } else {
      createErrorMessage.value = error.message || 'Error creating coupon'
    }
    console.error('Error creating coupon:', error)
  }
}

const editCoupon = (coupon) => {
  selectedCoupon.value = { ...coupon }
  displayEditDialog.value = true
}

const saveCoupon = async () => {
  try {
    editErrorMessage.value = ''
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.put(
      `${baseURL}/coupons/${selectedCoupon.value.code}`,
      selectedCoupon.value,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.response_code === '2000000') {
      fetchCoupons()
      displayEditDialog.value = false
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Coupon updated successfully',
        life: 3000
      })
    } else {
      throw new Error(response.data.response_message || 'Failed to update coupon')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).join('\n')
      editErrorMessage.value = errorMessages
    } else {
      editErrorMessage.value = error.message || 'Error updating coupon'
    }
    console.error('Error updating coupon:', error)
  }
}

const viewDetails = (coupon) => {
  fetchCouponDetails(coupon.code)
}

const exportCoupons = async () => {
  isExporting.value = true
  try {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
      `${baseURL}/coupons/export?sort_by=name&sort_direction=asc&search_by=name&search_query=`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        responseType: 'blob'
      }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'coupons.csv')
    document.body.appendChild(link)
    link.click()
  } catch (error) {
    console.error('Error exporting coupons:', error)
  } finally {
    isExporting.value = false
  }
}

const clearFilters = () => {
  filters.value.global.value = null
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
