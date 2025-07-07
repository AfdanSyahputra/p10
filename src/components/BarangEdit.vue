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

const BASE_URL = 'https://pbk-warung-api.onrender.com/api'

const router = useRouter()
const route = useRoute()
const barang = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/barang/${route.params.id}`)
    barang.value = res.data
  } catch (err) {
    console.error('❌ Gagal ambil data barang:', err.message)
  }
})

async function simpan() {
  try {
    await axios.put(`${BASE_URL}/barang/${barang.value.id}`, barang.value)
    router.push('/dashboard/barang')
  } catch (err) {
    console.error('❌ Gagal simpan perubahan:', err.message)
  }
}
</script>
