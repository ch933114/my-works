<template>
  <div class="text-white bg-primary">
    <div class="bg-white h-[350px] relative bg-[url(/images/banner.jpg)] object-center">
      <div class="absolute left-[50%] translate-x-[-50%] bottom-[-80%] text-center">
        <img
          src="/images/dean_photo2.JPG"
          alt="人物照片"
          class="w-[300px] h-[300px] object-cover rounded-full"
        />
        <h1 class="py-6 text-4xl text-accent1 md:text-[60px] font-bold">Dean Liu</h1>
      </div>
    </div>
    <div class="bg-primary">
      <div class="py-[300px] max-w-[1296px] mx-auto">
        <div class="mb-[40px] flex justify-center" v-if="authStore.isAuthenticated">
          <button
            class="text-xl bg-white text-primary p-2 rounded-[10px] font-bold"
            @click="handleAdd"
          >
            新增作品
          </button>
          <Modal :visible="showModal" :edit-data="editData" @close="showModal = false" />
        </div>
        <ul class="flex flex-wrap gap-5 px-4 justify-between">
          <li
            v-for="item in worksStore.worksData"
            :key="item.id"
            class="flex flex-col gap-4 w-[100%] sm:w-[46%] lg:w-[31%] rounded-[10px] overflow-hidden m-2 outline outline-white outline-offset-8"
          >
            <div class="w-full">
              <img :src="item.imgUrl" alt="系統示意圖" class="object-fit w-full h-[250px]" />
            </div>
            <div class="p-2 flex flex-col gap-3">
              <h2 class="text-xl text-accent2 text-center font-bold">{{ item.title }}</h2>
              <p>
                作品描述 : <span class="mr-2">{{ item.description }}</span>
              </p>
              <p>
                使用技術 : <span class="mr-2" v-for="tag in item.skill">{{ tag }}</span>
              </p>
              <p>
                串接服務 :
                <span class="mr-2" v-for="tag in item.thirdPartyServices">{{ tag }}</span>
              </p>
              <div class="flex justify-end gap-2">
                <button type="button" @click="handleEdit(item)" v-if="authStore.isAuthenticated">
                  編輯作品
                </button>
                <a
                  :href="item.url"
                  target="_blank"
                  class="bg-secondary p-2 rounded-[5px] text-white hover:bg-secondary/50 hover:brightness-110 transition duration-300"
                >
                  前往觀看
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'
import { useWorksStore } from '@/stores/works.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const showModal = ref(false)
const editData = ref(null)
const worksStore = useWorksStore()

onMounted(() => {
  worksStore.fetchWorks()
})

const handleEdit = (item) => {
  editData.value = item
  showModal.value = true
}

const handleAdd = () => {
  editData.value = null
  showModal.value = true
}
</script>
