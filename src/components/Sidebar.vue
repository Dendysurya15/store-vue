<template>
  <div class="w-64 bg-gray-800 text-white flex flex-col">
    <nav class="flex-shrink-0 p-4">
      <slot name="navbar" />
    </nav>
    <ul class="flex-1 p-4">
      <!-- Sidebar Links -->
      <li class="mb-4">
        <router-link to="/home" class="text-gray-300 hover:text-white">Home</router-link>
      </li>
      <li class="mb-4">
        <router-link to="/about" class="text-gray-300 hover:text-white">About</router-link>
      </li>
      <!-- Add more links as needed -->
    </ul>
  </div>
</template>
