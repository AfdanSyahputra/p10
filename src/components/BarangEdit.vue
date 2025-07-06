<template>
  <div v-if="barang">
    <h2>Edit Barang</h2>
    <form @submit.prevent="simpan">
      <input v-model="barang.nama" />
      <input v-model.number="barang.stok" />
      <input v-model.number="barang.harga" />
      <button type="submit">Simpan Perubahan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const barang = ref(null)

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/barang/${route.params.id}`)
  barang.value = res.data
})

async function simpan() {
  await axios.put(`http://localhost:3000/barang/${barang.value.id}`, barang.value)
  router.push('/dashboard/barang')
}
</script>
