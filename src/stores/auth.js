// stores/auth.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    error.value = ''
    try {
      // 正式機API https://dean-works.onrender.com/auth/login
      // 本地端API http://localhost:3000/auth/login
      const res = await fetch('https://dean-works.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const result = await res.json()
      if (result.success) {
        token.value = result.token
        localStorage.setItem('token', result.token)
        return true
      } else {
        error.value = result.message || '登入失敗'
        return false
      }
    } catch (e) {
      error.value = '伺服器錯誤'
      return false
    }
  }

  const logout = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  return { token, isAuthenticated, error, login, logout }
})
