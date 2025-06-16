<template>
  <header class="bg-primary-light">
    <ul class="flex justify-end gap-4 p-2 text-[18px] text-primary font-bold">
      <li>
        <router-link to="/" class="p-1 rounded-[5px] hover:bg-accent1/50 transition duration-300"
          >首頁</router-link
        >
      </li>
      <!-- 未登入顯示登入 -->
      <li v-if="!authStore.isAuthenticated">
        <router-link
          to="/login"
          class="p-1 rounded-[5px] hover:bg-accent1/50 transition duration-300"
          >後臺登入</router-link
        >
      </li>

      <!-- 已登入顯示登出按鈕 -->
      <li v-else>
        <button @click="handleLogout" class="hover:underline">登出</button>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
