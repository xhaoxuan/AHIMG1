<template>
  <section class="Manage pt-4 sm:pt-6">
    <div class="pt-6 flex items-center text-sm">
      <div class="ml-4">
        <input v-model="secretKey" placeholder="请输入密钥" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
      </div>
      <div class="ml-4">
        <Button @click="getImages">查询</Button>
      </div>
    </div>
    <div class="pt-6">
      <div v-for="image in imageList" :key="image" class="image-item">
        <img :src="image" />
        <Button @click="deleteImage(image)">删除</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Button } from '@/components/ui/button';

const secretKey = ref('');
const imageList = ref([]);

const getImages = async () => {
  if (!secretKey.value) {
    return;
  }

  const response = await fetch(`/api/images?key=${secretKey.value}`);
  const data = await response.json();
  imageList.value = data;
};

const deleteImage = async (imageUrl: string) => {
  if (!secretKey.value) {
    return;
  }

  await fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: secretKey.value, imageUrl })
  });

  getImages();
};
</script>

<style scoped lang="less">
.image-item {
  margin-bottom: 1rem;

  img {
    max-width: 100%;
  }
}
</style>
