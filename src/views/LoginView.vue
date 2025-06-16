<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    alert('登入成功')
    router.push('/')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center h-[350px] relative bg-[url(/images/banner.jpg)] object-center"
  >
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">後臺登入</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 p-2">
        <div>
          <label class="block text-sm font-medium text-gray-700">帳號</label>
          <input
            v-model="username"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">密碼</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          登入
        </button>

        <p v-if="authStore.error" class="text-red-500 text-sm text-center">{{ authStore.error }}</p>
      </form>
    </div>
  </div>
</template>
