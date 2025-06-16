import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorksStore = defineStore('works', () => {
  const worksData = ref([])
  const loading = ref(false)
  const error = ref(null)
  const token = ref(localStorage.getItem('token') || '') // 拿 token

  // 建立一個 axios 實例並帶上 token
  const axiosInstance = axios.create({
    baseURL: 'https://dean-works.onrender.com',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  // const axiosInstance = axios.create({
  //   baseURL: 'http://localhost:3000', // 你的本地端 API URL
  //   headers: {
  //     Authorization: `Bearer ${token.value}`,
  //   },
  // })

  // 串接取得作品資料 API
  const fetchWorks = async () => {
    loading.value = true
    try {
      const res = await axios.get('https://dean-works.onrender.com/portfolio')
      // const res = await axios.get('http://localhost:3000/portfolio')
      worksData.value = res.data.data
    } catch (err) {
      console.error('作品資料讀取失敗:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 串接建立作品資料 API
  const createWork = async (payload) => {
    await axiosInstance.post('https://dean-works.onrender.com/portfolio', payload)
    // await axiosInstance.post('http://localhost:3000/portfolio', payload)
    await fetchWorks() // 重新抓資料
  }

  // 串接修改作品資料 API
  const updateWork = async (id, payload) => {
    await axiosInstance.put(`https://dean-works.onrender.com/portfolio/${id}`, payload)
    // await axiosInstance.put(`http://localhost:3000/portfolio/${id}`, payload)
    await fetchWorks()
  }

  // 串接刪除作品資料 API
  const deleteWork = async (id) => {
    await axiosInstance.delete(`https://dean-works.onrender.com/portfolio/${id}`)
    // await axiosInstance.delete(`http://localhost:3000/portfolio/${id}`)
    await fetchWorks()
  }

  return {
    worksData,
    loading,
    error,
    fetchWorks,
    createWork,
    updateWork,
    deleteWork,
  }
})
