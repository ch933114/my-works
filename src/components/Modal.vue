<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-[90%] max-w-[600px] relative">
      <button class="absolute top-2 right-2 text-black" @click="$emit('close')">✕</button>

      <h2 class="text-xl font-bold mb-4">{{ isEdit ? '編輯作品' : '新增作品' }}</h2>

      <form @submit.prevent="handleSubmit" class="text-black">
        <div class="mb-4">
          <label>標題</label>
          <input v-model="form.title" type="text" class="w-full border p-2" />
        </div>

        <div class="mb-4">
          <label>作品描述</label>
          <input v-model="form.description" type="text" class="w-full border p-2" />
        </div>

        <div class="mb-4">
          <label>圖片網址</label>
          <input v-model="form.imgUrl" type="text" class="w-full border p-2" />
        </div>

        <div class="mb-4">
          <label>使用技術（用逗號分隔）</label>
          <input v-model="form.skillInput" type="text" class="w-full border p-2" />
        </div>

        <div class="mb-4">
          <label>串接服務（用逗號分隔）</label>
          <input v-model="form.serviceInput" type="text" class="w-full border p-2" />
        </div>

        <div class="mb-4">
          <label>作品連結</label>
          <input v-model="form.url" type="text" class="w-full border p-2" />
        </div>

        <div class="flex justify-end gap-2">
          <button
            v-if="isEdit"
            type="button"
            class="bg-danger text-white px-4 py-2 rounded"
            @click="handleDelete"
          >
            刪除
          </button>
          <button type="submit" class="bg-primary text-white px-4 py-2 rounded">
            {{ isEdit ? '更新' : '新增' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useWorksStore } from '@/stores/works.js'

const props = defineProps({
  visible: Boolean,
  editData: Object, // 可選，編輯用
})

const emit = defineEmits(['close'])

const worksStore = useWorksStore()

const form = ref({
  title: '',
  description: '',
  imgUrl: '',
  skillInput: '',
  serviceInput: '',
  url: '',
})

const isEdit = computed(() => !!props.editData?.id)

watch(
  () => props.editData,
  (newData) => {
    if (newData) {
      form.value = {
        title: newData.title || '',
        description: props.editData.description,
        imgUrl: newData.imgUrl || '',
        skillInput: newData.skill.join(', ') || '',
        serviceInput: newData.thirdPartyServices.join(', ') || '',
        url: newData.url || '',
      }
    } else {
      form.value = {
        title: '',
        imgUrl: '',
        skillInput: '',
        serviceInput: '',
        url: '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  const data = {
    title: form.value.title,
    description: form.value.description,
    imgUrl: form.value.imgUrl,
    skill: form.value.skillInput.split(',').map((s) => s.trim()),
    thirdPartyServices: form.value.serviceInput.split(',').map((s) => s.trim()),
    url: form.value.url,
  }

  console.log('送出的資料：', data)

  try {
    if (isEdit.value) {
      await worksStore.updateWork(props.editData.id, data)
    } else {
      await worksStore.createWork(data)
    }
    emit('close')
  } catch (error) {
    console.error('送出失敗:', error.response?.data || error.message)
  }
}

const handleDelete = async () => {
  if (!isEdit.value) return // 只有編輯時可刪除

  try {
    await worksStore.deleteWork(props.editData.id)
    emit('close')
  } catch (error) {
    console.error('刪除失敗:', error.response?.data || error.message)
  }
}
</script>
