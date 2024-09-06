<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-wrap -mx-4">
      <!-- Profile Update Card -->
      <div class="w-full lg:w-1/2 px-4 mb-8">
        <div class="bg-white shadow-md rounded-lg p-6 h-full">
          <h2 class="text-2xl font-bold mb-6">Update Profile</h2>
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 gap-y-6">
              <div>
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                  >Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="profile.name"
                    type="text"
                    id="name"
                    class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label for="profile_image" class="block text-sm font-medium leading-6 text-gray-900"
                  >Profile Image</label
                >
                <div class="mt-2 flex items-center gap-x-3">
                  <img
                    v-if="profile.profile_image"
                    :src="profile.profile_image"
                    alt="Profile Image"
                    class="h-12 w-12 rounded-full"
                  />
                  <svg
                    v-else
                    class="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    id="profile_image"
                    @change="handleImageUpload"
                    accept="image/*"
                    class="hidden"
                  />
                  <label
                    for="profile_image"
                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                    >Change</label
                  >
                </div>
              </div>
            </div>
            <div v-if="profileErrorMessage" class="mt-4 text-red-600">
              {{ profileErrorMessage }}
            </div>
            <div v-if="profileSuccessMessage" class="mt-4 text-green-600">
              {{ profileSuccessMessage }}
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Change Card -->
      <div class="w-full lg:w-1/2 px-4 mb-8">
        <div class="bg-white shadow-md rounded-lg p-6 h-full">
          <h2 class="text-2xl font-bold mb-6">Change Password</h2>
          <form @submit.prevent="changePassword">
            <div class="grid grid-cols-1 gap-y-6">
              <div>
                <label
                  for="current_password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Current Password</label
                >
                <input
                  v-model="passwordData.current_password"
                  type="password"
                  id="current_password"
                  class="mt-2 px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div>
                <label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
                  >New Password</label
                >
                <input
                  v-model="passwordData.new_password"
                  type="password"
                  id="new_password"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div>
                <label
                  for="new_password_confirmation"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Confirm New Password</label
                >
                <input
                  v-model="passwordData.new_password_confirmation"
                  type="password"
                  id="new_password_confirmation"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div v-if="passwordErrorMessage" class="mt-4 text-red-600">
              {{ passwordErrorMessage }}
            </div>
            <div v-if="passwordSuccessMessage" class="mt-4 text-green-600">
              {{ passwordSuccessMessage }}
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const baseURL = 'https://sandbox.dibuiltadi.com'

const profile = ref({
  name: '',
  profile_image: ''
})

const passwordData = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const profileErrorMessage = ref('')
const profileSuccessMessage = ref('')
const passwordErrorMessage = ref('')
const passwordSuccessMessage = ref('')

const fetchProfile = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/dashboard/common/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    profile.value = {
      name: response.data.name,
      profile_image: response.data.profile_image
    }
  } catch (error) {
    profileErrorMessage.value = 'Failed to fetch profile. Please try again.'
    console.error('Failed to fetch profile:', error)
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      profileErrorMessage.value = 'Image size should not exceed 2MB'
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.profile_image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
defineEmits(['nameUpdated'])
const updateProfile = async () => {
  try {
    profileErrorMessage.value = ''
    profileSuccessMessage.value = ''

    const formData = new FormData()
    formData.append('name', profile.value.name)
    if (profile.value.profile_image && profile.value.profile_image.startsWith('data:')) {
      const blob = await fetch(profile.value.profile_image).then((r) => r.blob())
      formData.append('profile_image', blob, 'profile_image.jpg')
    }

    await axios.post(`${baseURL}/api/dashboard/common/v1/auth/profile`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    profileSuccessMessage.value = 'Profile updated successfully'

    emit('nameUpdated', profile.value.name)
  } catch (error) {
    profileErrorMessage.value =
      error.response?.data?.message || 'Failed to update profile. Please try again.'
    console.error('Failed to update profile:', error)
  }
}

const changePassword = async () => {
  try {
    passwordErrorMessage.value = ''
    passwordSuccessMessage.value = ''

    if (passwordData.value.new_password !== passwordData.value.new_password_confirmation) {
      passwordErrorMessage.value = 'New password and confirmation do not match'
      return
    }

    await axios.put(`${baseURL}/api/dashboard/common/v1/auth/password`, passwordData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    passwordSuccessMessage.value = 'Password changed successfully'
    passwordData.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  } catch (error) {
    passwordErrorMessage.value =
      error.response?.data?.message || 'Failed to change password. Please try again.'
    console.error('Failed to change password:', error)
  }
}

fetchProfile()
</script>
